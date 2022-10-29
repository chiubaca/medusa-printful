import PrintfulFulfillmentService from "services/printful-fulfillment";
import chalk from "chalk";
import { Webhook } from "../api";
import { MedusaContainer } from "@medusajs/medusa/dist/types/global";

import {
  ProductDeletedWebhookDataSchema,
  ProductUpdatedWebhookDataSchema,
} from "../schemas";

class PrintfulWebhookSubscriber {
  printfulFulfillmentService_: PrintfulFulfillmentService;

  constructor({
    printfulFulfillmentService,
    eventBusService,
  }: MedusaContainer["cradle"]) {
    this.printfulFulfillmentService_ = printfulFulfillmentService;

    eventBusService.subscribe("printful.webhook", this.handleWebhookEvent);
  }

  handleWebhookEvent = async (payload: Webhook) => {
    console.log(`Webhook received: ${payload.type}`);

    switch (payload.type) {
      case "product_updated": {
        const productUpdatedWebhookData = ProductUpdatedWebhookDataSchema.parse(
          payload.data
        );

        await this.printfulFulfillmentService_.handleProductUpdated(
          productUpdatedWebhookData.sync_product
        );
        break;
      }
      // TODO: investigate why deletion webhook on printful is not getting fired
      case "product_deleted": {
        const productDeletedWebhookData = ProductDeletedWebhookDataSchema.parse(
          payload.data
        );

        await this.printfulFulfillmentService_.handleProductDeleted(
          productDeletedWebhookData.sync_product
        );
        break;
      }
      case "package_shipped": {
        await this.printfulFulfillmentService_.createShipment(payload.data);
        break;
      }
      default:
        console.log(chalk.yellow(`${payload.type} is not being handled yet`));
        return;
    }
  };
}

export default PrintfulWebhookSubscriber;
