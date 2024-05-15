import { TransactionBaseService } from "@medusajs/medusa";
import Odoo from "odoo-await";
type OdooType = Odoo & { uid?: number };
class OdooService extends TransactionBaseService {
  protected odooClient: OdooType;

  constructor(container) {
    super(container);
    this.odooClient = new Odoo({
      baseUrl: process.env.ODOO_BASE_URL,
      db: process.env.ODOO_DB,
      username: process.env.ODOO_USERNAME,
      password: process.env.ODOO_PASSWORD,
    });
  }

  async createMoves(
    productId: number,
    quantity: number,
    locationId: number,
    locationDestId: number,
    partnerId?: number
  ) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.create("stock.move", {
      product_id: productId,
      location_id: locationId,
      location_dest_id: locationDestId,
      name: productId,
      quantity: quantity,
      product_uom_qty: quantity,
      partner_id: partnerId,
    });
  }
  async createOrder(
    moves: number[],
    locationId: number,
    locationDestId: number,
    pickingTypeId: number,
    partnerId: number,
    origin?: string,
    returnId?: number
    
  ) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.create("stock.picking", {
      location_id: locationId,
      location_dest_id: locationDestId,
      picking_type_id: pickingTypeId,
      move_ids: moves,
      partner_id: partnerId,
      return_id: returnId,
      origin,
    });
  }

  async cancelOrder(id: number) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    await this.odooClient.update("stock.picking", [id], {
      state: "cancel",
    });
  }
  
  async findPartner(email: string, address: string, city: string, country: string, name: string) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    const partner = await this.odooClient.search("res.partner", [
      ["email", "=", email],
    ]);
    const countryCode = country.toUpperCase();
    const country_id = await this.odooClient.search("res.country", [
      ["code", "=", countryCode],
    ]);

    if (partner.length > 0) {
      return partner[0];
    } else {
      return await this.odooClient.create("res.partner", {
        email,
        city,
        street: address,
        country_id: country_id[0],
        name,
        country_code: countryCode,
      });
    }
  }
  async createReturnOrder(moves, locationId, pickingId) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.create("stock.return.picking", {
      location_id: locationId,
      picking_id: pickingId,
      product_return_moves: moves,
    });
  }
  async createReturnMoves(productId, quantity, moveIds) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    const move = await this.createMoves(productId, quantity, 5, 8);
    const returnMoves = await this.odooClient.create(
      "stock.return.picking.line",
      {
        product_id: productId,
        quantity: quantity,
        move_id: move,
      }
    );
    return {
      move,
      returnMoves,
    };
  }

  async getDeliveryOrder(pickingId) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.read("stock.picking", [pickingId]);
  }
  async getProduct(externalId: string) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.readByExternalId(externalId);
  }
}

export default OdooService;
