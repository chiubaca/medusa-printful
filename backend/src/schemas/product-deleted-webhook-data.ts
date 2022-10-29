import { z } from "zod";

export const ProductDeletedWebhookDataSchema = z.object({
  sync_product: z.object({
    name: z.string(),
    id: z.number(),
    external_id: z.string(),
  }),
});

export type ProductDeletedWebhookData = z.infer<
  typeof ProductDeletedWebhookDataSchema
>;
