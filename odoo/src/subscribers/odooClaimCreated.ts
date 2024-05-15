import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
  ClaimService,
} from "@medusajs/medusa";
import OdooService from "src/services/odoo";
export default async function odooClaimCreatedHandler({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const orderService: OrderService = container.resolve("orderService");
  const claimService: ClaimService = container.resolve("claimService");
  const odooService: OdooService = container.resolve("odooService");

  const { id } = data;

  const claim = await claimService.retrieve(id, {
    select: ["id", "order_id"],
    relations: [
      "additional_items",
      "additional_items.variant",
      "return_order",
      "return_order.items",
      "return_order.items.item",
      "return_order.shipping_method",
      "return_order.shipping_method.shipping_option",
      "order",
      "order.shipping_address",
    ],
  });
  const order = await orderService.retrieve(claim.order_id);
  const partnerId = await odooService.findPartner(
    claim.order.email,
    claim.order.shipping_address.address_1,
    claim.order.shipping_address.city,
    claim.order.shipping_address.country_code,
    claim.order.shipping_address.first_name +
      " " +
      claim.order.shipping_address.last_name
  );
  const delivery = (await odooService.getDeliveryOrder(
    order.metadata.picking_id
  )) as any[];
  const returnMoves = [];
  for (const item of claim.return_order.items) {
    const product = (await odooService.getProduct(item.item.variant_id)) as any;
    const result = await odooService.createReturnMoves(
      product.id,
      item.quantity,
      delivery[0].move_ids
    );
    returnMoves.push(result.move);
  }
  await odooService.createOrder(
    returnMoves,
    5,
    8,
    1,
    partnerId,
    `Claim for ${delivery[0].name}`,
    order.metadata?.picking_id as number
  );
  const additionalMoves = [];
  for (const item of claim.additional_items) {
    const product = (await odooService.getProduct(item.variant_id)) as any;
    const move = await odooService.createMoves(product.id, item.quantity, 8, 5);
    additionalMoves.push(move);
  }
  const pickingId = await odooService.createOrder(
    additionalMoves,
    8,
    5,
    2,
    partnerId,
    `Claim for ${delivery[0].name}`
  );
  await claimService.update(id, {
    metadata: { picking_id: pickingId },
  });
}

export const config: SubscriberConfig = {
  event: [ClaimService.Events.CREATED],
  context: {
    subscriberId: "odoo-claim-created-handler",
  },
};