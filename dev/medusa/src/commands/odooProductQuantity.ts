import { ProductService } from "@medusajs/medusa";
import express from "express";
import loaders from "@medusajs/medusa/dist/loaders";
import odoo from "odoo-await";
import path from "path";
const odooProductQuantity = async (): Promise<void> => {
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
    baseUrl: process.env.ODOO_BASE_URL,
    db: process.env.ODOO_DB,
    username: process.env.ODOO_USERNAME,
    password: process.env.ODOO_PASSWORD,
  });
  await odooClient.connect();
  for (const product of products) {
    for (const variant of product.variants) {
      try {
        const odoProd = await odooClient.readByExternalId<any>(variant.id);
        const newQ = await odooClient.create("stock.change.product.qty", [
          {
            new_quantity: variant.inventory_quantity,
            product_id: odoProd.id,
            product_tmpl_id: odoProd.product_tmpl_id[0],
          },
        ]);
        await odooClient.execute_kw(
          "stock.change.product.qty",
          "change_product_qty",
          [[newQ]]
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  process.exit(0);
};

odooProductQuantity();

export default odooProductQuantity;
