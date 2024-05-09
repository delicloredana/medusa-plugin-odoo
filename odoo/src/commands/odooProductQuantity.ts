import {
  ProductService,
} from "@medusajs/medusa";
import express from "express";
import loaders from "@medusajs/medusa/dist/loaders";
import odoo from "odoo-await";
import path from "path";
const odooProductQuantity = async (

): Promise<void> => {
  console.info("Starting loader...");
  const app = express();
  const directory = path.resolve(__dirname, "../../");
  const { container } = await loaders({
    directory,
    expressApp: app,
    isTest: false,
  });
  const productService = container.resolve<ProductService>("productService");
  const products = await productService.list({}, { relations: ["variants"] });
  const odooClient = new odoo({
    baseUrl: "https://medusa9.odoo.com",
    db: "medusa9",
    username: "loredanadelic@gmail.com",
    password: "e01da446ebe16f852a310eebb33368088a14c30a",
  });
  await odooClient.connect();
  for (const product of products) {
    for (const variant of product.variants) {
      const odoProd = (await odooClient.readByExternalId(variant.id)) as any;
      const newQ = await odooClient.create("stock.change.product.qty", [
        {
          new_quantity: variant.inventory_quantity,
          product_id: odoProd.id,
          product_tmpl_id: odoProd.id,
        },
      ]);
      await odooClient.execute_kw(
        "stock.change.product.qty",
        "change_product_qty",
        [[newQ]]
      );
    }
  }
  process.exit(0);
};

odooProductQuantity();

export default odooProductQuantity;
