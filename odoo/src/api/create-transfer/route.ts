import {
  ClaimService,
  SwapService,
  type MedusaRequest,
  type MedusaResponse,
  type OrderService,
  type ReturnService,
} from "@medusajs/medusa";
import OdooService from "src/services/odoo";

export const POST = async (req: MedusaRequest<any>, res: MedusaResponse) => {
  const orderService = req.scope.resolve<OrderService>("orderService");
  const odooService = req.scope.resolve<OdooService>("odooService");
  const returnService = req.scope.resolve<ReturnService>("returnService");
  const swapService = req.scope.resolve<SwapService>("swapService");
  const claimService = req.scope.resolve<ClaimService>("claimService");

  const id = await odooService.getExternalId(
    req.body.backorder_id || req.body.id,
    req.body._model
  );

  const body = req.body;
  if (body.state === "done") {
    if (body.origin === "") {
      const order = await orderService.retrieve(id, { relations: ["items"] });
      const moves = await odooService.getMoves(req.body.move_ids);
      const fulfillmentMoves = {};
      for (const move of moves) {
        const variantId = await odooService.getExternalId(
          move.product_id[0],
          "product.product"
        );
        Object.assign(fulfillmentMoves, { [variantId]: move.quantity });
      }
      const items = order.items
        .filter((item) => fulfillmentMoves[item.variant_id])
        .map((item) => ({
          item_id: item.id,
          quantity: fulfillmentMoves[item.variant_id],
        }));
      await orderService.createFulfillment(id, items);
    } else if (req.body.picking_type_code === "incoming") {
      const moves = await odooService.getMoves(req.body.move_ids);
      const fulfillmentMoves = {};
      const returnOrder = await returnService.retrieve(id, {
        relations: ["items", "items.item"],
      });
      for (const move of moves) {
        const variantId = await odooService.getExternalId(
          move.product_id[0],
          "product.product"
        );
        Object.assign(fulfillmentMoves, { [variantId]: move.quantity });
      }

      const items = returnOrder.items
        .filter((item) => fulfillmentMoves[item.item.variant_id])
        .map((item) => ({
          item_id: item.item.id,
          quantity: fulfillmentMoves[item.item.variant_id],
        }));
      await returnService.receive(id, items);
    } else if (req.body.origin.split(" ")[0] === "Swap") {
      const swap = await swapService.retrieve(id);
      await swapService.createFulfillment(id);
    } else if (req.body.origin.split(" ")[0] === "Claim") {
      await claimService.createFulfillment(id);
    }
  }

  res.json({});
};
