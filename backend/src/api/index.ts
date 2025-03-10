import { Router } from "express";
import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate-customer";
import cors from "cors";
import { Validator } from "medusa-core-utils";
import { projectConfig } from "../../medusa-config";
import bodyParser from "body-parser";

import { Components } from "../typed-printful-client/generated-types";
import { UserService } from "@medusajs/medusa";
import PrintfulFulfillmentService from "services/printful-fulfillment";

export type Webhook = Components.Schemas.Webhook & { data: any };

export default () => {
  const router = Router();

  const corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  router.options("/printful/shipping-rates", cors(corsOptions));
  router.post(
    "/printful/shipping-rates",
    cors(corsOptions),
    async (req, res) => {
      const schema = Validator.object().keys({
        shipping_address: Validator.object().keys({
          address1: Validator.string(),
          city: Validator.string(),
          country_code: Validator.string(),
        }),
        items: Validator.array().items(
          Validator.object().keys({
            quantity: Validator.number(),
            external_variant_id: Validator.string(),
          })
        ),
      });

      const printfulService = req.scope.resolve("printfulFulfillmentService");

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

      const shippingOptions = await printfulService.getShippingRates();

      res.json({
        message: "Welcome to Medusa!",
      });
    }
  );

  router.options("/printful/hook", cors(corsOptions));
  router.post(
    "/printful/hook",
    cors(corsOptions),
    bodyParser.json(),

    (req, res) => {
      const schema = Validator.object<Webhook>().keys({
        type: Validator.string(),
        created: Validator.number(),
        retries: Validator.number(),
        store: Validator.number(),
        data: Validator.object(),
      });

      const { value, error } = schema.validate(req.body);

      if (error) {
        console.error("printful-plugin:: problem parsing webhook payload");
        throw error;
      }

      const eventBus: any = req.scope.resolve("eventBusService");
      eventBus.emit("printful.webhook", value);

      res.sendStatus(200);
    }
  );

  router.options("/admin/printful/seed-store");
  router.post(
    "/admin/printful/seed-store",
    cors(corsOptions),
    authenticate(),
    async (req, res) => {
      // console.log("🚀 ~ file: index.ts ~ line 92 ~ router.post ~ res", res);
      const user = req.user;

      if (!user) {
        return res.json({
          message: "no API token was provided",
        });
      }

      const userService: UserService = req.scope.resolve("userService");
      const userDetails = await userService.retrieve(user.id);

      if (userDetails.email !== process.env.SUPER_ADMIN) {
        return res.json({
          message: "Only a super admin can perform this action",
        });
      }

      const printfulService: PrintfulFulfillmentService = req.scope.resolve(
        "printfulFulfillmentService"
      );

      const resp = await printfulService.seedStoreFromPrintful();

      res.json({
        message: resp,
      });
    }
  );

  router.get("/", (req, res) => {
    res.send("<h1>Hello Medusa</h1>");
  });

  return router;
};
