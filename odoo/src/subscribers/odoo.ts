import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
} from "@medusajs/medusa";
import OdooService from "src/services/odoo";
export default async function odoInventoryHandler({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const orderService: OrderService = container.resolve("orderService");
  const odooService: OdooService = container.resolve("odooService");

  const { id } = data;

  const order = await orderService.retrieve(id, { relations: ["items"] });
  const moves = [];
  for (const item of order.items) {
    const product = await odooService.getProduct(item.variant_id);
    const move = await odooService.createMoves(product.id, item.quantity);
    moves.push(move);
  }
  await odooService.createDeliveryOrder(moves);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "odo-inventory-handler",
  },
};
