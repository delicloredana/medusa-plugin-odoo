import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
  SwapService,
} from "@medusajs/medusa";
import OdooService from "src/services/odoo";
export default async function odooSwapCreatedHandler({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const orderService: OrderService = container.resolve("orderService");
  const swapService: SwapService = container.resolve("swapService");
  const odooService: OdooService = container.resolve("odooService");

  const { id } = data;

  const swap = await swapService.retrieve(id, {
    select: [
      "order.display_id",
      "order.currency_code",
      "id",
      "difference_due",
      "cart.total",
      "order_id",
    ],
    relations: [
      "additional_items",
      "order",
      "return_order",
      "return_order.items",
      "return_order.items.item",
      "return_order.shipping_method",
      "return_order.shipping_method.shipping_option",
      "cart",
      "cart.shipping_address",
      "shipping_address",
    ],
  });

  const order = await orderService.retrieve(swap.order_id);
  const partnerId = await odooService.findPartner(
    order.email,
    swap.cart.shipping_address.address_1,
    swap.cart.shipping_address.city,
    swap.cart.shipping_address.country_code,
    swap.cart.shipping_address.first_name +
      " " +
      swap.cart.shipping_address.last_name,
    swap.shipping_address.postal_code
  );
  const deliveryAddress = await odooService.createDeliveryAddress(
    partnerId,
    swap.shipping_address.address_1,
    swap.shipping_address.city,
    swap.shipping_address.country_code,
    swap.shipping_address.first_name + " " + swap.shipping_address.last_name,
    swap.shipping_address.postal_code
  );
  const deliveryOrder = (await odooService.getOrder(
    order.metadata.picking_id
  )) as any[];
  const returnMoves = [];
  for (const item of swap.return_order.items) {
    const product = (await odooService.getProduct(item.item.variant_id)) as any;
    const result = await odooService.createReturnMoves(
      product.id,
      item.quantity,
      deliveryOrder[0].move_ids
    );
    returnMoves.push(result.move);
  }
  await odooService.createOrder(
    returnMoves,
    5,
    8,
    1,
    partnerId,
    `Swap for ${deliveryOrder[0].name}`,
    order.metadata?.picking_id as number
  );

  const additionalMoves = [];
  for (const item of swap.additional_items) {
    const product = (await odooService.getProduct(item.variant_id)) as any;
    const move = await odooService.createMoves(product.id, item.quantity, 8, 5);
    additionalMoves.push(move);
  }
  const pickingId = await odooService.createOrder(
    additionalMoves,
    8,
    5,
    2,
    deliveryAddress,
    `Swap for ${deliveryOrder[0].name}`
  );
  await swapService.update(id, {
    metadata: { picking_id: pickingId },
  });
}

export const config: SubscriberConfig = {
  event: [SwapService.Events.PAYMENT_COMPLETED],
  context: {
    subscriberId: "odoo-swap-created-handler",
  },
};
