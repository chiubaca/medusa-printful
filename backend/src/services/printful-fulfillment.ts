import _ from "lodash";
import { FulfillmentService } from "medusa-interfaces";
import { PrintfulClient } from "better-printful-request";

import type { Client as PrintfulClient2 } from "../typed-printful-client";
import printfulClient from "../typed-printful-client/printful-client";

import chalk from "chalk";

import {
  OrderService,
  Product,
  ProductService,
  ProductStatus,
  ProductVariantService,
  ShippingProfileService,
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import invariant from "tiny-invariant";
import { CreateProductInput } from "@medusajs/medusa/dist/types/product";
import { CreateProductVariantInput } from "@medusajs/medusa/dist/types/product-variant";
import type {
  ProductDeletedWebhookData,
  ProductUpdatedWebhookData,
} from "../schemas";

const printfulApiKey = process.env.PRINTFUL_API_KEY || "";

class PrintfulFulfillmentService extends FulfillmentService {
  static identifier = "printful";

  private productService_: ProductService;
  private productVariantService_: ProductVariantService;
  private orderService_: OrderService;
  private shippingProfileService_: ShippingProfileService;

  private printfulClient_: PrintfulClient;
  private typedPrintfulClient: PrintfulClient2;

  constructor({
    manager,
    productService,
    orderService,
    productVariantService,
    shippingProfileService,
  }: any) {
    super();

    this.productService_ = productService;
    this.productVariantService_ = productVariantService;
    this.orderService_ = orderService;
    this.manager_ = manager as unknown as EntityManager;
    this.shippingProfileService_ = shippingProfileService;

    this.printfulClient_ = new PrintfulClient(printfulApiKey);
    this.typedPrintfulClient = printfulClient();
  }

  getFulfillmentOptions() {
    return [
      { id: "Standard", printful_id: "STANDARD" },
      { id: "Express", printful_id: "PRINTFUL_FAST" },
    ];
  }

  canCalculate() {
    return true;
  }

  validateFulfillmentData(optionData, data, _) {
    return {
      ...optionData,
      ...data,
    };
  }

  validateOption() {
    return true;
  }

  async getShippingRates({ recipient, items }) {
    const rates = await this.printfulClient_
      .post("shipping/rates", { recipient, items })
      .then(({ result }) => result);

    return rates.map((r) => ({
      id: r.name,
      printful_id: r.id,
      name: r.name,
      min_delivery_days: r.minDeliveryDays,
      max_delivery_days: r.maxDeliveryDays,
    }));
  }

  async createWebhooks() {
    console.log(chalk.yellow("printful-plugin::setting up webhooks..."));

    const backendUrl = process.env.BACKEND_URL;
    const medusaWebhookUrl = `${backendUrl}/printful/hook`;

    console.log(
      chalk.yellow(
        `printful-plugin::webhook url configured to ${medusaWebhookUrl}`
      )
    );

    if (!backendUrl) {
      console.log(
        chalk.red(
          "printful-plugin::backend must be configured for this plugin to work"
        )
      );
    }

    const types = [
      "product_updated",
      "order_canceled",
      "order_updated",
      "order_created",
      "package_shipped",
    ];

    // const currentConfig = await this.typedPrintfulClient
    //   .getWebhooks()
    //   .then((resp) => resp.data.result);

    // when the configs match we dont need to re-run update request to printful
    // if (
    //   currentConfig?.url === mesdusaWebhookUrl &&
    //   _.isEqual(currentConfig?.types, types)
    // ) {
    //   console.log(chalk.yellow(`printful-plugin::Webhooks are already setup `));
    //   return;
    // }

    try {
      await this.typedPrintfulClient.createWebhook(null, {
        url: medusaWebhookUrl,
        types,
      });
    } catch (error) {
      console.log(
        chalk.red("printful-plugin::Problem updating printful webhook"),
        error
      );
    }
  }

  addVariantOptions_(variant: any, productOptions: Product["options"]) {
    const options = productOptions.map((o, i) => ({
      option_id: o.id,
      ...variant.options[i],
    }));

    variant.options = options;

    return variant;
  }

  async test() {
    console.log("HELLO FROM TEST");
  }

  async seedStoreFromPrintful() {
    // Abort action if there are products already.
    // We should only be able to perform on a fresh store
    const productCount = await this.productService_.count();
    if (productCount > 0) {
      return "Cant perform this action when there products in the store already";
    }

    const printfulProducts = await this.typedPrintfulClient
      .getStoreSyncProducts()
      .then((resp) => resp.data.result);

    if (!printfulProducts || !printfulProducts.length) {
      return "no printful products to seed";
    }

    const work = () => {
      for (const product of printfulProducts) {
        this.upsertPrintfulProductAndVariantsById(String(product.id));
      }
    };

    this.atomicPhase_(
      work,
      (e: any) =>
        console.error("seedStoreFromPrintful:isolationOrErrorHandler", e),
      (e: any) =>
        console.error("seedStoreFromPrintful:maybeErrorHandlerOrDontFail", e)
    );

    return "store has been seeded from Printful successfully";
  }

  async handleProductDeleted(
    syncProduct: ProductDeletedWebhookData["sync_product"]
  ) {
    const work = async () => {
      const medusaProduct = await this.productService_
        .withTransaction(this.manager_)
        .retrieveByExternalId(String(syncProduct.id));

      await this.productService_
        .withTransaction(this.manager_)
        .delete(medusaProduct.id);

      console.log(` ${medusaProduct.id}:${medusaProduct.handle} was deleted`);
    };

    return this.atomicPhase_(
      work,
      (e: any) =>
        console.error("handleProductDeleted:isolationOrErrorHandler", e),
      (e: any) =>
        console.error("handleProductDeleted:maybeErrorHandlerOrDontFail", e)
    );
  }

  async upsertPrintfulProductAndVariantsById(printfulProductId: string) {
    let shippingProfile = await this.shippingProfileService_.retrieveDefault();

    invariant(shippingProfile, "no default shipping profile available");
    const syncProductInfo = await this.typedPrintfulClient
      .getStoreSyncProductById({
        id: printfulProductId,
      })
      .then((resp) => resp.data.result);

    invariant(syncProductInfo, "no sync product info");
    const { sync_product, sync_variants } = syncProductInfo;

    invariant(sync_product);
    const productData: CreateProductInput = {
      title: sync_product.name,
      handle: _.kebabCase(sync_product.name),
      thumbnail: sync_product.thumbnail_url, //TODO :thumbnail not always coming through
      // images: [], TODO: pull in multiple images if possible
      options: [{ title: "Printful variant" }],
      profile_id: shippingProfile.id,
      external_id: String(printfulProductId), //TODO type will fixed in upcoming update
      status: ProductStatus.PUBLISHED,
      metadata: {
        printful_id: sync_product.id,
      },
    };

    const product = await this.productService_
      .withTransaction(this.manager_)
      .create(productData);

    invariant(
      sync_variants,
      `${product.handle} must have at least one variant`
    );
    const variantsData = sync_variants.map((v) => {
      const varOption = `${v.variant_id}`;

      return {
        title: v.name,
        inventory_quantity: 100, //pull from printful
        manage_inventory: false,
        allow_backorder: true,
        sku: v.sku,
        options: [
          {
            value: varOption,
          },
        ],
        prices: [
          {
            currency_code: v.currency,
            amount: v.retail_price ? parseInt(v.retail_price, 10) * 100 : 0, //TODO double check this correct
          },
        ],
        metadata: {
          // TODO bring in more meta data
          printful_id: v.id,
          printful_sync_product_id: v.sync_product_id,
        },
      };
    });

    const variantInput: CreateProductVariantInput[] = variantsData.map((v) =>
      this.addVariantOptions_(v, product.options)
    );

    for (const variant of variantInput) {
      await this.productVariantService_
        .withTransaction(this.manager_)
        .create(product.id, variant);
    }

    console.log(
      chalk.green(
        `✔ ${product.handle} was added along with ${sync_variants.length} variant(s)`
      )
    );
  }

  /**
   * Handler for the "product_updated" Printful webhook.
   * This when an existing product has been updated and when a new items is added.
   */
  async handleProductUpdated(
    syncProduct: ProductUpdatedWebhookData["sync_product"]
  ) {
    const work = async () => {
      const exists = await this.productService_
        .withTransaction(this.manager_)
        .list({ external_id: String(syncProduct.id) });

      // If the item already exist, delete first it. This is far simpler than trying to reconcile the differences.
      if (exists && exists.length > 0) {
        console.log("deleting existing item...");
        await this.productService_.delete(exists[0].id);
      }

      this.upsertPrintfulProductAndVariantsById(String(syncProduct.id));
    };

    return this.atomicPhase_(
      work,
      (e: any) =>
        console.error("upsertProductInMedusa:isolationOrErrorHandler", e),
      (e: any) =>
        console.error("upsertProductInMedusa:maybeErrorHandlerOrDontFail", e)
    );
  }

  async createFulfillment(methodData, fulfillmentItems, order, fulfillment) {
    const { shipping_address } = order;

    const addr = {
      name: `${shipping_address.first_name} ${shipping_address.last_name}`,
      address1: shipping_address.address_1,
      address2: shipping_address.address_2,
      zip: shipping_address.postal_code,
      city: shipping_address.city,
      state_code: shipping_address.provence,
      country_code: shipping_address.country_code.toUpperCase(),
      phone: shipping_address.phone,
      email: order.email,
    };

    const printfulItems = fulfillmentItems.map((item) => ({
      external_id: item.id,
      sync_variant_id: item.variant.metadata.printful_id,
      quantity: item.quantity,
    }));

    const newOrder = {
      external_id: order.id,
      items: printfulItems,
      recipient: addr,
      shipping: methodData.printful_id,
    };

    return this.printfulClient_
      .post("orders", newOrder)
      .then(({ result }) => result);
  }

  async createShipment(data) {
    return console.log("create shipment is broken..");

    const { shipment, order } = data;

    const orderId = order.order.external_id;

    const medusaOrder = await this.orderService_.retrieve(orderId, {
      relations: ["fulfillments"],
    });

    const fulfillment = medusaOrder.fulfillments[0];

    const trackingLinks = [
      {
        url: shipment.tracking_url,
        tracking_number: shipment.tracking_number,
      },
    ];

    return this.orderService_.createShipment(
      orderId,
      fulfillment.id,
      trackingLinks
    );
  }
}

export default PrintfulFulfillmentService;
