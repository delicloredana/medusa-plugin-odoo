import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
  ReturnService,
} from "@medusajs/medusa";
import OdooService from "src/services/odoo";
export default async function odooInventoryHandler({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const orderService: OrderService = container.resolve("orderService");
  const returnService: ReturnService = container.resolve("returnService");
  const odooService: OdooService = container.resolve("odooService");
  const moves = [];
  const { id, return_id } = data;

  const returnData = await returnService.retrieve(return_id, {
    relations: [
      "order",
      "items",
      "order",
      "items.item",
      "shipping_method",
      "shipping_method.shipping_option",
    ],
  });
  const order = await orderService.retrieve(id, {
    relations: [
      "items",
      "customer",
      "shipping_address",
      "shipping_methods",
      "shipping_methods.shipping_option",
    ],
  });
  const partnerId = await odooService.findPartner(
    order.email,
    order.shipping_address.address_1,
    order.shipping_address.city,
    order.shipping_address.country_code,
    order.shipping_address.first_name + " " + order.shipping_address.last_name,
    order.shipping_address.postal_code
  );

  const delivery = (await odooService.getDeliveryOrder(
    order.metadata.picking_id
  )) as any[];
  for (const item of returnData.items) {
    const product = (await odooService.getProduct(item.item.variant_id)) as any;
    const result = await odooService.createReturnMoves(
      product.id,
      item.quantity,
      delivery[0].move_ids
    );
    moves.push(result.move);
  }
  await odooService.createOrder(
    moves,
    5,
    8,
    1,
    partnerId,

    `Return of ${delivery[0].name}`,
    order.metadata?.picking_id as number
  );
}

export const config: SubscriberConfig = {
  event: [OrderService.Events.RETURN_REQUESTED],
  context: {
    subscriberId: "odoo-inventory-handler",
  },
};
