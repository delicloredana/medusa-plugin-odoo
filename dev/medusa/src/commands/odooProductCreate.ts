import { ProductService } from "@medusajs/medusa";
import express from "express";
import loaders from "@medusajs/medusa/dist/loaders";
import odoo from "odoo-await";
import path from "path";
const odooProductCreate = async (): Promise<void> => {
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
    {
      relations: [
        "variants",
        "variants.prices",
        "options",
        "options.values",
        "variants.options",
      ],
    }
  );
  const odooClient = new odoo({
    baseUrl: process.env.ODOO_BASE_URL,
    db: process.env.ODOO_DB,
    username: process.env.ODOO_USERNAME,
    password: process.env.ODOO_PASSWORD,
  });
  await odooClient.connect();
  let template;
  for (const product of products) {
    try {
      template = await odooClient.readByExternalId<any>(product.id);
    } catch (err) {
      template = await odooClient.create("product.template", {
        name: product.title,
        detailed_type: "product",
      });

      await odooClient.createExternalId(
        "product.template",
        template,
        product.id
      );

      const attributeLineIds = [];
      for (const option of product.options) {
        const attributeId = await odooClient.create("product.attribute", {
          name: option.title,
        });
        const attributeValueIds = [];

        const optionValues = [];
        for (const value of option.values) {
          if (!optionValues.includes(value.value)) {
            optionValues.push(value.value);
            const attributeValueId = await odooClient.create(
              "product.attribute.value",
              { attribute_id: attributeId, name: value.value }
            );
            attributeValueIds.push(attributeValueId);
          }
        }
        const attributeLineId = await odooClient.create(
          "product.template.attribute.line",
          {
            attribute_id: attributeId,
            value_ids: attributeValueIds,
            product_tmpl_id: template,
          }
        );
        attributeLineIds.push(attributeLineId);
      }
      await odooClient.update("product.template", template, {
        attribute_line_ids: attributeLineIds,
      });
      const templateData = await odooClient.read<any>(
        "product.template",
        template
      );

      for (const variant of templateData[0].product_variant_ids) {
        const variantData = await odooClient.read<any>(
          "product.product",
          variant
        );
        console.log(variantData);
        const title = variantData[0].display_name;
        const x = title.split("(");
        if (x.length > 1) {
          const y = x[1].split(")");
          const z = y[0].split(", ");
          const productVariant = product.variants.find((v) =>
            v.options.every((o) => z.includes(o.value))
          );
          await odooClient.createExternalId(
            "product.product",
            variant,
            productVariant.id
          );
        } else {
          await odooClient.createExternalId(
            "product.product",
            variant,
            product.variants[0].id
          );
        }
      }
    }
  }
  process.exit(0);
};

odooProductCreate();

export default odooProductCreate;
