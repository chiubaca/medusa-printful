import { z } from "zod";

export const ProductUpdatedWebhookDataSchema = z.object({
  sync_product: z.object({
    name: z.string(),
    id: z.number(),
    external_id: z.string(),
    variants: z.number().min(1),
    synced: z.optional(z.number()).nullable(),
    thumbnail: z.optional(z.string()).nullable(),
    thumbnail_url: z.optional(z.string()).nullable(),
    is_ignored: z.optional(z.boolean()).nullable(),
  }),
});

export type ProductUpdatedWebhookData = z.infer<
  typeof ProductUpdatedWebhookDataSchema
>;
