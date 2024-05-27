import { TransactionBaseService } from "@medusajs/medusa";
import Odoo from "odoo-await";

type OdooType = Odoo & { uid?: number };
class OdooService extends TransactionBaseService {
  protected odooClient: OdooType;
  constructor(container, options) {
    super(container);
    this.odooClient = new Odoo({
      baseUrl: options.odooBaseUrl,
      db: options.odooDB,
      username: options.odooUsername,
      password: options.odooPassword,
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
    id: string,
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
    const pickingId = await this.odooClient.create("stock.picking", {
      location_id: locationId,
      location_dest_id: locationDestId,
      picking_type_id: pickingTypeId,
      move_ids: moves,
      partner_id: partnerId,
      return_id: returnId,
      origin,
    });
    await this.odooClient.createExternalId("stock.picking", pickingId, id);
    return pickingId;
  }
  async getExternalId(id: number, model: string) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    const order = await this.odooClient.searchRead<any>("ir.model.data", {
      res_id: id,
      model,
    });
    return order[0].name;
  }
  async cancelOrder(id: number) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    await this.odooClient.update("stock.picking", [id], {
      state: "cancel",
    });
  }

  async createDeliveryAddress(
    parentId: number,
    address: string,
    city: string,
    country: string,
    name: string,
    zip: string
  ) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    const countryCode = country.toUpperCase();
    const countryId = await this.odooClient.search("res.country", [
      ["code", "=", countryCode],
    ]);
    const parent = (await this.odooClient.read(
      "res.partner",
      parentId
    )) as any[];
    const addresses = (await this.odooClient.read(
      "res.partner",
      parent[0].child_ids
    )) as any[];

    const existingAddress = addresses.find((a) => {
      return (
        a.street === address &&
        a.city === city &&
        a.country_code === countryCode
      );
    });

    if (existingAddress) {
      return existingAddress.id;
    }
    return await this.odooClient.create("res.partner", {
      type: "delivery",
      city,
      street: address,
      country_id: countryId[0],
      name,
      country_code: countryCode,
      zip,
      parent_id: parentId,
    });
  }

  async findPartner(
    email: string,
    address: string,
    city: string,
    country: string,
    name: string,
    zip: string
  ) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    const partner = await this.odooClient.search("res.partner", [
      ["email", "=", email],
    ]);

    const countryCode = country.toUpperCase();
    const countryId = await this.odooClient.search("res.country", [
      ["code", "=", countryCode],
    ]);

    if (partner.length > 0) {
      return partner[0];
    } else {
      return await this.odooClient.create("res.partner", {
        email,
        city,
        street: address,
        country_id: countryId[0],
        name,
        country_code: countryCode,
        zip,
      });
    }
  }
  async createReturnOrder(
    moves: number[],
    locationId: number,
    pickingId: number
  ) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.create("stock.return.picking", {
      location_id: locationId,
      picking_id: pickingId,
      product_return_moves: moves,
    });
  }
  async getMoves(ids:number[]){
    const moves=await this.odooClient.read<any>("stock.move", ids)
    return moves
  }
  async createReturnMoves(productId: number, quantity: number) {
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

  async getOrder(pickingId: number) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.read<any>("stock.picking", [pickingId]);
  }
  async getProduct(externalId: string) {
    if (!this.odooClient.uid) {
      await this.odooClient.connect();
    }
    return await this.odooClient.readByExternalId<any>(externalId);
  }
}

export default OdooService;
