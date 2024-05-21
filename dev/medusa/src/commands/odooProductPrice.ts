import { ProductService } from "@medusajs/medusa";
import express from "express";
import loaders from "@medusajs/medusa/dist/loaders";
import odoo from "odoo-await";
import path from "path";
const odooProductPrice = async (): Promise<void> => {
  console.info("Starting loader...");
  const app = express();
  const directory = path.resolve(__dirname, "../../");
  const { container } = await loaders({
    directory,
    expressApp: app,
    isTest: false,
  });

  const productService = container.resolve<ProductService>("productService");
  const products = await productService.list(
    {},
    { relations: ["variants", "variants.prices"] }
  );

  const odooClient = new odoo({
    baseUrl: process.env.ODOO_BASE_URL,
    db: process.env.ODOO_DB,
    username: process.env.ODOO_USERNAME,
    password: process.env.ODOO_PASSWORD,
  });
  await odooClient.connect();

  for (const product of products) {
    for (const variant of product.variants) {
      const newPrice = variant.prices.find(
        (price) => price.currency_code === process.env.ODOO_CURRENCY_CODE
      );
      await odooClient.updateByExternalId(variant.id, {
        list_price: newPrice.amount / 100,
      });
    }
  }
  process.exit(0);
};

odooProductPrice();

export default odooProductPrice;
