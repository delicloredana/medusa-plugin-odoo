import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
} from "@medusajs/medusa";
import OdooService from "src/services/odoo";
export default async function odooOrderCanceledHandler({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const orderService: OrderService = container.resolve("orderService");
  const odooService: OdooService = container.resolve("odooService");

  const { id } = data;
  const order = await orderService.retrieve(id);

  await odooService.cancelOrder(order.metadata?.picking_id as number);
}

export const config: SubscriberConfig = {
  event: [OrderService.Events.CANCELED],
  context: {
    subscriberId: "odoo-order-canceled-handler",
  },
};
