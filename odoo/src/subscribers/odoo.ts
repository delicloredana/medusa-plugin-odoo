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

  if (return_id) {
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
    const order = await orderService.retrieve(id, { select: ["metadata"] });
    const delivery = (await odooService.getDeliveryOrder(
      order.metadata.picking_id
    )) as any[];
    const returnMoves = [];
    for (const item of returnData.items) {
      const product = (await odooService.getProduct(
        item.item.variant_id
      )) as any;
      const result = await odooService.createReturnMoves(
        product.id,
        item.quantity,
        delivery[0].move_ids
      );
      moves.push(result.move);
      returnMoves.push(result.returnMoves);
    }
    await odooService.createOrder(
      moves,
      5,
      8,
      1,
      order.metadata?.picking_id,
      `Return of ${delivery[0].name}`
    );
  } else {
    const order = await orderService.retrieve(id, {
      relations: [
        "items",
        "customer",
        "shipping_address",
        "shipping_methods",
        "shipping_methods.shipping_option",
      ],
    });

    for (const item of order.items) {
      const product = (await odooService.getProduct(item.variant_id)) as any;
      const move = await odooService.createMoves(
        product.id,
        item.quantity,
        8,
        5
      );
      moves.push(move);
    }
    const pickingId = await odooService.createOrder(moves, 8, 5, 2);
    await orderService.update(order.id, {
      metadata: { picking_id: pickingId },
    });
  }
}

export const config: SubscriberConfig = {
  event: [OrderService.Events.PLACED, OrderService.Events.RETURN_REQUESTED],
  context: {
    subscriberId: "odoo-inventory-handler",
  },
};
