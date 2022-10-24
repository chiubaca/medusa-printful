import PrintfulFulfillmentService from "services/printful-fulfillment";
import chalk from "chalk";
import { Webhook } from "../api";

class PrintfulSubscriber {
  printfulFulfillmentService_: PrintfulFulfillmentService;

  constructor({ printfulFulfillmentService, eventBusService }: any) {
    this.printfulFulfillmentService_ = printfulFulfillmentService;

    eventBusService.subscribe("printful.webhook", this.handleWebhookEvent);
  }

  handleWebhookEvent = async (payload: Webhook) => {
    switch (payload.type) {
      case "product_updated": {
        await this.printfulFulfillmentService_.upsertProduct(payload.data);
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

export default PrintfulSubscriber;
