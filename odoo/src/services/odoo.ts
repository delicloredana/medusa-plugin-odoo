import { TransactionBaseService } from "@medusajs/medusa";
import Odoo from "odoo-await";

class OdooService extends TransactionBaseService {
  protected odooClient;

  constructor(container) {
    super(container);
    this.odooClient = new Odoo({
      baseUrl: process.env.ODOO_BASE_URL,
      db: process.env.ODOO_DB,
      username: process.env.ODOO_USERNAME,
      password: process.env.ODOO_PASSWORD,
    });
  }
  async createMoves(productId: number, quantity: number) {
    return await this.odooClient.create("stock.move", {
      product_id: productId,
      location_id: 8,
      location_dest_id: 5,
      name: productId,
      quantity: quantity,
      product_uom_qty: quantity,
    });
  }
  async createDeliveryOrder(moves: number[]) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    await this.odooClient.create("stock.picking", {
      location_id: 8,
      location_dest_id: 5,
      picking_type_id: 2,
      move_ids: moves,
    });
  }
  async getProduct(externalId: string) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.readByExternalId(externalId);
  }
}

export default OdooService;
