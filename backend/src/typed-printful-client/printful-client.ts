import OpenAPIClientAxios, { Document } from "openapi-client-axios";
import { Client } from "../generated/generatedTypes";
import { definition } from "./printful-openapi";

import chalk from "chalk";

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

if (!PRINTFUL_API_KEY) {
  console.warn(chalk.red("\n No printful API token has been set"));
}

const printfulClient = () => {
  console.log(chalk.green("\n ✔ Printful API token present"));
  return new OpenAPIClientAxios({
    definition: definition as unknown as Document,
    quick: true,
    axiosConfigDefaults: {
      headers: {
        Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      },
    },
  }).initSync<Client>();
};

export default printfulClient;
