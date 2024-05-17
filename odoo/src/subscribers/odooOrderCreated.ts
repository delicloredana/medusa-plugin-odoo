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
  const odooService: OdooService = container.resolve("odooService");
  const moves = [];
  const { id } = data;

  const order = await orderService.retrieve(id, {
    relations: [
      "items",
      "customer",
      "shipping_address",
      "shipping_methods",
      "shipping_methods.shipping_option",
    ],
  });
  const name =
    order.shipping_address.first_name + " " + order.shipping_address.last_name;
  const partnerId = await odooService.findPartner(
    order.email,
    order.shipping_address.address_1,
    order.shipping_address.city,
    order.shipping_address.country_code,
    name,
    order.shipping_address.postal_code
  );
  const address = await odooService.createDeliveryAddress(
    partnerId,
    order.shipping_address.address_1,
    order.shipping_address.city,
    order.shipping_address.country_code,
    name,
    order.shipping_address.postal_code
  );
  for (const item of order.items) {
    const product = (await odooService.getProduct(item.variant_id)) as any;
    const move = await odooService.createMoves(product.id, item.quantity, 8, 5);
    moves.push(move);
  }
  const pickingId = await odooService.createOrder(moves, 8, 5, 2, address);
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
