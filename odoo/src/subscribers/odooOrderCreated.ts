import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
} from "@medusajs/medusa";
import OdooService from "src/services/odoo";
export default async function odooInventoryHandler({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const orderService: OrderService = container.resolve("orderService");
  const odooService: OdooService = container.resolve("odooService");
  const moves = [];
  const { id } = data;

  const order = await orderService.retrieve(id, {
    relations: [
      "items",
      "shipping_address",
      "customer",
      "customer.shipping_addresses",
    ],
  });

  const partnerId = await odooService.findPartner(
    order.email,
    order.customer.shipping_addresses[0]?.address_1 ||
      order.shipping_address.address_1,
    order.customer.shipping_addresses[0]?.city || order.shipping_address.city,
    order.customer.shipping_addresses[0]?.country_code ||
      order.shipping_address.country_code,
    order.customer.first_name
      ? `${order.customer.first_name} ${order.customer.last_name}`
      : `${order.shipping_address.first_name} ${order.shipping_address.last_name}`,
    order.customer.shipping_addresses[0]?.postal_code ||
      order.shipping_address.postal_code
  );
  const deliveryAddress = await odooService.createDeliveryAddress(
    partnerId,
    order.shipping_address.address_1,
    order.shipping_address.city,
    order.shipping_address.country_code,
    `${order.shipping_address.first_name} ${order.shipping_address.last_name}`,
    order.shipping_address.postal_code
  );
  for (const item of order.items) {
    const product = await odooService.getProduct(item.variant_id);
    const move = await odooService.createMoves(product.id, item.quantity, 8, 5);
    moves.push(move);
  }
  const pickingId = await odooService.createOrder(
    id,
    moves,
    8,
    5,
    2,
    deliveryAddress
  );
  await orderService.update(order.id, {
    metadata: { picking_id: pickingId },
  });
}

export const config: SubscriberConfig = {
  event: [OrderService.Events.PLACED],
  context: {
    subscriberId: "odoo-inventory-handler",
  },
};
