import { MedusaContainer } from "@medusajs/medusa/dist/types/global";
import PrintfulFulfillmentService from "services/printful-fulfillment";

const createWebhooks = async (container: MedusaContainer) => {
  const printfulFulfillmentService: PrintfulFulfillmentService =
    container.resolve("printfulFulfillmentService");

  await printfulFulfillmentService.createWebhooks();
  // await printfulFulfillmentService.test();
};

export default createWebhooks;
