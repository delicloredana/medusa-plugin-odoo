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
      "items",
      "items.item",
      "shipping_method",
      "shipping_method.shipping_option",
    ],
  });
  const order = await orderService.retrieve(id, {
    relations: [
      "items",
      "shipping_address",
      "customer",
      "customer.shipping_addresses",
    ],
  });
  const partnerName = order.customer.first_name
    ? `${order.customer.first_name} ${order.customer.last_name}`
    : `${order.shipping_address.first_name} ${order.shipping_address.last_name}`;
  const partnerId = await odooService.findPartner(
    order.email,
    order.customer.shipping_addresses[0]?.address_1 ||
      order.shipping_address.address_1,
    order.customer.shipping_addresses[0]?.city || order.shipping_address.city,
    order.customer.shipping_addresses[0]?.country_code ||
      order.shipping_address.country_code,
    partnerName,
    order.customer.shipping_addresses[0]?.postal_code ||
      order.shipping_address.postal_code
  );

  const deliveryOrder = await odooService.getOrder(
    order.metadata.picking_id as number
  );
  for (const item of returnData.items) {
    const product = await odooService.getProduct(item.item.variant_id);
    const result = await odooService.createReturnMoves(
      product.id,
      item.quantity
    );
    moves.push(result.move);
  }
  const pickingId = await odooService.createOrder(
    return_id,
    moves,
    5,
    8,
    1,
    partnerId,

    `Return of ${deliveryOrder[0].name}`,
    order.metadata?.picking_id as number
  );
  await returnService.update(return_id, {
    metadata: { picking_id: pickingId },
  });
}

export const config: SubscriberConfig = {
  event: [OrderService.Events.RETURN_REQUESTED],
  context: {
    subscriberId: "odoo-inventory-handler",
  },
};
