import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    export interface HeaderParameters {
        StoreId?: Parameters.StoreId;
    }
    namespace Parameters {
        export type CategoryId = number;
        export type Confirm = boolean;
        export type FileId = number;
        export type Limit = number;
        export type Offset = number;
        export type OrderId = string | number;
        /**
         * Optional orientation for wall art product printfiles. Allowed values: horizontal, vertical
         */
        export type Orientation = "horizontal" | "vertical";
        export type ProductCategoryId = string;
        export type ProductId = number;
        export type Query = string;
        export type Search = string;
        export type ShipmentId = number | string;
        export type Status = string;
        export type StoreId = string;
        export type StoreId2 = number;
        export type SyncProductId = number | string;
        export type SyncVariantId = number | string;
        export type TaskKey = string;
        /**
         * Optional technique for product. This can be used in cases where product supports multiple techniques like DTG and embroidery
         */
        export type Technique = string;
        export type TemplateById = number | string;
        export type UpdateExisting = boolean;
        export type VariantId = number;
    }
    export interface PathParameters {
        VariantId?: Parameters.VariantId;
        ProductId?: Parameters.ProductId;
        CategoryId?: Parameters.CategoryId;
        SyncProductId?: Parameters.SyncProductId;
        SyncVariantId?: Parameters.SyncVariantId;
        TemplateById?: Parameters.TemplateById;
        OrderId?: Parameters.OrderId;
        FileId?: Parameters.FileId;
        "StoreId-2"?: Parameters.StoreId2;
        ShipmentId?: Parameters.ShipmentId;
    }
    export interface QueryParameters {
        ProductCategoryId?: Parameters.ProductCategoryId;
        Offset?: Parameters.Offset;
        Limit?: Parameters.Limit;
        Status?: Parameters.Status;
        Confirm?: Parameters.Confirm;
        UpdateExisting?: Parameters.UpdateExisting;
        Search?: Parameters.Search;
        Orientation?: /* Optional orientation for wall art product printfiles. Allowed values: horizontal, vertical */ Parameters.Orientation;
        Technique?: /* Optional technique for product. This can be used in cases where product supports multiple techniques like DTG and embroidery */ Parameters.Technique;
        TaskKey?: Parameters.TaskKey;
        Query?: Parameters.Query;
    }
    namespace RequestBodies {
        export type AddFile = /**
         * File
         * Information about the File
         */
        Schemas.File;
        /**
         * CalculateShippingRates
         * Order information
         */
        export interface CalculateShippingRates {
            recipient: /**
             * AddressInfo
             * Recipient location information
             */
            Schemas.AddressInfo;
            /**
             * Array of order items
             */
            items: /**
             * ItemInfo
             * Order item information
             */
            Schemas.ItemInfo[];
            /**
             * 3 letter currency code (optional), required if the rates need to be converted to another currency instead of store default currency
             * example:
             * USD
             */
            currency?: string;
            /**
             * Locale in which shipping rate names will be returned. Available options: `en_US` (default), `es_ES`
             * example:
             * en_US
             */
            locale?: string;
        }
        /**
         * TaxRequest
         * Tax address information
         */
        export interface CalculateTaxRates {
            recipient: /**
             * TaxAddressInfo
             * Recipient address information
             */
            Schemas.TaxAddressInfo;
        }
        export type ChangePackingSlip = /**
         * OrderPackingSlip
         * Custom packing slip for this order
         */
        Schemas.PackingSlip;
        /**
         * CreateGenerationTask
         * Mockup generation data.
         */
        export interface CreateGenerationTask {
            /**
             * List of variant ids you want to generate.
             * example:
             * [
             *   4012,
             *   4013,
             *   4014,
             *   4017,
             *   4018,
             *   4019
             * ]
             */
            variant_ids?: number[];
            /**
             * Generated file format. PNG will have a transparent background, JPG will have a smaller file size.
             * example:
             * jpg
             */
            format?: "jpg" | "png";
            /**
             * Width of the resulting mockup images (min 50, max 1000, default is 1000)
             */
            width?: number;
            /**
             * Key-value list of product options (embroidery thread, stitch colors). Product options can be found in Catalog API endpoint.
             */
            product_options?: {
                [name: string]: any;
            };
            /**
             * List of option group names you want to generate. Product's option groups can be found in printfile API request.
             */
            option_groups?: {
                [name: string]: any;
            };
            /**
             * List of option names you want to generate. Product's options can be found in printfile API request.
             */
            options?: string[];
            files?: /**
             * GenerationTaskFile
             * Placement and file mapping to be generated.
             */
            Schemas.GenerationTaskFile[];
            /**
             * Product template id. Use instead of files parameter.
             * example:
             * 123
             */
            product_template_id?: number;
        }
        /**
         * WarehouseShipmentCreate
         */
        export interface CreateShipment {
            /**
             * Shipment ID
             */
            id?: number;
            /**
             * Location ID:
             *
             *  **3** - Charlotte, USA
             *
             * **4** - Riga, Latvia
             */
            location_id: string;
            /**
             * Shipment’s tracking number (generate your own is using HQ Drop-Off)
             */
            tracking_number: string;
            /**
             * Carrier delivering the shipment (use **HQDROPOFF** to set this shipment for HQ Drop-Off)
             */
            carrier: string;
            /**
             * Array of items in shipment
             */
            items: {
                /**
                 * Quantity of item in shipment
                 * example:
                 * 3
                 */
                quantity: number;
                /**
                 * Product variant ID
                 * example:
                 * 9001
                 */
                variant_id: number;
            }[];
        }
        export interface CreateWarehouseProduct {
            /**
             * WarehouseProduct
             * Warehouse product data
             */
            product?: {
                /**
                 * Product ID
                 * example:
                 * 12
                 */
                id?: number;
                /**
                 * Product name
                 * example:
                 * Some product name
                 */
                name?: string;
                /**
                 * Product status:
                 *
                 *  **created** - product request created,
                 *
                 *  **active** - product request approved
                 *
                 *  **suspended** - product suspended
                 *
                 *  **declined** - product request declined
                 *
                 *  **draft** - product created as a draft
                 * example:
                 * draft
                 */
                status?: "created" | "active" | "suspended" | "declined" | "draft";
                /**
                 * Currency
                 * example:
                 * USD
                 */
                currency?: string;
                /**
                 * Image URL of product
                 * example:
                 * url.to/your/image/location.png
                 */
                image_url?: string;
                /**
                 * Retail price of product
                 * example:
                 * 12.99
                 */
                retail_price: number;
                /**
                 * Array of product variants
                 */
                variants?: /**
                 * WarehouseProductVariant
                 * Warehouse product variant data
                 */
                Schemas.WarehouseProductVariant[];
            };
            /**
             * Accepts terms of service (required if haven’t been accepted already)
             * example:
             * true
             */
            terms_accepted?: boolean;
        }
        /**
         * WebhookInfo
         */
        export interface CreateWebhook {
            /**
             * Webhook URL that will receive store's event notifications
             * example:
             * *https://www.example.com/printful/webhook
             */
            url: string;
            /**
             * Array of enabled webhook event types
             * example:
             * [
             *   "package_shipped",
             *   "stock_updated"
             * ]
             */
            types: string[];
            /**
             * example:
             * {
             *   "stock_updated": {
             *     "product_ids": [
             *       5,
             *       12
             *     ]
             *   }
             * }
             */
            params?: {
                [name: string]: any;
            };
        }
        export interface OrderCanceled {
            /**
             * Event type - `order_canceled`
             * example:
             * order_canceled
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * CancelInfo
             * Cancel reason and order data
             */
            data?: {
                /**
                 * Reason why the order has been canceled.
                 */
                reason?: string;
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export interface OrderCreated {
            /**
             * Event type - `order_created`
             * example:
             * order_created
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * CreateInfo
             * Created order data
             */
            data?: {
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export interface OrderFailed {
            /**
             * Event type - `order_failed`
             * example:
             * order_failed
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * FailureInfo
             * Failure reason and order data
             */
            data?: {
                /**
                 * Reason why the order has failed.
                 */
                reason?: string;
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export type OrderInput = /**
         * Order
         * Information about the Order
         */
        Schemas.Order;
        export interface OrderPutHold {
            /**
             * Event type - `order_put_hold`
             * example:
             * order_put_hold
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * OrderStatusChange
             */
            data?: {
                /**
                 * Reason why the order status was changed.
                 */
                reason?: string;
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export interface OrderRemoveHold {
            /**
             * Event type - `order_remove_hold`
             * example:
             * order_remove_hold
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * OrderStatusChange
             */
            data?: {
                /**
                 * Reason why the order status was changed.
                 */
                reason?: string;
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export interface OrderUpdated {
            /**
             * Event type - `order_updated`
             * example:
             * order_updated
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * UpdateInfo
             * Updated order data
             */
            data?: {
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export interface PackageReturned {
            /**
             * Event type - `package_returned`
             * example:
             * package_returned
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * ReturnInfo
             * Shipment and order data
             */
            data?: {
                /**
                 * Reason why the shipment was returned.
                 */
                reason?: string;
                shipment?: /**
                 * OrderShipment
                 * Information about order shipment
                 */
                Schemas.Shipment;
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export interface PackageShipped {
            /**
             * Event type - `package_shipped`
             * example:
             * package_shipped
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * ShipmentInfo
             * Shipment and order data
             */
            data?: {
                shipment?: /**
                 * OrderShipment
                 * Information about order shipment
                 */
                Schemas.Shipment;
                order?: /**
                 * Order
                 * Information about the Order
                 */
                Schemas.Order;
            };
        }
        export interface ProductDeleted {
            /**
             * Event type - `product_deleted`
             * example:
             * product_deleted
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * SyncInfo
             */
            data?: {
                sync_product?: /**
                 * SyncProductDeleted
                 * Information about the SyncProductDeleted
                 */
                Schemas.SyncProductDeleted;
            };
        }
        export interface ProductSynced {
            /**
             * Event type - `product_synced`
             * example:
             * product_synced
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * SyncInfo
             */
            data?: {
                sync_product?: /**
                 * SyncProduct
                 * Information about the SyncProduct
                 */
                Schemas.SyncProductEvent;
            };
        }
        export interface ProductUpdated {
            /**
             * Event type - `product_updated`
             * example:
             * product_updated
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * SyncInfo
             */
            data?: {
                sync_product?: /**
                 * SyncProduct
                 * Information about the SyncProduct
                 */
                Schemas.SyncProductEvent;
            };
        }
        export interface StockUpdated {
            /**
             * Event type - `stock_updated`
             * example:
             * stock_updated
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
            /**
             * ProductStock
             */
            data?: {
                /**
                 * Product ID
                 * example:
                 * 9001
                 */
                product_id?: number;
                /**
                 * VariantStock
                 * Variant stock for this product
                 */
                variant_stock?: {
                    /**
                     * Variant IDs that are out of stock
                     */
                    out?: number[];
                    /**
                     * Variant IDs that are discontinued
                     */
                    discontinued?: number[];
                };
            };
        }
        /**
         * Product
         * Information about the Sync Product
         */
        export interface SyncProductCreate {
            sync_product: /**
             * SyncProduct
             * Information about the SyncProduct
             */
            Schemas.SyncProduct;
            /**
             * Information about the Sync Variants
             */
            sync_variants: /**
             * SyncVariant
             * Information about the SyncVariant
             */
            Schemas.SyncVariant[];
        }
        export interface SyncProductUpdate {
            sync_product?: /**
             * SyncProduct
             * Information about the SyncProduct
             */
            Schemas.SyncProduct;
            /**
             * Information about the Sync Variants
             */
            sync_variants?: {
                /**
                 * Sync Variant ID
                 * example:
                 * 10
                 */
                id?: number;
                /**
                 * Variant ID from the Ecommerce platform
                 * example:
                 * 12312414
                 */
                external_id?: string;
                /**
                 * Sync Product ID that this variant belongs to
                 * example:
                 * 71
                 */
                sync_product_id?: number;
                /**
                 * Sync Variant name
                 * example:
                 * Red T-Shirt
                 */
                name?: string;
                /**
                 * Indicates if this Sync Variant is properly linked with Printful product
                 * example:
                 * true
                 */
                synced?: boolean;
                /**
                 * Printful Variant ID that this Sync Variant is synced to
                 * example:
                 * 3001
                 */
                variant_id: number;
                /**
                 * Retail price that this item is sold for
                 * example:
                 * 29.99
                 */
                retail_price?: string;
                /**
                 * Currency in which prices are returned
                 * example:
                 * USD
                 */
                currency?: string;
                /**
                 * Indicates if this Sync Variant is ignored
                 * example:
                 * true
                 */
                is_ignored?: boolean;
                /**
                 * SKU of this Sync Variant
                 * example:
                 * SKU1234
                 */
                sku?: string;
                /**
                 * ProductVariant
                 * Short information about the Printful Product and Variant
                 */
                product?: {
                    /**
                     * Variant ID
                     * example:
                     * 3001
                     */
                    variant_id?: number;
                    /**
                     * Product ID of this variant
                     * example:
                     * 301
                     */
                    product_id?: number;
                    /**
                     * URL of a sample image for this variant
                     * example:
                     * https://files.cdn.printful.com/products/71/5309_1581412541.jpg
                     */
                    image?: string;
                    /**
                     * Display name of this variant
                     * example:
                     * Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)
                     */
                    name?: string;
                };
                /**
                 * Array of attached printfiles / preview images
                 */
                files: /**
                 * File
                 * Information about the File
                 */
                Schemas.File[];
                /**
                 * Array of additional options for the configured product/variant
                 */
                options?: /**
                 * SyncVariantOption
                 * Additional options for the configured product/variant
                 */
                Schemas.ItemOption[];
                /**
                 * Warehousing variant id. If sync variant is connected with a warehousing item, this is its id
                 * example:
                 * 3002
                 */
                warehouse_product_variant_id?: number;
            }[];
        }
        export type SyncVariantCreate = /**
         * SyncVariant
         * Information about the SyncVariant
         */
        Schemas.SyncVariant;
        /**
         * SyncVariant
         * Information about the SyncVariant
         */
        export interface SyncVariantUpdate {
            /**
             * Sync Variant ID
             * example:
             * 10
             */
            id?: number;
            /**
             * Variant ID from the Ecommerce platform
             * example:
             * 12312414
             */
            external_id?: string;
            /**
             * Sync Product ID that this variant belongs to
             * example:
             * 71
             */
            sync_product_id?: number;
            /**
             * Sync Variant name
             * example:
             * Red T-Shirt
             */
            name?: string;
            /**
             * Indicates if this Sync Variant is properly linked with Printful product
             * example:
             * true
             */
            synced?: boolean;
            /**
             * Printful Variant ID that this Sync Variant is synced to
             * example:
             * 3001
             */
            variant_id: number;
            /**
             * Retail price that this item is sold for
             * example:
             * 29.99
             */
            retail_price?: string;
            /**
             * Currency in which prices are returned
             * example:
             * USD
             */
            currency?: string;
            /**
             * Indicates if this Sync Variant is ignored
             * example:
             * true
             */
            is_ignored?: boolean;
            /**
             * SKU of this Sync Variant
             * example:
             * SKU1234
             */
            sku?: string;
            /**
             * ProductVariant
             * Short information about the Printful Product and Variant
             */
            product?: {
                /**
                 * Variant ID
                 * example:
                 * 3001
                 */
                variant_id?: number;
                /**
                 * Product ID of this variant
                 * example:
                 * 301
                 */
                product_id?: number;
                /**
                 * URL of a sample image for this variant
                 * example:
                 * https://files.cdn.printful.com/products/71/5309_1581412541.jpg
                 */
                image?: string;
                /**
                 * Display name of this variant
                 * example:
                 * Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)
                 */
                name?: string;
            };
            /**
             * Array of attached printfiles / preview images
             */
            files: /**
             * File
             * Information about the File
             */
            Schemas.File[];
            /**
             * Array of additional options for the configured product/variant
             */
            options?: /**
             * SyncVariantOption
             * Additional options for the configured product/variant
             */
            Schemas.ItemOption[];
            /**
             * Warehousing variant id. If sync variant is connected with a warehousing item, this is its id
             * example:
             * 3002
             */
            warehouse_product_variant_id?: number;
        }
    }
    namespace Responses {
        export interface AddFile {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * File
             * Information about the File
             */
            Schemas.File;
        }
        export interface BadRequest {
            /**
             * Response status code `400`
             * example:
             * 400
             */
            code?: number;
            /**
             * Actual error message
             * example:
             * Missing required parameters
             */
            result?: string;
            error?: {
                /**
                 * example:
                 * BadRequest
                 */
                reason?: string;
                /**
                 * example:
                 * Missing required parameters
                 */
                message?: string;
            };
        }
        export interface DeleteTemplate {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: {
                /**
                 * Whether the deletion was successful
                 */
                success?: boolean;
            };
        }
        export interface EstimateOrderCosts {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: {
                costs?: /**
                 * OrderCosts
                 * Order costs (Printful prices)
                 */
                Schemas.Costs;
                retail_costs?: /**
                 * OrderRetailCosts
                 * Retail costs that are to be displayed on the packing slip for international shipments. Retail costs are used only if every item in order contains the `retail_price` attribute.
                 */
                Schemas.RetailCosts;
            };
        }
        export interface Forbidden {
            /**
             * Response status code `403`
             * example:
             * 403
             */
            code?: number;
            /**
             * Actual error message
             * example:
             * This endpoint requires Oauth authentication!.
             */
            result?: string;
            error?: {
                /**
                 * example:
                 * 403
                 */
                reason?: number;
                /**
                 * example:
                 * This endpoint requires Oauth authentication!.
                 */
                message?: string;
            };
        }
        export interface GenerationTask {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * GenerationTask
             * GenerationTask
             */
            Schemas.GenerationTask;
        }
        export interface GetCategories {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * Category
             * Information about the Category
             */
            Schemas.Category[];
        }
        export interface GetCategoryById {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * Category
             * Information about the Category
             */
            Schemas.Category;
        }
        export interface GetCountries {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /* Country */ Schemas.Country[];
        }
        export interface GetFile {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * File
             * Information about the File
             */
            Schemas.File;
        }
        export interface GetProductById {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /* ProductInfo */ Schemas.ProductInfo;
        }
        export interface GetProducts {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * Product
             * Information about the Product that the Variant belongs to
             */
            Schemas.Product[];
        }
        export interface GetVariantById {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            /**
             * VariantInfo
             */
            result?: {
                variant?: /* Variant */ Schemas.Variant;
                product?: /**
                 * Product
                 * Information about the Product that the Variant belongs to
                 */
                Schemas.Product;
            };
        }
        export interface NotFound {
            /**
             * Response status code `404`
             * example:
             * 404
             */
            code?: number;
            /**
             * Actual error message
             * example:
             * Not found
             */
            result?: string;
            error?: {
                /**
                 * example:
                 * NotFound
                 */
                reason?: string;
                /**
                 * example:
                 * Not found
                 */
                message?: string;
            };
        }
        export interface Order {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * Order
             * Information about the Order
             */
            Schemas.Order;
        }
        export interface Orders {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            paging?: /**
             * Paging
             * Paging information
             */
            Schemas.Paging;
            result?: /**
             * Order
             * Information about the Order
             */
            Schemas.Order[];
        }
        export interface PackingSlip {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * OrderPackingSlip
             * Custom packing slip for this order
             */
            Schemas.PackingSlip;
        }
        export interface Printfiles {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * PrintfileInfo
             * Printfile info
             */
            Schemas.PrintfileInfo;
        }
        export interface Scopes {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: {
                scopes?: {
                    /**
                     * example:
                     * orders/read
                     */
                    scope?: string;
                    /**
                     * example:
                     * View all orders
                     */
                    display_name?: string;
                }[];
            };
        }
        export interface Shipment {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * WarehouseShipment
             * Warehouse shipment data
             */
            Schemas.WarehouseShipment;
        }
        export interface Shipments {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            paging?: /**
             * Paging
             * Paging information
             */
            Schemas.Paging;
            /**
             * Array of WarehouseShipment
             */
            result?: /**
             * WarehouseShipment
             * Warehouse shipment data
             */
            Schemas.WarehouseShipment[];
        }
        export interface ShippingRates {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * ShippingInfo
             * Shipping information
             */
            Schemas.ShippingInfo[];
        }
        export interface Store {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /* Information about the Store */ Schemas.Store;
        }
        export interface Stores {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            paging?: /**
             * Paging
             * Paging information
             */
            Schemas.Paging;
            result?: /* Information about the Store */ Schemas.Store[];
        }
        export interface SyncProduct {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * SyncProduct
             * Information about the SyncProduct
             */
            Schemas.SyncProduct;
        }
        export interface SyncProductInfo {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            /**
             * SyncProductInfo
             */
            result?: {
                sync_product?: /**
                 * SyncProduct
                 * Information about the SyncProduct
                 */
                Schemas.SyncProduct;
                /**
                 * Array of Sync Variants available for the selected product
                 */
                sync_variants?: /**
                 * SyncVariant
                 * Information about the SyncVariant
                 */
                Schemas.SyncVariant[];
            };
        }
        export interface SyncProducts {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            paging?: /**
             * Paging
             * Paging information
             */
            Schemas.Paging;
            /**
             * Array of SyncProduct
             */
            result?: /**
             * SyncProduct
             * Information about the SyncProduct
             */
            Schemas.SyncProduct[];
        }
        export interface SyncVariant {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * SyncVariant
             * Information about the SyncVariant
             */
            Schemas.SyncVariant;
        }
        export interface SyncVariantInfo {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            /**
             * SyncVariantInfo
             */
            result?: {
                sync_variant?: /**
                 * SyncVariant
                 * Information about the SyncVariant
                 */
                Schemas.SyncVariant;
                sync_product?: /**
                 * SyncProduct
                 * Information about the SyncProduct
                 */
                Schemas.SyncProduct;
            };
        }
        export interface TaxCountries {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: {
                /**
                 * Country code
                 * example:
                 * Australia
                 */
                code?: string;
                /**
                 * Country name
                 * example:
                 * AU
                 */
                name?: string;
                states?: /* State */ Schemas.State[] | null;
            }[];
        }
        export interface TaxRates {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * TaxInfo
             * Tax address information
             */
            Schemas.TaxInfo;
        }
        export interface TemplateById {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * Product template
             * Information about the template
             */
            Schemas.TemplateById;
        }
        export interface Templates {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * Product template
             * Information about the template
             */
            Schemas.Templates;
            paging?: /**
             * Paging
             * Paging information
             */
            Schemas.Paging;
        }
        /**
         * OK
         */
        export type Templates2 = any;
        export interface Unauthorized {
            /**
             * Response status code `401`
             * example:
             * 401
             */
            code?: number;
            /**
             * Actual error message
             * example:
             * Malformed Authorization header.
             */
            result?: string;
            error?: {
                /**
                 * example:
                 * BadRequest
                 */
                reason?: string;
                /**
                 * example:
                 * Malformed Authorization header.
                 */
                message?: string;
            };
        }
        export interface WarehouseProduct {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /**
             * WarehouseProduct
             * Warehouse product data
             */
            Schemas.WarehouseProduct;
        }
        export interface WarehouseProducts {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            /**
             * Array of WarehouseProducts
             */
            result?: /**
             * WarehouseProduct
             * Warehouse product data
             */
            Schemas.WarehouseProduct[];
            paging?: /**
             * Paging
             * Paging information
             */
            Schemas.Paging;
        }
        export interface WebhookInfo {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            result?: /* WebhookInfo */ Schemas.WebhookInfo;
        }
    }
    namespace Schemas {
        /**
         * Address
         * Information about the address
         */
        export interface Address {
            /**
             * Full name
             * example:
             * John Smith
             */
            name?: string;
            /**
             * Company name
             * example:
             * John Smith Inc
             */
            company?: string;
            /**
             * Address line 1
             * example:
             * 19749 Dearborn St
             */
            address1?: string;
            /**
             * Address line 2
             */
            address2?: string;
            /**
             * City
             * example:
             * Chatsworth
             */
            city?: string;
            /**
             * State code
             * example:
             * CA
             */
            state_code?: string;
            /**
             * State name
             * example:
             * California
             */
            state_name?: string;
            /**
             * Country code
             * example:
             * US
             */
            country_code?: string;
            /**
             * Country name
             * example:
             * United States
             */
            country_name?: string;
            /**
             * ZIP/Postal code
             * example:
             * 91311
             */
            zip?: string;
            /**
             * Phone number
             */
            phone?: string;
            /**
             * Email address
             */
            email?: string;
            /**
             * TAX number (`optional`, but in case of Brazil country this field becomes `required` and will be used as CPF/CNPJ number)<br> CPF format is 000.000.000-00 (14 characters);<br> CNPJ format is 00.000.000/0000-00 (18 characters).
             * example:
             * 123.456.789-10
             */
            tax_number?: string;
        }
        /**
         * AddressInfo
         * Recipient location information
         */
        export interface AddressInfo {
            /**
             * Address line 1
             * example:
             * 19749 Dearborn St
             */
            address1: string;
            /**
             * City
             * example:
             * Chatsworth
             */
            city: string;
            /**
             * Country code
             * example:
             * US
             */
            country_code: string;
            /**
             * State code (optional, required for United States, Australia and Canada)
             * example:
             * CA
             */
            state_code?: string;
            /**
             * ZIP or postal code (optional, required for some countries to calculate expedited shipping rates)
             * example:
             * 91311
             */
            zip?: string;
            /**
             * Phone number (optional)
             */
            phone?: string;
        }
        /**
         * AvailabilityStatus
         */
        export interface AvailabilityStatus {
            /**
             * Region code
             * example:
             * US
             */
            region?: string;
            /**
             * Stock status. Possible values include: 'in_stock' - available for fulfillment, 'stocked_on_demand' - available for fulfillment, 'discontinued' - permanently unavailable, 'out_of_stock' - temporarily unavailable
             * example:
             * in_stock
             */
            status?: string;
        }
        /**
         * AvailableTechnique
         */
        export interface AvailableTechnique {
            /**
             * The technique key to be used in the API
             * example:
             * DTG
             */
            key?: string;
            /**
             * The human-readable technique name
             * example:
             * DTG printing
             */
            display_name?: string;
            /**
             * Whether the technique is the default one
             */
            is_default?: boolean;
        }
        /**
         * Category
         * Information about the Category
         */
        export interface Category {
            /**
             * Category ID
             * example:
             * 24
             */
            id?: number;
            /**
             * Id of the parent Category. If there is no parent Category, 0 is returned.
             * example:
             * 6
             */
            parent_id?: number;
            /**
             * The URL of the Category image
             * example:
             * https://s3.staging.printful.com/upload/catalog_category/b1/b1513c82696405fcc316fc611c57f132_t?v=1646395980
             */
            image_url?: string;
            /**
             * Category title
             * example:
             * T-Shirts
             */
            title?: string;
        }
        /**
         * OrderCosts
         * Order costs (Printful prices)
         */
        export interface Costs {
            /**
             * 3 letter currency code
             * example:
             * USD
             */
            currency?: string;
            /**
             * Total cost of all items
             * example:
             * 10
             */
            subtotal?: string;
            /**
             * Discount sum
             * example:
             * 0
             */
            discount?: string;
            /**
             * Shipping costs
             * example:
             * 5.00
             */
            shipping?: string;
            /**
             * Digitization costs
             * example:
             * 0
             */
            digitization?: string;
            /**
             * Sum of taxes (not included in the item price)
             * example:
             * 0
             */
            tax?: string;
            /**
             * Sum of vat (not included in the item price)
             * example:
             * 0
             */
            vat?: string;
            /**
             * Grand Total (subtotal-discount+tax+vat+shipping)
             * example:
             * 15
             */
            total?: string;
        }
        /**
         * Country
         */
        export interface Country {
            /**
             * Country code
             * example:
             * Australia
             */
            code?: string;
            /**
             * Country name
             * example:
             * AU
             */
            name?: string;
            states?: /* State */ State[] | null;
        }
        /**
         * File
         * Information about the File
         */
        export interface File {
            /**
             * Role of the file
             * example:
             * default
             */
            type?: string;
            /**
             * File ID
             * example:
             * 10
             */
            id?: number;
            /**
             * Source URL where the file is downloaded from
             */
            url: string;
            /**
             * Array of additional options for this file
             */
            options?: /**
             * FileOption
             * File option
             */
            FileOption[];
            /**
             * MD5 checksum of the file
             * example:
             * ea44330b887dfec278dbc4626a759547
             */
            hash?: string;
            /**
             * File name
             * example:
             * shirt1.png
             */
            filename?: string;
            /**
             * MIME type of the file
             * example:
             * image/png
             */
            mime_type?: string;
            /**
             * Size in bytes
             * example:
             * 45582633
             */
            size?: number;
            /**
             * Width in pixels
             * example:
             * 1000
             */
            width?: number;
            /**
             * Height in pixels
             * example:
             * 1000
             */
            height?: number;
            /**
             * Resolution DPI.<br>**Note:** for vector files this may be indicated as only 72dpi, but it doesn't affect print quality since the vector files are resolution independent.
             * example:
             * 300
             */
            dpi?: number;
            /**
             * File processing status:<br>**ok** - file was processed successfuly<br>**waiting** - file is being processed<br>**failed** - file failed to be processed
             * example:
             * ok
             */
            status?: string;
            /**
             * File creation timestamp
             * example:
             * 1590051937
             */
            created?: number;
            /**
             * Small thumbnail URL
             * example:
             * https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png
             */
            thumbnail_url?: string;
            /**
             * Medium preview image URL
             * example:
             * https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png
             */
            preview_url?: string;
            /**
             * Show file in the Printfile Library (default true)
             * example:
             * true
             */
            visible?: boolean;
        }
        /**
         * FileOption
         * File option
         */
        export interface FileOption {
            /**
             * Option id
             * example:
             * template_type
             */
            id: string;
            /**
             * Option value
             * example:
             * native
             */
            value: string;
        }
        /**
         * FileType
         */
        export interface FileType {
            /**
             * Deprecated file type identifier. Please use type field instead!
             * example:
             * default
             */
            id?: string;
            /**
             * File type identifier - use this to specify a file's purpose when creating an order
             * example:
             * front
             */
            type?: string;
            /**
             * Display name
             * example:
             * Front print
             */
            title?: string;
            /**
             * Additional price when this print file type is used
             * example:
             * 2.22
             */
            additional_price?: string;
        }
        /**
         * GenerationTask
         * GenerationTask
         */
        export interface GenerationTask {
            /**
             * Task identifier you will use to retrieve generated mockups.
             * example:
             * 123456
             */
            task_key?: string;
            /**
             * Status of the generation task.
             * example:
             * completed
             */
            status?: "pending" | "completed" | "failed";
            /**
             * If task has failed, reason will be provided here.
             */
            error?: string;
            /**
             * If task is completed, list of mockups will be provided here.
             */
            mockups?: /**
             * GenerationTaskMockup
             * Generation task mockup.
             */
            GenerationTaskMockup[];
            /**
             * If task is completed, list of printfiles will be provided here.
             */
            printfiles?: /**
             * GenerationTaskTemplateFile
             * Generated File placements and URLs.
             */
            GenerationTaskTemplateFile[];
        }
        /**
         * GenerationTaskExtraMockup
         * Generation task extra mockup
         */
        export interface GenerationTaskExtraMockup {
            /**
             * Display name of the extra mockup.
             */
            title?: string;
            /**
             * Temporary URL of the mockup.
             * example:
             * https://url-to/extra-mockup.png
             */
            url?: string;
            /**
             * Style option name
             */
            option?: string;
            /**
             * Style option group name
             */
            option_group?: string;
        }
        /**
         * GenerationTaskFile
         * Placement and file mapping to be generated.
         */
        export interface GenerationTaskFile {
            /**
             * Placement identifier (front, back, etc.).
             * example:
             * front
             */
            placement?: string;
            /**
             * Public URL where your file is stored.
             * example:
             * http://your-site/path-to-front-printfile.jpg
             */
            image_url?: string;
            position?: /**
             * GenerationTaskFilePosition
             * Position
             */
            GenerationTaskFilePosition;
        }
        /**
         * GenerationTaskFilePosition
         * Position
         */
        export interface GenerationTaskFilePosition {
            /**
             * Positioning area width on print area
             * example:
             * 1800
             */
            area_width?: number;
            /**
             * Positioning area height on print area
             * example:
             * 2400
             */
            area_height?: number;
            /**
             * Width of the image in given area
             * example:
             * 1800
             */
            width?: number;
            /**
             * Height of the image in given area
             * example:
             * 1800
             */
            height?: number;
            /**
             * Image top offset in given area
             * example:
             * 300
             */
            top?: number;
            /**
             * Image left offset in given area
             * example:
             * 0
             */
            left?: number;
        }
        /**
         * GenerationTaskMockup
         * Generation task mockup.
         */
        export interface GenerationTaskMockup {
            /**
             * Placement identifier.
             * example:
             * front
             */
            placement?: string;
            /**
             * List of variant ids this mockup is used for. One mockup can be used for multiple variants.
             * example:
             * [
             *   4011,
             *   4012,
             *   4013
             * ]
             */
            variant_ids?: number[];
            /**
             * Temporary URL of the primary mockup.
             * example:
             * https://url-to/front-mockup.png
             */
            mockup_url?: string;
            /**
             * Optional extra mockups.
             */
            extra?: /**
             * GenerationTaskExtraMockup
             * Generation task extra mockup
             */
            GenerationTaskExtraMockup[];
        }
        /**
         * GenerationTaskTemplateFile
         * Generated File placements and URLs.
         */
        export interface GenerationTaskTemplateFile {
            /**
             * List of variant IDs associated with printfiles.
             * example:
             * [
             *   4012,
             *   4013,
             *   4014,
             *   4017,
             *   4018,
             *   4019
             * ]
             */
            variant_ids?: number[];
            /**
             * Placement identifier (front, back, etc.).
             * example:
             * front
             */
            placement?: string;
            /**
             * Public URL where your file is stored.
             * example:
             * https://url-to/printfile.png
             */
            url?: string;
        }
        /**
         * OrderGift
         * Optional gift message for the packing slip
         */
        export interface Gift {
            /**
             * Gift message title
             * example:
             * To John
             */
            subject?: string;
            /**
             * Gift message text
             * example:
             * Have a nice day
             */
            message?: string;
        }
        /**
         * IncompleteItem
         * Information about an incomplete item in the order
         */
        export interface IncompleteItem {
            /**
             * Incomplete item name
             * example:
             * Red T-Shirt
             */
            name?: string;
            /**
             * Incompleted item quantity
             * example:
             * 1
             */
            quantity?: number;
            /**
             * Sync variant ID of the incompleted item.
             * example:
             * 70
             */
            sync_variant_id?: number;
            /**
             * External variant ID of the incompleted item.
             * example:
             * external-id
             */
            external_variant_id?: string;
            /**
             * External order line item id.
             * example:
             * external-line-item-id
             */
            external_line_item_id?: string;
        }
        /**
         * Item
         * Information about an item in the order
         */
        export interface Item {
            /**
             * Line item ID
             * example:
             * 1
             */
            id?: number;
            /**
             * Line item ID from the external system
             * example:
             * item-1
             */
            external_id?: string;
            /**
             * Variant ID of the item ordered. See Products API
             * example:
             * 1
             */
            variant_id?: number;
            /**
             * Sync variant ID of the item ordered.
             * example:
             * 1
             */
            sync_variant_id?: number;
            /**
             * External variant ID of the item ordered.
             * example:
             * variant-1
             */
            external_variant_id?: string;
            /**
             * Warehousing product variant ID of the item ordered. See Warehouse Products API
             * example:
             * 1
             */
            warehouse_product_variant_id?: number;
            /**
             * Number of items ordered
             * example:
             * 1
             */
            quantity?: number;
            /**
             * Printful price of the item
             * example:
             * 13.00
             */
            price?: string;
            /**
             * Original retail price of the item to be displayed on the packing slip
             * example:
             * 13.00
             */
            retail_price?: string;
            /**
             * Display name of the item. If not given, a name from the Printful system will be displayed on the packing slip
             * example:
             * Enhanced Matte Paper Poster 18×24
             */
            name?: string;
            product?: /**
             * ProductVariant
             * Short information about the Printful Product and Variant
             */
            ProductVariant;
            /**
             * Array of attached printfiles / preview images
             */
            files?: /**
             * File
             * Information about the File
             */
            File[];
            /**
             * Array of additional options for this product
             */
            options?: /**
             * ItemOption
             * Additional option for order item
             */
            Option[];
            /**
             * Product identifier (SKU) from the external system
             * example:
             */
            sku?: string;
        }
        /**
         * ItemInfo
         * Order item information
         */
        export interface ItemInfo {
            /**
             * Catalog Variant ID of the item ordered. See [Catalog API](#tag/Catalog-API) <span style="color:red">*Required if no other IDs given</span>
             * example:
             * 202
             */
            variant_id?: string;
            /**
             * External Variant ID of the item ordered. See [Ecommerce Platform Sync API](#tag/Ecommerce-Platform-Sync-API). <span style="color:red">*Required if no other IDs given</span>
             * example:
             * 1001
             */
            external_variant_id?: string;
            /**
             * Warehouse product variant ID of the item ordered. See [Warehouse Products API](#tag/Warehouse-Products-API). <span style="color:red">*Required if no other IDs given</span>
             * example:
             * 2
             */
            warehouse_product_variant_id?: string;
            /**
             * Number of items ordered
             * example:
             * 10
             */
            quantity: number;
            /**
             * Item retail value - optional but can help to properly calculate
             * example:
             * 2.99
             */
            value?: string;
        }
        /**
         * SyncVariantOption
         * Additional options for the configured product/variant
         */
        export interface ItemOption {
            /**
             * Option id
             * example:
             * embroidery_type
             */
            id: string;
            /**
             * Option value
             * example:
             * flat
             */
            value: string;
        }
        /**
         * ItemOption
         * Additional option for order item
         */
        export interface Option {
            /**
             * Option ID
             * example:
             * OptionKey
             */
            id?: string;
            /**
             * Option value
             * example:
             * OptionValue
             */
            value?: string;
        }
        /**
         * OptionType
         */
        export interface OptionType {
            /**
             * Option identifier - use this to specify the option when creating an order
             * example:
             * embroidery_type
             */
            id?: string;
            /**
             * Display name
             * example:
             * Embroidery type
             */
            title?: string;
            /**
             * Data type of this option (currently only 'bool' is supported)
             * example:
             * radio
             */
            type?: string;
            /**
             * Option values - [key, value] map
             * example:
             * {
             *   "flat": "Flat Embroidery",
             *   "3d": "3D Puff",
             *   "both": "Partial 3D Puff"
             * }
             */
            values?: {
                [name: string]: any;
            };
            /**
             * Additional price when this option is used
             */
            additional_price?: string;
            /**
             * Additional price breakdown by type - [key, value] map
             * example:
             * {
             *   "flat": "0.00",
             *   "3d": "0.00",
             *   "both": "0.00"
             * }
             */
            additional_price_breakdown?: {
                [name: string]: any;
            };
        }
        /**
         * Order
         * Information about the Order
         */
        export interface Order {
            /**
             * Order ID
             * example:
             * 13
             */
            id?: number;
            /**
             * Order ID from the external system
             * example:
             * 4235234213
             */
            external_id?: string;
            /**
             * Store ID
             * example:
             * 10
             */
            store?: number;
            /**
             *  Order status:<br /> **draft** - order is not submitted for fulfillment<br /> **failed** - order was submitted for fulfillment but was not accepted because of an error (problem with address, printfiles, charging, etc.)<br /> **pending** - order has been submitted for fulfillment<br /> **canceled** - order is canceled<br /> **onhold** - order has encountered a problem during the fulfillment that needs to be resolved together with the Printful customer service **inprocess** - order is being fulfilled and is no longer cancellable<br /> **partial** - order is partially fulfilled (some items are shipped already, the rest will follow)<br /> **fulfilled** - all items are shipped<br />
             * example:
             * draft
             */
            status?: string;
            /**
             * Shipping method. Defaults to 'STANDARD'
             * example:
             * STANDARD
             */
            shipping?: string;
            /**
             * Human readable shipping method name.
             * example:
             * Flat Rate (3-4 business days after fulfillment)
             */
            shipping_service_name?: string;
            /**
             * Time when the order was created
             * example:
             * 1602607640
             */
            created?: number;
            /**
             * Time when the order was updated
             * example:
             * 1602607640
             */
            updated?: number;
            recipient: /**
             * Address
             * Information about the address
             */
            Address;
            /**
             * Array of items in the order
             */
            items: /**
             * Item
             * Information about an item in the order
             */
            Item[];
            /**
             * Array of incomplete items in the order
             */
            incomplete_items?: /**
             * IncompleteItem
             * Information about an incomplete item in the order
             */
            IncompleteItem[];
            /**
             * OrderCosts
             * Order costs (Printful prices)
             */
            costs?: {
                /**
                 * 3 letter currency code
                 * example:
                 * USD
                 */
                currency?: string;
                /**
                 * Total cost of all items
                 * example:
                 * 10
                 */
                subtotal?: string;
                /**
                 * Discount sum
                 * example:
                 * 0
                 */
                discount?: string;
                /**
                 * Shipping costs
                 * example:
                 * 5.00
                 */
                shipping?: string;
                /**
                 * Digitization costs
                 * example:
                 * 0
                 */
                digitization?: string;
                /**
                 * Sum of taxes (not included in the item price)
                 * example:
                 * 0
                 */
                tax?: string;
                /**
                 * Sum of vat (not included in the item price)
                 * example:
                 * 0
                 */
                vat?: string;
                /**
                 * Grand Total (subtotal-discount+tax+vat+shipping)
                 * example:
                 * 15
                 */
                total?: string;
            };
            retail_costs?: /**
             * OrderRetailCosts
             * Retail costs that are to be displayed on the packing slip for international shipments. Retail costs are used only if every item in order contains the `retail_price` attribute.
             */
            RetailCosts;
            /**
             * Difference between order price and retail costs. Will be shown only if order is completed.
             */
            pricing_breakdown?: /**
             * PricingBreakdown
             * Difference between order price and retail costs. Will be shown only if order is completed.
             */
            PricingBreakdown[];
            /**
             * Array of shipments already shipped for this order
             */
            shipments?: /**
             * OrderShipment
             * Information about order shipment
             */
            Shipment[];
            gift?: /**
             * OrderGift
             * Optional gift message for the packing slip
             */
            Gift;
            packing_slip?: /**
             * OrderPackingSlip
             * Custom packing slip for this order
             */
            PackingSlip;
        }
        /**
         * OrderShipmentItem
         * Information about item in an order shipment
         */
        export interface OrderShipmentItem {
            /**
             * Line item ID
             * example:
             * 1
             */
            item_id?: number;
            /**
             * Quantity of items in this shipment
             * example:
             * 1
             */
            quantity?: number;
        }
        /**
         * OrderPackingSlip
         * Custom packing slip for this order
         */
        export type PackingSlip = /**
         * OrderPackingSlip
         * Custom packing slip for this order
         */
        {
            /**
             * Customer service email
             * example:
             * your-name@your-domain.com
             */
            email: string;
            /**
             * Customer service phone
             * example:
             * +371 28888888
             */
            phone?: string;
            /**
             * Custom packing slip message
             * example:
             * Message on packing slip
             */
            message?: string;
            /**
             * URL address to a sticker we will put on a package
             * example:
             * *http://www.your-domain.com/packing-logo.png
             */
            logo_url?: string;
            /**
             * Store name override for the return address
             * example:
             * Your store name
             */
            store_name?: string;
            /**
             * Your own Order ID that will be printed instead of Printful's Order ID
             * example:
             * kkk2344lm
             */
            custom_order_id?: string;
        } | {
            /**
             * Customer service email
             * example:
             * your-name@your-domain.com
             */
            email?: string;
            /**
             * Customer service phone
             * example:
             * +371 28888888
             */
            phone: string;
            /**
             * Custom packing slip message
             * example:
             * Message on packing slip
             */
            message?: string;
            /**
             * URL address to a sticker we will put on a package
             * example:
             * *http://www.your-domain.com/packing-logo.png
             */
            logo_url?: string;
            /**
             * Store name override for the return address
             * example:
             * Your store name
             */
            store_name?: string;
            /**
             * Your own Order ID that will be printed instead of Printful's Order ID
             * example:
             * kkk2344lm
             */
            custom_order_id?: string;
        } | {
            /**
             * Customer service email
             * example:
             * your-name@your-domain.com
             */
            email?: string;
            /**
             * Customer service phone
             * example:
             * +371 28888888
             */
            phone?: string;
            /**
             * Custom packing slip message
             * example:
             * Message on packing slip
             */
            message: string;
            /**
             * URL address to a sticker we will put on a package
             * example:
             * *http://www.your-domain.com/packing-logo.png
             */
            logo_url?: string;
            /**
             * Store name override for the return address
             * example:
             * Your store name
             */
            store_name?: string;
            /**
             * Your own Order ID that will be printed instead of Printful's Order ID
             * example:
             * kkk2344lm
             */
            custom_order_id?: string;
        } | {
            /**
             * Customer service email
             * example:
             * your-name@your-domain.com
             */
            email?: string;
            /**
             * Customer service phone
             * example:
             * +371 28888888
             */
            phone?: string;
            /**
             * Custom packing slip message
             * example:
             * Message on packing slip
             */
            message?: string;
            /**
             * URL address to a sticker we will put on a package
             * example:
             * *http://www.your-domain.com/packing-logo.png
             */
            logo_url?: string;
            /**
             * Store name override for the return address
             * example:
             * Your store name
             */
            store_name?: string;
            /**
             * Your own Order ID that will be printed instead of Printful's Order ID
             * example:
             * kkk2344lm
             */
            custom_order_id: string;
        };
        /**
         * Paging
         * Paging information
         */
        export interface Paging {
            /**
             * Total number of items available
             * example:
             * 100
             */
            total?: number;
            /**
             * Current result set page offset
             * example:
             * 10
             */
            offset?: number;
            /**
             * Max number of items per page
             * example:
             * 100
             */
            limit?: number;
        }
        /**
         * PricingBreakdown
         * Difference between order price and retail costs. Will be shown only if order is completed.
         */
        export interface PricingBreakdown {
            /**
             * Amount customer paid
             * example:
             * 3.75
             */
            customer_pays?: string;
            /**
             * Printful price
             * example:
             * 6
             */
            printful_price?: string;
            /**
             * Profit
             * example:
             * -2.25
             */
            profit?: string;
            /**
             * Shipment tracking number
             * example:
             * USD
             */
            currency_symbol?: string;
        }
        /**
         * Printfile
         * Printfile
         */
        export interface Printfile {
            /**
             * Unique printfile identifier.
             * example:
             * 1
             */
            printfile_id?: number;
            /**
             * Width in pixels.
             * example:
             * 1800
             */
            width?: number;
            /**
             * Height in pixels.
             * example:
             * 2400
             */
            height?: number;
            /**
             * Resulting DPI for given width and height.
             * example:
             * 150
             */
            dpi?: number;
            /**
             * Indicates if printfile will be used in cover or fit mode. Cover mode can produce cropping if side ratio does not match printfile.
             * example:
             * fit
             */
            fill_mode?: "cover" | "fit";
            /**
             * Indicates if printfile can be rotated horizontally (e.g. for posters).
             * example:
             * false
             */
            can_rotate?: boolean;
        }
        /**
         * PrintfileInfo
         * Printfile info
         */
        export interface PrintfileInfo {
            /**
             * Requested product id.
             * example:
             * 71
             */
            product_id?: number;
            /**
             * List of available placements. Key is placement identifier, value is display name. (e.g. {embroidery_front: Front, ..}).
             */
            available_placements?: {
                /**
                 * example:
                 * Front print
                 */
                front?: string;
                /**
                 * example:
                 * Back print
                 */
                back?: string;
                /**
                 * example:
                 * Outside label
                 */
                label_outside?: string;
            };
            printfiles?: /**
             * Printfile
             * Printfile
             */
            Printfile[];
            variant_printfiles?: /* variantPrintfile */ VariantPrintfile[];
            option_groups?: string[];
            options?: string[];
        }
        /**
         * Product
         * Information about the Product that the Variant belongs to
         */
        export interface Product {
            /**
             * Product ID
             * example:
             * 13
             */
            id?: number;
            /**
             * Product type identifier
             * example:
             * T-SHIRT
             */
            type?: string;
            /**
             * Product type name
             * example:
             * T-Shirt
             */
            type_name?: string;
            /**
             * Product title
             * example:
             * Unisex Staple T-Shirt | Bella + Canvas 3001
             */
            title?: string;
            /**
             * Brand name
             * example:
             * Gildan
             */
            brand?: string;
            /**
             * Model name
             * example:
             * 2200 Ultra Cotton Tank Top
             */
            model?: string;
            /**
             * URL of a sample image for this product
             * example:
             * https://files.cdn.printful.com/products/12/product_1550594502.jpg
             */
            image?: string;
            /**
             * Number of available variants for this product
             * example:
             * 30
             */
            variant_count?: number;
            /**
             * Currency in which prices are returned
             * example:
             * EUR
             */
            currency?: string;
            /**
             * Definitions of Print/Mockup file categories that can be attached to this product
             */
            files?: /* FileType */ FileType[];
            /**
             * Definitions of additional options that are available for this product
             */
            options?: /* OptionType */ OptionType[];
            /**
             * If product is disabled in push
             * example:
             * false
             */
            is_discontinued?: boolean;
            /**
             * Average number of days for order to be fulfilled
             * example:
             * 4.3
             */
            avg_fulfillment_time?: number;
            /**
             * Product description
             */
            description?: string;
            /**
             * Available techniques
             */
            techniques?: /* AvailableTechnique */ AvailableTechnique[];
        }
        /**
         * ProductInfo
         */
        export interface ProductInfo {
            product?: /**
             * Product
             * Information about the Product that the Variant belongs to
             */
            Product;
            variants?: /* Variant */ Variant[];
        }
        /**
         * ProductTemplate
         * Product Template
         */
        export interface ProductTemplate {
            /**
             * Resource version. If this changes, resources (positions, images, etc.) should be re-cached.
             * example:
             * 1
             */
            version?: number;
            /**
             * Recommended minimum DPI for given product.
             * example:
             * 300
             */
            min_dpi?: number;
            /**
             * List of product variants mapped to templates. From this information you can determine which template should be used for a variant.
             */
            variant_mapping?: /**
             * TemplateVariantMapping
             * Template variant mapping
             */
            TemplateVariantMapping[];
            /**
             * List of templates. Use variant_mapping to determine which template corresponds to which product variant.
             */
            templates?: /**
             * Template
             * Template variant mapping
             */
            Template[];
            /**
             * List of conflicting placements. Used to determine which placements can be used together.
             */
            conflicting_placements?: /**
             * TemplatePlacementConflict
             * Template placement conflict
             */
            TemplatePlacementConflict[];
        }
        /**
         * ProductVariant
         * Short information about the Printful Product and Variant
         */
        export interface ProductVariant {
            /**
             * Variant ID
             * example:
             * 3001
             */
            variant_id?: number;
            /**
             * Product ID of this variant
             * example:
             * 301
             */
            product_id?: number;
            /**
             * URL of a sample image for this variant
             * example:
             * https://files.cdn.printful.com/products/71/5309_1581412541.jpg
             */
            image?: string;
            /**
             * Display name of this variant
             * example:
             * Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)
             */
            name?: string;
        }
        export interface Response200 {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
        }
        export interface Response200Paginated {
            /**
             * Response status code `200`
             * example:
             * 200
             */
            code?: number;
            paging?: /**
             * Paging
             * Paging information
             */
            Paging;
        }
        /**
         * OrderRetailCosts
         * Retail costs that are to be displayed on the packing slip for international shipments. Retail costs are used only if every item in order contains the `retail_price` attribute.
         */
        export interface RetailCosts {
            /**
             * 3 letter currency code
             * example:
             * USD
             */
            currency?: string;
            /**
             * Total cost of all items
             * example:
             * 10
             */
            subtotal?: string;
            /**
             * Discount sum
             * example:
             * 0
             */
            discount?: string;
            /**
             * Shipping costs
             * example:
             * 5.00
             */
            shipping?: string;
            /**
             * Digitization costs
             * example:
             * 0
             */
            digitization?: string;
            /**
             * Sum of taxes (not included in the item price)
             * example:
             * 0
             */
            tax?: string;
            /**
             * Sum of vat (not included in the item price)
             * example:
             * 0
             */
            vat?: string;
            /**
             * Grand Total (subtotal-discount+tax+vat+shipping)
             * example:
             * 15
             */
            total?: string;
        }
        /**
         * OrderShipment
         * Information about order shipment
         */
        export interface Shipment {
            /**
             * Shipment ID
             * example:
             * 10
             */
            id?: number;
            /**
             * Carrier name
             * example:
             * FEDEX
             */
            carrier?: string;
            /**
             * Delivery service name
             * example:
             * FedEx SmartPost
             */
            service?: string;
            /**
             * Shipment tracking number
             * example:
             * 0
             */
            tracking_number?: string;
            /**
             * Shipment tracking URL
             * example:
             * https://www.fedex.com/fedextrack/?tracknumbers=0000000000
             */
            tracking_url?: string;
            /**
             * Shipping time
             * example:
             * 1588716060
             */
            created?: number;
            /**
             * Ship date
             * example:
             * 2020-05-05T00:00:00.000Z
             */
            ship_date?: string;
            /**
             * Ship time in unix timestamp
             * example:
             * 1588716060
             */
            shipped_at?: string;
            /**
             * Whether this is a reshipment
             * example:
             * false
             */
            reshipment?: boolean;
            /**
             * Array of items in this shipment
             */
            items?: /**
             * OrderShipmentItem
             * Information about item in an order shipment
             */
            OrderShipmentItem[];
        }
        /**
         * ShippingInfo
         * Shipping information
         */
        export interface ShippingInfo {
            /**
             * Shipping method ID
             * example:
             * STANDARD
             */
            id?: string;
            /**
             * Shipping method name
             * example:
             * Flat Rate (Estimated delivery: May 19–24)
             */
            name?: string;
            /**
             * Shipping rate
             * example:
             * 13.60
             */
            rate?: string;
            /**
             * Currency code in which the rate is returned
             * example:
             * EUR
             */
            currency?: string;
            /**
             * Estimated minimum delivery days. <span style="color:orange">Warning! This value may not be present in response.</span>
             * example:
             * 4
             */
            minDeliveryDays?: number;
            /**
             * Estimated maximum delivery days. <span style="color:orange">Warning! This value may not be present in response.</span>
             * example:
             * 7
             */
            maxDeliveryDays?: number;
        }
        /**
         * State
         */
        export interface State {
            /**
             * State code
             * example:
             * ACT
             */
            code?: string;
            /**
             * State name
             * example:
             * Australian Capital Territory
             */
            name?: string;
        }
        /**
         * Information about the Store
         */
        export interface Store {
            /**
             * Store ID
             * example:
             * 10
             */
            id?: number;
            /**
             * Store type
             * example:
             * native
             */
            type?: string;
            /**
             * Store name
             * example:
             * My Store
             */
            name?: string;
        }
        /**
         * SyncProduct
         * Information about the SyncProduct
         */
        export interface SyncProduct {
            /**
             * SyncProduct ID
             * example:
             * 13
             */
            id?: number;
            /**
             * Product ID from the Ecommerce platform
             * example:
             * 4235234213
             */
            external_id?: string;
            /**
             * Product name
             * example:
             * T-shirt
             */
            name: string;
            /**
             * Total number of Sync Variants belonging to this product
             * example:
             * 10
             */
            variants?: number;
            /**
             * Number of synced Sync Variants belonging to this product
             * example:
             * 10
             */
            synced?: number;
            /**
             * Thumbnail image URL. Although we do not limit thumbnail image size, we recommend to keep it reasonably small.
             * example:
             * *http://your-domain.com/path/to/thumbnail.png
             */
            thumbnail?: string;
            /**
             * Thumbnail image for the product
             * example:
             * *https://your-domain.com/path/to/image.png
             */
            thumbnail_url?: string;
            /**
             * Indicates if this Sync Product is ignored
             */
            is_ignored?: boolean;
        }
        /**
         * SyncProductDeleted
         * Information about the SyncProductDeleted
         */
        export interface SyncProductDeleted {
            /**
             * SyncProduct ID
             * example:
             * 13
             */
            id: number;
            /**
             * Product ID from the Ecommerce platform
             * example:
             * 42352342133
             */
            external_id: string;
            /**
             * Product name
             * example:
             * T-shirt
             */
            name: string;
        }
        /**
         * SyncProduct
         * Information about the SyncProduct
         */
        export interface SyncProductEvent {
            /**
             * SyncProduct ID
             * example:
             * 13
             */
            id?: number;
            /**
             * Product ID from the Ecommerce platform
             * example:
             * 4235234213
             */
            external_id?: string;
            /**
             * Product name
             * example:
             * T-shirt
             */
            name: string;
            /**
             * Total number of Sync Variants belonging to this product
             * example:
             * 10
             */
            variants?: number;
            /**
             * Number of synced Sync Variants belonging to this product
             * example:
             * 10
             */
            synced?: number;
            /**
             * Thumbnail image URL. Although we do not limit thumbnail image size, we recommend to keep it reasonably small.
             * example:
             * *http://your-domain.com/path/to/thumbnail.png
             */
            thumbnail?: string;
            /**
             * Thumbnail image for the product
             * example:
             * *https://your-domain.com/path/to/image.png
             */
            thumbnail_url?: string;
            /**
             * Indicates if this Sync Product is ignored
             */
            is_ignored?: boolean;
        }
        /**
         * SyncVariant
         * Information about the SyncVariant
         */
        export interface SyncVariant {
            /**
             * Sync Variant ID
             * example:
             * 10
             */
            id?: number;
            /**
             * Variant ID from the Ecommerce platform
             * example:
             * 12312414
             */
            external_id?: string;
            /**
             * Sync Product ID that this variant belongs to
             * example:
             * 71
             */
            sync_product_id?: number;
            /**
             * Sync Variant name
             * example:
             * Red T-Shirt
             */
            name?: string;
            /**
             * Indicates if this Sync Variant is properly linked with Printful product
             * example:
             * true
             */
            synced?: boolean;
            /**
             * Printful Variant ID that this Sync Variant is synced to
             * example:
             * 3001
             */
            variant_id: number;
            /**
             * Retail price that this item is sold for
             * example:
             * 29.99
             */
            retail_price?: string;
            /**
             * Currency in which prices are returned
             * example:
             * USD
             */
            currency?: string;
            /**
             * Indicates if this Sync Variant is ignored
             * example:
             * true
             */
            is_ignored?: boolean;
            /**
             * SKU of this Sync Variant
             * example:
             * SKU1234
             */
            sku?: string;
            /**
             * ProductVariant
             * Short information about the Printful Product and Variant
             */
            product?: {
                /**
                 * Variant ID
                 * example:
                 * 3001
                 */
                variant_id?: number;
                /**
                 * Product ID of this variant
                 * example:
                 * 301
                 */
                product_id?: number;
                /**
                 * URL of a sample image for this variant
                 * example:
                 * https://files.cdn.printful.com/products/71/5309_1581412541.jpg
                 */
                image?: string;
                /**
                 * Display name of this variant
                 * example:
                 * Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)
                 */
                name?: string;
            };
            /**
             * Array of attached printfiles / preview images
             */
            files: /**
             * File
             * Information about the File
             */
            File[];
            /**
             * Array of additional options for the configured product/variant
             */
            options?: /**
             * SyncVariantOption
             * Additional options for the configured product/variant
             */
            ItemOption[];
            /**
             * Warehousing variant id. If sync variant is connected with a warehousing item, this is its id
             * example:
             * 3002
             */
            warehouse_product_variant_id?: number;
        }
        /**
         * TaxAddressInfo
         * Recipient address information
         */
        export interface TaxAddressInfo {
            /**
             * Country code
             * example:
             * US
             */
            country_code: string;
            /**
             * State code
             * example:
             * CA
             */
            state_code: string;
            /**
             * City
             * example:
             * Chatsworth
             */
            city: string;
            /**
             * ZIP or postal code
             * example:
             * 91311
             */
            zip: string;
        }
        /**
         * TaxInfo
         * Tax address information
         */
        export interface TaxInfo {
            /**
             * Whether sales tax is required for the given address
             * example:
             * true
             */
            required?: boolean;
            /**
             * Tax rate
             * example:
             * 0.095
             */
            rate?: number;
            /**
             * example:
             * false
             */
            shipping_taxable?: boolean;
        }
        /**
         * Template
         * Template variant mapping
         */
        export interface Template {
            /**
             * Template ID.
             * example:
             * 919
             */
            template_id?: number;
            /**
             * Main template image URL.
             * example:
             * https://www.printful.com/files/generator/40/11oz_template.png
             */
            image_url?: string;
            /**
             * Background image URL (optional).
             * example:
             */
            background_url?: string | null;
            /**
             * HEX color code that should be used as a background color.
             * example:
             */
            background_color?: null | number;
            /**
             * Printfile ID that should be generated for this template. See [printfile API endpoint](#operation/getPrintfiles) for list of Printfiles.
             * example:
             * 43
             */
            printfile_id?: number;
            /**
             * Width of the whole template in pixels.
             * example:
             * 560
             */
            template_width?: number;
            /**
             * Height of the whole template in pixels.
             * example:
             * 295
             */
            template_height?: number;
            /**
             * Print area width (image is positioned in this area).
             * example:
             * 520
             */
            print_area_width?: number;
            /**
             * Print area height (image is positioned in this area).
             * example:
             * 202
             */
            print_area_height?: number;
            /**
             * Print area top offset (offset in template).
             * example:
             * 18
             */
            print_area_top?: number;
            /**
             * Print area left offset (offset in template).
             * example:
             * 20
             */
            print_area_left?: number;
            /**
             * Should the main template image (image_url) be used as an overlay or as a background.
             * example:
             * true
             */
            is_template_on_front?: boolean;
            /**
             * Wall art product orientation. Possible values: horizontal, vertical, any
             * example:
             * any
             */
            orientation?: "horizontal" | "vertical" | "any";
        }
        /**
         * Product template
         * Information about the template
         */
        export interface TemplateById {
            id?: number;
            product_id?: number;
            external_product_id?: string;
            title?: string;
            available_variant_ids?: number[];
            option_data?: {
                id?: string;
                value?: string[];
            }[];
            colors?: {
                color_name?: string;
                color_codes?: any[];
            }[];
            sizes?: string[];
            mockup_file_url?: string;
            placements?: {
                placement?: string;
                display_name?: string;
            }[];
            created_at?: number;
            updated_at?: number;
        }
        /**
         * TemplatePlacementConflict
         * Template placement conflict
         */
        export interface TemplatePlacementConflict {
            /**
             * Placement ID
             * example:
             * label_outside
             */
            placement?: string;
            /**
             * List Placement IDs that are conflicting with given placement
             * example:
             * [
             *   "back",
             *   "label_inside"
             * ]
             */
            conflicts?: string[];
        }
        /**
         * TemplateVariantMapping
         * Template variant mapping
         */
        export interface TemplateVariantMapping {
            /**
             * Product variant ID.
             * example:
             * 1
             */
            variant_id?: number;
            /**
             * Array of Template Variant Mapping items
             */
            templates?: /**
             * TemplateVariantMappingItem
             * Template variant mapping item
             */
            TemplateVariantMappingItem[];
        }
        /**
         * TemplateVariantMappingItem
         * Template variant mapping item
         */
        export interface TemplateVariantMappingItem {
            /**
             * Placement ID.
             * example:
             * front
             */
            placement?: string;
            /**
             * Corresponding template id which should be used for this variant and placement combination.
             * example:
             * 1
             */
            template_id?: number;
        }
        /**
         * Product template
         * Information about the template
         */
        export interface Templates {
            items?: /**
             * Product template
             * Information about the template
             */
            TemplateById[];
        }
        /**
         * Variant
         */
        export interface Variant {
            /**
             * Variant ID, use this to specify the product when creating orders
             * example:
             * 100
             */
            id?: number;
            /**
             * ID of the product that this variant belongs to
             * example:
             * 12
             */
            product_id?: number;
            /**
             * Display name
             * example:
             * Gildan 64000 Unisex Softstyle T-Shirt with Tear Away (Black / 2XL)
             */
            name?: string;
            /**
             * Item size
             * example:
             * 2XL
             */
            size?: string;
            /**
             * Item color
             * example:
             * Black
             */
            color?: string;
            /**
             * Hexadecimal RGB color code. May not exactly reflect the real-world color
             * example:
             * #14191e
             */
            color_code?: string;
            /**
             * Secondary hexadecimal RGB color code. May not exactly reflect the real-world color
             */
            color_code2?: string;
            /**
             * URL of a preview image for this variant
             * example:
             * https://files.cdn.printful.com/products/12/629_1517916489.jpg
             */
            image?: string;
            /**
             * Variant's price (can change depending on print files and optional settings)
             * example:
             * 9.85
             */
            price?: string;
            /**
             * Stock availability of this variant
             * example:
             * true
             */
            in_stock?: boolean;
            /**
             * Map of [region code, region name] of regions where the variant is available for fulfillment
             * example:
             * {
             *   "US": "USA",
             *   "EU": "Europe"
             * }
             */
            availability_regions?: {
                [name: string]: any;
            };
            /**
             * Detailed stock status per region
             */
            availability_status?: /* AvailabilityStatus */ AvailabilityStatus[];
        }
        /**
         * variantPrintfile
         */
        export interface VariantPrintfile {
            /**
             * example:
             * 4012
             */
            variant_id?: number;
            placements?: {
                /**
                 * example:
                 * 1
                 */
                front?: number;
                /**
                 * example:
                 * 1
                 */
                back?: number;
            }[];
        }
        /**
         * WarehouseProduct
         * Warehouse product data
         */
        export interface WarehouseProduct {
            /**
             * Product ID
             * example:
             * 12
             */
            id?: number;
            /**
             * Product name
             * example:
             * Some product name
             */
            name?: string;
            /**
             * Product status:
             *
             *  **created** - product request created,
             *
             *  **active** - product request approved
             *
             *  **suspended** - product suspended
             *
             *  **declined** - product request declined
             *
             *  **draft** - product created as a draft
             * example:
             * draft
             */
            status?: "created" | "active" | "suspended" | "declined" | "draft";
            /**
             * Currency
             * example:
             * USD
             */
            currency?: string;
            /**
             * Image URL of product
             * example:
             * url.to/your/image/location.png
             */
            image_url?: string;
            /**
             * Retail price of product
             * example:
             * 12.99
             */
            retail_price?: number;
            /**
             * Array of product variants
             */
            variants?: /**
             * WarehouseProductVariant
             * Warehouse product variant data
             */
            WarehouseProductVariant[];
        }
        /**
         * WarehouseProductVariant
         * Warehouse product variant data
         */
        export interface WarehouseProductVariant {
            /**
             * Product variant ID
             * example:
             * 12
             */
            id?: number;
            /**
             * Name of product variant
             * example:
             * SomeName
             */
            name?: string;
            /**
             * SKU of product variant
             * example:
             * some-sku-12
             */
            sku?: string;
            /**
             * Image URL of product variant
             * example:
             * url.to/image/variant.png
             */
            image_url?: string;
            /**
             * Retail price of product variant
             * example:
             * 1.1
             */
            retail_price?: number; // float
            /**
             * Quantity of product variant in our stock
             * example:
             * 10
             */
            quantity?: number;
            /**
             * Length of product variant
             * example:
             * 3.21
             */
            length?: number; // float
            /**
             * Width of product variant
             * example:
             * 2.13
             */
            width?: number; // float
            /**
             * Height of product variant
             * example:
             * 3.11
             */
            height?: number; // float
            /**
             * Weight of product variant
             * example:
             * 1.11
             */
            weight?: number; // float
        }
        /**
         * WarehouseShipment
         * Warehouse shipment data
         */
        export interface WarehouseShipment {
            /**
             * Shipment ID
             * example:
             * 11
             */
            id?: number;
            /**
             * Warehouse which shipment is sent to
             * example:
             * Example warehouse
             */
            location?: string;
            /**
             * Shipment status:
             *
             *  **shipped** - shipment is shipped
             *
             *  **delivered** - shipment is delivered to our warehouse
             *
             *  **received** - shipment is received (first item is stocked in our system)
             *
             *  **processed** - all items in shipment are processed
             *
             *  **canceled** - shipment is canceled
             *
             *  **failed** - there was an error when receiving or processing shipment
             *
             *  **draft** - shipment is created as a draft
             */
            status?: "shipped" | "delivered" | "received" | "processed" | "canceled" | "failed" | "draft";
            /**
             * Shipment’s tracking number
             * example:
             * TR10000000
             */
            tracking_number?: string;
            /**
             * Carrier delivering the shipment
             * example:
             * USPS
             */
            carrier?: string;
            /**
             * Array of items in shipment
             */
            items?: /**
             * WarehouseShipmentItem
             * Warehouse shipment item data
             */
            WarehouseShipmentItem[];
        }
        /**
         * WarehouseShipmentItem
         * Warehouse shipment item data
         */
        export interface WarehouseShipmentItem {
            /**
             * Quantity of item in shipment
             * example:
             * 2
             */
            quantity?: number;
            variant?: /**
             * WarehouseProductVariant
             * Warehouse product variant data
             */
            WarehouseProductVariant;
        }
        export interface Webhook {
            /**
             * Event type
             */
            type?: string;
            /**
             * Event time
             * example:
             * 1622456737
             */
            created?: number;
            /**
             * Number of previous attempts to deliver this webhook event
             * example:
             * 2
             */
            retries?: number;
            /**
             * ID of the store that the event occured to
             * example:
             * 12
             */
            store?: number;
        }
        /**
         * WebhookInfo
         */
        export interface WebhookInfo {
            /**
             * Webhook URL that will receive store's event notifications
             * example:
             * *https://www.example.com/printful/webhook
             */
            url?: string;
            /**
             * Array of enabled webhook event types
             * example:
             * [
             *   "package_shipped",
             *   "stock_updated"
             * ]
             */
            types?: string[];
            /**
             * example:
             * {
             *   "stock_updated": {
             *     "product_ids": [
             *       5,
             *       12
             *     ]
             *   }
             * }
             */
            params?: {
                [name: string]: any;
            };
        }
    }
}
declare namespace Paths {
    namespace AddFile {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.AddFile;
        namespace Responses {
            export type $200 = Components.Responses.AddFile;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace CalculateShippingRates {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = /**
         * CalculateShippingRates
         * Order information
         */
        Components.RequestBodies.CalculateShippingRates;
        namespace Responses {
            export type $200 = Components.Responses.ShippingRates;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace CalculateTaxRates {
        export type RequestBody = /**
         * TaxRequest
         * Tax address information
         */
        Components.RequestBodies.CalculateTaxRates;
        namespace Responses {
            export type $200 = Components.Responses.TaxRates;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace CancelOrderById {
        namespace Parameters {
            export type $0 = Components.Parameters.OrderId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Order;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ChangePackingSlip {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.ChangePackingSlip;
        namespace Responses {
            export type $200 = Components.Responses.PackingSlip;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace ConfirmOrderById {
        namespace Parameters {
            export type $0 = Components.Parameters.OrderId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Order;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace CreateGeneratorTask {
        namespace Parameters {
            export type $0 = Components.Parameters.ProductId;
            export type $1 = Components.Parameters.StoreId;
        }
        export type RequestBody = /**
         * CreateGenerationTask
         * Mockup generation data.
         */
        Components.RequestBodies.CreateGenerationTask;
        namespace Responses {
            export type $200 = Components.Responses.GenerationTask;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace CreateOrder {
        namespace Parameters {
            export type $0 = Components.Parameters.Confirm;
            export type $1 = Components.Parameters.UpdateExisting;
            export type $2 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.OrderInput;
        namespace Responses {
            export type $200 = Components.Responses.Order;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace CreateShipment {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = /* WarehouseShipmentCreate */ Components.RequestBodies.CreateShipment;
        namespace Responses {
            export type $200 = Components.Responses.Shipment;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace CreateSyncProduct {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = /**
         * Product
         * Information about the Sync Product
         */
        Components.RequestBodies.SyncProductCreate;
        namespace Responses {
            export type $200 = Components.Responses.SyncProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace CreateSyncVariant {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncProductId;
            export type $1 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.SyncVariantCreate;
        namespace Responses {
            export type $200 = Components.Responses.SyncVariant;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace CreateWarehouseProduct {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.CreateWarehouseProduct;
        namespace Responses {
            export type $200 = Components.Responses.WarehouseProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace CreateWebhook {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = /* WebhookInfo */ Components.RequestBodies.CreateWebhook;
        namespace Responses {
            export type $200 = Components.Responses.WebhookInfo;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace DeleteProductTemplate {
        namespace Parameters {
            export type $0 = Components.Parameters.TemplateById;
        }
        namespace Responses {
            export type $200 = Components.Responses.DeleteTemplate;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace DeleteStoreSyncProduct {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncProductId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncProductInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace DeleteStoreSyncVariant {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncVariantId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncVariantInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace DeleteSyncProduct {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncProductId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncProductInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace DeleteSyncVariant {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncVariantId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncVariantInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace DisableWebhook {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.WebhookInfo;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace EstimateOrderCosts {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.OrderInput;
        namespace Responses {
            export type $200 = Components.Responses.EstimateOrderCosts;
        }
    }
    namespace GetCategories {
        namespace Responses {
            export type $200 = Components.Responses.GetCategories;
        }
    }
    namespace GetCategoryById {
        namespace Parameters {
            export type $0 = Components.Parameters.CategoryId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetCategoryById;
        }
    }
    namespace GetCountries {
        namespace Responses {
            export type $200 = Components.Responses.GetCountries;
        }
    }
    namespace GetFile {
        namespace Parameters {
            export type $0 = Components.Parameters.FileId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetFile;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetOrderById {
        namespace Parameters {
            export type $0 = Components.Parameters.OrderId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Order;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetOrders {
        namespace Parameters {
            export type $0 = Components.Parameters.Status;
            export type $1 = Components.Parameters.Offset;
            export type $2 = Components.Parameters.Limit;
        }
        namespace Responses {
            export type $200 = Components.Responses.Orders;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetPrintfiles {
        namespace Parameters {
            export type $0 = Components.Parameters.ProductId;
            export type $1 = /* Optional orientation for wall art product printfiles. Allowed values: horizontal, vertical */ Components.Parameters.Orientation;
            export type $2 = /* Optional technique for product. This can be used in cases where product supports multiple techniques like DTG and embroidery */ Components.Parameters.Technique;
            export type $3 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Printfiles;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetProductById {
        namespace Parameters {
            export type $0 = Components.Parameters.ProductId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetProductById;
        }
    }
    namespace GetProductTemplateById {
        namespace Parameters {
            export type $0 = Components.Parameters.TemplateById;
        }
        namespace Responses {
            export type $200 = Components.Responses.TemplateById;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetProductTemplates {
        namespace Parameters {
            export type $0 = Components.Parameters.Offset;
            export type $1 = Components.Parameters.Limit;
        }
        namespace Responses {
            export type $200 = Components.Responses.Templates;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetProducts {
        namespace Parameters {
            export type $0 = Components.Parameters.ProductCategoryId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetProducts;
        }
    }
    namespace GetScopes {
        namespace Responses {
            export type $200 = Components.Responses.Scopes;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace GetShipment {
        namespace Parameters {
            export type $0 = Components.Parameters.ShipmentId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Shipment;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetShipments {
        namespace Parameters {
            export type $1 = Components.Parameters.Offset;
            export type $2 = Components.Parameters.Limit;
            export type $3 = Components.Parameters.StoreId;
            export type Status = string;
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = Components.Responses.Shipments;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetStore {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId2;
        }
        namespace Responses {
            export type $200 = Components.Responses.Store;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace GetStoreSyncProductById {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncProductId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncProductInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetStoreSyncProducts {
        namespace Parameters {
            export type $1 = Components.Parameters.Search;
            export type $2 = Components.Parameters.Offset;
            export type $3 = Components.Parameters.Limit;
            export type $4 = Components.Parameters.StoreId;
            export type Status = string;
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncProducts;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetStoreSyncVariantById {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncVariantId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncVariantInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetStores {
        namespace Responses {
            export type $200 = Components.Responses.Stores;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
        }
    }
    namespace GetSyncProductById {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncProductId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncProductInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetSyncProducts {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncProducts;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetSyncVariantById {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncVariantId;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.SyncVariantInfo;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetTask {
        namespace Parameters {
            export type $0 = Components.Parameters.TaskKey;
            export type $1 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GenerationTask;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetTaxCountries {
        namespace Responses {
            export type $200 = Components.Responses.TaxCountries;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetTemplates {
        namespace Parameters {
            export type $0 = Components.Parameters.ProductId;
            export type $1 = /* Optional orientation for wall art product printfiles. Allowed values: horizontal, vertical */ Components.Parameters.Orientation;
            export type $2 = /* Optional technique for product. This can be used in cases where product supports multiple techniques like DTG and embroidery */ Components.Parameters.Technique;
            export type $3 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = /* OK */ Components.Responses.Templates2;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetVariantById {
        namespace Parameters {
            export type $0 = Components.Parameters.VariantId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GetVariantById;
        }
    }
    namespace GetWarehouseProduct {
        namespace Parameters {
            export type $1 = Components.Parameters.StoreId;
            export type Id = number | string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Responses.WarehouseProduct;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetWarehouseProducts {
        namespace Parameters {
            export type $0 = Components.Parameters.Query;
            export type $1 = Components.Parameters.Limit;
            export type $2 = Components.Parameters.Offset;
            export type $3 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.WarehouseProducts;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetWebhooks {
        namespace Parameters {
            export type $0 = Components.Parameters.StoreId;
        }
        namespace Responses {
            export type $200 = Components.Responses.WebhookInfo;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace UpdateOrderById {
        namespace Parameters {
            export type $0 = Components.Parameters.OrderId;
            export type $1 = Components.Parameters.Confirm;
            export type $2 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.OrderInput;
        namespace Responses {
            export type $200 = Components.Responses.Order;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace UpdateStoreSyncVariant {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncVariantId;
            export type $1 = Components.Parameters.StoreId;
        }
        export type RequestBody = /**
         * SyncVariant
         * Information about the SyncVariant
         */
        Components.RequestBodies.SyncVariantUpdate;
        namespace Responses {
            export type $200 = Components.Responses.SyncVariantInfo;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace UpdateSyncProduct {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncProductId;
            export type $1 = Components.Parameters.StoreId;
        }
        export type RequestBody = Components.RequestBodies.SyncProductUpdate;
        namespace Responses {
            export type $200 = Components.Responses.SyncProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace UpdateSyncVariant {
        namespace Parameters {
            export type $0 = Components.Parameters.SyncVariantId;
            export type $1 = Components.Parameters.StoreId;
        }
        export type RequestBody = /**
         * SyncVariant
         * Information about the SyncVariant
         */
        Components.RequestBodies.SyncVariantUpdate;
        namespace Responses {
            export type $200 = Components.Responses.SyncVariant;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
}

export interface OperationMethods {
  /**
   * getProducts - Get Products
   * 
   * Returns list of Products available in the Printful
   */
  'getProducts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProducts.Responses.$200>
  /**
   * getVariantById - Get Variant
   * 
   * Returns information about a specific Variant and its Product
   */
  'getVariantById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVariantById.Responses.$200>
  /**
   * getProductById - Get Product
   * 
   * Returns information about a specific product and a list of variants for this product.
   */
  'getProductById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProductById.Responses.$200>
  /**
   * getCategories - Get Categories
   * 
   * Returns list of Catalog Categories available in the Printful
   */
  'getCategories'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCategories.Responses.$200>
  /**
   * getCategoryById - Get Category
   * 
   * Returns information about a specific category.
   */
  'getCategoryById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCategoryById.Responses.$200>
  /**
   * getSyncProducts - Get Sync Products
   * 
   * Returns a list of Sync Product objects from your custom Printful store.
   */
  'getSyncProducts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSyncProducts.Responses.$200>
  /**
   * createSyncProduct - Create a new Sync Product
   * 
   * Creates a new Sync Product together with its Sync Variants ([See examples](#section/Products-API-examples/Create-a-new-Sync-Product)).
   */
  'createSyncProduct'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSyncProduct.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSyncProduct.Responses.$200>
  /**
   * getSyncProductById - Get a Sync Product
   * 
   * Get information about a single Sync Product and its Sync Variants.
   */
  'getSyncProductById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSyncProductById.Responses.$200>
  /**
   * updateSyncProduct - Modify a Sync Product
   * 
   * Modifies an existing Sync Product with its Sync Variants.
   * 
   * Please note that in the request body you only need to specify the fields that need to be changed. Furthermore, if you want to update existing sync variants, 
   * then in the sync variants array you must specify the IDs of all existing sync variants. All omitted existing sync variants will be deleted. All new sync 
   * variants without an ID will be created. See examples for more insights.
   * 
   * **Rate limiting:** Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.
   * 
   * **Important:** Jewelry products are not available with this endpoint.
   * 
   * [See examples](#section/Products-API-examples/Modify-a-Sync-Product)
   * 
   */
  'updateSyncProduct'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateSyncProduct.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSyncProduct.Responses.$200>
  /**
   * deleteSyncProduct - Delete a Sync Product
   * 
   * Deletes a Sync Product with all of its Sync Variants
   */
  'deleteSyncProduct'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSyncProduct.Responses.$200>
  /**
   * getSyncVariantById - Get a Sync Variant
   * 
   * Get information about a single Sync Variant.
   */
  'getSyncVariantById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSyncVariantById.Responses.$200>
  /**
   * updateSyncVariant - Modify a Sync Variant
   * 
   * Modifies an existing Sync Variant.
   * 
   * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
   * 
   * [See examples](#section/Products-API-examples/Modify-a-Sync-Variant)
   * 
   */
  'updateSyncVariant'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateSyncVariant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSyncVariant.Responses.$200>
  /**
   * deleteSyncVariant - Delete a Sync Variant
   * 
   * Deletes a single Sync Variant.
   */
  'deleteSyncVariant'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSyncVariant.Responses.$200>
  /**
   * createSyncVariant - Create a new Sync Variant
   * 
   * Creates a new Sync Variant for an existing Sync Product ([See examples](#section/Products-API-examples/Create-a-new-Sync-Variant)).
   */
  'createSyncVariant'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSyncVariant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSyncVariant.Responses.$200>
  /**
   * getProductTemplates - Get product template list
   * 
   * Returns a list of templates.
   */
  'getProductTemplates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProductTemplates.Responses.$200>
  /**
   * getProductTemplateById - Get product template
   * 
   * Get information about a single product template
   */
  'getProductTemplateById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProductTemplateById.Responses.$200>
  /**
   * deleteProductTemplate - Delete product template
   * 
   * Delete product template by ID or External Product ID
   */
  'deleteProductTemplate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteProductTemplate.Responses.$200>
  /**
   * getOrders - Get list of orders
   * 
   * Returns list of order objects from your store
   */
  'getOrders'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrders.Responses.$200>
  /**
   * createOrder - Create a new order
   * 
   * Creates a new order and optionally submits it for fulfillment ([See examples](#section/Orders-API-examples))
   */
  'createOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateOrder.Responses.$200>
  /**
   * getOrderById - Get order data
   * 
   * Returns order data by ID or External ID.
   */
  'getOrderById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrderById.Responses.$200>
  /**
   * updateOrderById - Update order data
   * 
   *  Updates unsubmitted order and optionally submits it for the fulfillment.
   * 
   *  Note that you need to post only the fields that need to be changed, not all required fields.
   * 
   *  If items array is given in the update data, the items will be:
   * 
   *  a) updated, if the update data contains the item id or external_id parameter that alreay exists
   * 
   *  b) deleted, if the request doesn't contain the item with previously existing id
   * 
   *  c) created as new if the id is not given or does not already exist 
   */
  'updateOrderById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateOrderById.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOrderById.Responses.$200>
  /**
   * cancelOrderById - Cancel an order
   * 
   * Cancels pending order or draft. Charged amount is returned to the store owner's credit card.
   */
  'cancelOrderById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelOrderById.Responses.$200>
  /**
   * confirmOrderById - Confirm draft for fulfillment
   * 
   * Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment.
   */
  'confirmOrderById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConfirmOrderById.Responses.$200>
  /**
   * estimateOrderCosts - Estimate order costs
   * 
   * Calculates the estimated order costs including item costs, print costs (back prints, inside labels etc.), shipping and taxes
   */
  'estimateOrderCosts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.EstimateOrderCosts.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EstimateOrderCosts.Responses.$200>
  /**
   * addFile - Add a new file
   * 
   * Adds a new File to the library by providing URL of the file.
   * 
   * If a file with identical URL already exists, then the original file is returned. If a file does not exist, a new file is created.
   * 
   * [See examples](#section/File-Library-API-examples/Add-a-new-file)
   * 
   */
  'addFile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddFile.Responses.$200>
  /**
   * getFile - Get file
   * 
   * Returns information about the given file.
   */
  'getFile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFile.Responses.$200>
  /**
   * getStoreSyncProducts - Get list of Sync Products
   * 
   * Returns list of Sync Product objects from your store.
   */
  'getStoreSyncProducts'(
    parameters?: Parameters<Paths.GetStoreSyncProducts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStoreSyncProducts.Responses.$200>
  /**
   * getStoreSyncProductById - Get a Sync Product
   * 
   * Get information about a single Sync Product and its Sync Variants
   */
  'getStoreSyncProductById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStoreSyncProductById.Responses.$200>
  /**
   * deleteStoreSyncProduct - Delete a Sync Product
   * 
   * Deletes a Sync Product with all of its Sync Variants
   */
  'deleteStoreSyncProduct'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteStoreSyncProduct.Responses.$200>
  /**
   * getStoreSyncVariantById - Get a Sync Variant
   * 
   * Get information about a single Sync Variant
   */
  'getStoreSyncVariantById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStoreSyncVariantById.Responses.$200>
  /**
   * updateStoreSyncVariant - Modify a Sync Variant
   * 
   * Modifies an existing Sync Variant.
   * 
   * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
   * 
   * [See examples](#section/Ecommerce-Platform-Sync-API-examples/Modify-a-Sync-Variant)
   * 
   */
  'updateStoreSyncVariant'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateStoreSyncVariant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateStoreSyncVariant.Responses.$200>
  /**
   * deleteStoreSyncVariant - Delete a Sync Variant
   * 
   * Deletes configuraton information (`variant_id`, print files and options) and disables automatic order importing for this Sync Variant.
   */
  'deleteStoreSyncVariant'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteStoreSyncVariant.Responses.$200>
  /**
   * calculateShippingRates - Calculate shipping rates
   * 
   * Returns available shipping options and rates for the given list of products.
   */
  'calculateShippingRates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CalculateShippingRates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CalculateShippingRates.Responses.$200>
  /**
   * getCountries - Retrieve country list
   * 
   * Returns list of countries and states that are accepted by the Printful.
   */
  'getCountries'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCountries.Responses.$200>
  /**
   * getTaxCountries - Get a list of countries for tax calculation
   * 
   * Retrieve state list that requires sales tax calculation
   */
  'getTaxCountries'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTaxCountries.Responses.$200>
  /**
   * calculateTaxRates - Calcuate tax rate
   * 
   * Calculates sales tax rate for given address if required
   */
  'calculateTaxRates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CalculateTaxRates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CalculateTaxRates.Responses.$200>
  /**
   * changePackingSlip - Change packing slip
   * 
   * Modifies packing slip information of the currently authorized Printful store.
   */
  'changePackingSlip'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ChangePackingSlip.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangePackingSlip.Responses.$200>
  /**
   * getStores - Get basic information about stores
   * 
   * Get basic information about stores depending on the token access level
   */
  'getStores'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStores.Responses.$200>
  /**
   * getStore - Get basic information about a store
   * 
   * Get basic information about a store based on provided ID
   */
  'getStore'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStore.Responses.$200>
  /**
   * createGeneratorTask - Create a mockup generation task
   * 
   * Creates an asynchronous mockup generation task.
   * Generation result can be retrieved using mockup generation task retrieval endpoint.<br>
   * **Rate limiting**: Up to 10 requests per 60 seconds for established stores;
   * 2 requests per 60 seconds for new stores. Currently available rate is returned in response headers.
   * A 60 seconds lockout is applied if request count is exceeded.
   * 
   */
  'createGeneratorTask'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateGeneratorTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateGeneratorTask.Responses.$200>
  /**
   * getPrintfiles - Retrieve product variant printfiles
   * 
   * List of printfiles available for products variants. Printfile indicates what file resolution should be used to create a mockup or submit an order.
   * 
   * <div class="alert alert-info">
   * This endpoint uses DTG as a default printing technique for products
   * with more than one technique available. For products with DTG and more
   * techniques available please specify the correct technique in query by using
   * the `technique` parameter. For more information read the <a href="#section/Mockup-Generator-API-examples">examples</a>.
   * </div>
   * 
   */
  'getPrintfiles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPrintfiles.Responses.$200>
  /**
   * getTask - Mockup generation task result
   * 
   * Returns asynchronous mockup generation task result. If generation task is completed, it will contain a list of generated mockups.
   */
  'getTask'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTask.Responses.$200>
  /**
   * getTemplates - Layout templates
   * 
   * Retrieve list of templates that can be used for client-side positioning.
   * 
   * <div class="alert alert-info">
   * This endpoint uses DTG as a default printing technique for product layouts
   * with more than one technique available. For products with DTG and more
   * techniques available please specify the correct technique in query by using
   * the `technique` parameter. For more information read the <a href="#section/Mockup-Generator-API-examples">examples</a>.
   * </div>
   * 
   */
  'getTemplates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTemplates.Responses.$200>
  /**
   * getWarehouseProducts - Get a list of your warehouse products
   * 
   * Returns a list of warehouse products from your store
   */
  'getWarehouseProducts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWarehouseProducts.Responses.$200>
  /**
   * createWarehouseProduct - Create a new warehouse product
   * 
   * Creates a new warehouse product and submits it for review
   */
  'createWarehouseProduct'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateWarehouseProduct.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateWarehouseProduct.Responses.$200>
  /**
   * getWarehouseProduct - Get warehouse product data
   * 
   * Returns warehouse product data by ID
   */
  'getWarehouseProduct'(
    parameters?: Parameters<Paths.GetWarehouseProduct.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWarehouseProduct.Responses.$200>
  /**
   * getShipments - Get a list of your warehouse shipments
   * 
   * Returns a list of warehouse shipments from your store
   */
  'getShipments'(
    parameters?: Parameters<Paths.GetShipments.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetShipments.Responses.$200>
  /**
   * createShipment - Create new warehouse shipment
   * 
   * Creates and submits new warehouse shipment
   */
  'createShipment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateShipment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateShipment.Responses.$200>
  /**
   * getShipment - Get warehouse shipment data
   * 
   * Returns warehouse shipment data by ID
   */
  'getShipment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetShipment.Responses.$200>
  /**
   * getWebhooks - Get webhook configuration
   * 
   * Returns configured webhook URL and list of webhook event types enabled for the store
   */
  'getWebhooks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWebhooks.Responses.$200>
  /**
   * createWebhook - Set up webhook configuration
   * 
   * Allows to enable webhook URL for the store and select webhook event types that will be sent to this URL.
   * 
   *  Note that only one webhook URL can be active for a store, so calling this method disables all existing webhook configuration.
   * 
   *  Setting up the [Stock updated](#operation/stockUpdated) webhook requires passing IDs for products that need to be monitored for changes. Stock update webhook will only include information for specified products.  These product IDs need to be set up using params property. 
   * 
   *  Method returns current webhook configuration after the update.
   */
  'createWebhook'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateWebhook.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateWebhook.Responses.$200>
  /**
   * disableWebhook - Disable webhook support
   * 
   * Removes the webhook URL and all event types from the store.
   * 
   *  Method returns current webhook configuration after the update.
   */
  'disableWebhook'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DisableWebhook.Responses.$200>
  /**
   * getScopes - Get scopes for token
   * 
   * Returns a list of scopes associated with the token
   */
  'getScopes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetScopes.Responses.$200>
}

export interface PathsDictionary {
  ['/products']: {
    /**
     * getProducts - Get Products
     * 
     * Returns list of Products available in the Printful
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProducts.Responses.$200>
  }
  ['/products/variant/{id}']: {
    /**
     * getVariantById - Get Variant
     * 
     * Returns information about a specific Variant and its Product
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVariantById.Responses.$200>
  }
  ['/products/{id}']: {
    /**
     * getProductById - Get Product
     * 
     * Returns information about a specific product and a list of variants for this product.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProductById.Responses.$200>
  }
  ['/categories']: {
    /**
     * getCategories - Get Categories
     * 
     * Returns list of Catalog Categories available in the Printful
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCategories.Responses.$200>
  }
  ['/categories/{id}']: {
    /**
     * getCategoryById - Get Category
     * 
     * Returns information about a specific category.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCategoryById.Responses.$200>
  }
  ['/store/products']: {
    /**
     * getSyncProducts - Get Sync Products
     * 
     * Returns a list of Sync Product objects from your custom Printful store.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSyncProducts.Responses.$200>
    /**
     * createSyncProduct - Create a new Sync Product
     * 
     * Creates a new Sync Product together with its Sync Variants ([See examples](#section/Products-API-examples/Create-a-new-Sync-Product)).
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSyncProduct.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSyncProduct.Responses.$200>
  }
  ['/store/products/{id}']: {
    /**
     * getSyncProductById - Get a Sync Product
     * 
     * Get information about a single Sync Product and its Sync Variants.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSyncProductById.Responses.$200>
    /**
     * deleteSyncProduct - Delete a Sync Product
     * 
     * Deletes a Sync Product with all of its Sync Variants
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSyncProduct.Responses.$200>
    /**
     * updateSyncProduct - Modify a Sync Product
     * 
     * Modifies an existing Sync Product with its Sync Variants.
     * 
     * Please note that in the request body you only need to specify the fields that need to be changed. Furthermore, if you want to update existing sync variants, 
     * then in the sync variants array you must specify the IDs of all existing sync variants. All omitted existing sync variants will be deleted. All new sync 
     * variants without an ID will be created. See examples for more insights.
     * 
     * **Rate limiting:** Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.
     * 
     * **Important:** Jewelry products are not available with this endpoint.
     * 
     * [See examples](#section/Products-API-examples/Modify-a-Sync-Product)
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateSyncProduct.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSyncProduct.Responses.$200>
  }
  ['/store/variants/{id}']: {
    /**
     * getSyncVariantById - Get a Sync Variant
     * 
     * Get information about a single Sync Variant.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSyncVariantById.Responses.$200>
    /**
     * deleteSyncVariant - Delete a Sync Variant
     * 
     * Deletes a single Sync Variant.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSyncVariant.Responses.$200>
    /**
     * updateSyncVariant - Modify a Sync Variant
     * 
     * Modifies an existing Sync Variant.
     * 
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     * 
     * [See examples](#section/Products-API-examples/Modify-a-Sync-Variant)
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateSyncVariant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSyncVariant.Responses.$200>
  }
  ['/store/products/{id}/variants']: {
    /**
     * createSyncVariant - Create a new Sync Variant
     * 
     * Creates a new Sync Variant for an existing Sync Product ([See examples](#section/Products-API-examples/Create-a-new-Sync-Variant)).
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSyncVariant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSyncVariant.Responses.$200>
  }
  ['/product-templates']: {
    /**
     * getProductTemplates - Get product template list
     * 
     * Returns a list of templates.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProductTemplates.Responses.$200>
  }
  ['/product-templates/{id}']: {
    /**
     * getProductTemplateById - Get product template
     * 
     * Get information about a single product template
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProductTemplateById.Responses.$200>
    /**
     * deleteProductTemplate - Delete product template
     * 
     * Delete product template by ID or External Product ID
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteProductTemplate.Responses.$200>
  }
  ['/orders']: {
    /**
     * getOrders - Get list of orders
     * 
     * Returns list of order objects from your store
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrders.Responses.$200>
    /**
     * createOrder - Create a new order
     * 
     * Creates a new order and optionally submits it for fulfillment ([See examples](#section/Orders-API-examples))
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateOrder.Responses.$200>
  }
  ['/orders/{id}']: {
    /**
     * getOrderById - Get order data
     * 
     * Returns order data by ID or External ID.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrderById.Responses.$200>
    /**
     * cancelOrderById - Cancel an order
     * 
     * Cancels pending order or draft. Charged amount is returned to the store owner's credit card.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelOrderById.Responses.$200>
    /**
     * updateOrderById - Update order data
     * 
     *  Updates unsubmitted order and optionally submits it for the fulfillment.
     * 
     *  Note that you need to post only the fields that need to be changed, not all required fields.
     * 
     *  If items array is given in the update data, the items will be:
     * 
     *  a) updated, if the update data contains the item id or external_id parameter that alreay exists
     * 
     *  b) deleted, if the request doesn't contain the item with previously existing id
     * 
     *  c) created as new if the id is not given or does not already exist 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateOrderById.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateOrderById.Responses.$200>
  }
  ['/orders/{id}/confirm']: {
    /**
     * confirmOrderById - Confirm draft for fulfillment
     * 
     * Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConfirmOrderById.Responses.$200>
  }
  ['/orders/estimate-costs']: {
    /**
     * estimateOrderCosts - Estimate order costs
     * 
     * Calculates the estimated order costs including item costs, print costs (back prints, inside labels etc.), shipping and taxes
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.EstimateOrderCosts.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EstimateOrderCosts.Responses.$200>
  }
  ['/files']: {
    /**
     * addFile - Add a new file
     * 
     * Adds a new File to the library by providing URL of the file.
     * 
     * If a file with identical URL already exists, then the original file is returned. If a file does not exist, a new file is created.
     * 
     * [See examples](#section/File-Library-API-examples/Add-a-new-file)
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddFile.Responses.$200>
  }
  ['/files/{id}']: {
    /**
     * getFile - Get file
     * 
     * Returns information about the given file.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFile.Responses.$200>
  }
  ['/sync/products']: {
    /**
     * getStoreSyncProducts - Get list of Sync Products
     * 
     * Returns list of Sync Product objects from your store.
     */
    'get'(
      parameters?: Parameters<Paths.GetStoreSyncProducts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStoreSyncProducts.Responses.$200>
  }
  ['/sync/products/{id}']: {
    /**
     * getStoreSyncProductById - Get a Sync Product
     * 
     * Get information about a single Sync Product and its Sync Variants
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStoreSyncProductById.Responses.$200>
    /**
     * deleteStoreSyncProduct - Delete a Sync Product
     * 
     * Deletes a Sync Product with all of its Sync Variants
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteStoreSyncProduct.Responses.$200>
  }
  ['/sync/variant/{id}']: {
    /**
     * getStoreSyncVariantById - Get a Sync Variant
     * 
     * Get information about a single Sync Variant
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStoreSyncVariantById.Responses.$200>
    /**
     * updateStoreSyncVariant - Modify a Sync Variant
     * 
     * Modifies an existing Sync Variant.
     * 
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     * 
     * [See examples](#section/Ecommerce-Platform-Sync-API-examples/Modify-a-Sync-Variant)
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateStoreSyncVariant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateStoreSyncVariant.Responses.$200>
    /**
     * deleteStoreSyncVariant - Delete a Sync Variant
     * 
     * Deletes configuraton information (`variant_id`, print files and options) and disables automatic order importing for this Sync Variant.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteStoreSyncVariant.Responses.$200>
  }
  ['/shipping/rates']: {
    /**
     * calculateShippingRates - Calculate shipping rates
     * 
     * Returns available shipping options and rates for the given list of products.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CalculateShippingRates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CalculateShippingRates.Responses.$200>
  }
  ['/countries']: {
    /**
     * getCountries - Retrieve country list
     * 
     * Returns list of countries and states that are accepted by the Printful.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCountries.Responses.$200>
  }
  ['/tax/countries']: {
    /**
     * getTaxCountries - Get a list of countries for tax calculation
     * 
     * Retrieve state list that requires sales tax calculation
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTaxCountries.Responses.$200>
  }
  ['/tax/rates']: {
    /**
     * calculateTaxRates - Calcuate tax rate
     * 
     * Calculates sales tax rate for given address if required
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CalculateTaxRates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CalculateTaxRates.Responses.$200>
  }
  ['/store/packing-slip']: {
    /**
     * changePackingSlip - Change packing slip
     * 
     * Modifies packing slip information of the currently authorized Printful store.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ChangePackingSlip.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangePackingSlip.Responses.$200>
  }
  ['/stores']: {
    /**
     * getStores - Get basic information about stores
     * 
     * Get basic information about stores depending on the token access level
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStores.Responses.$200>
  }
  ['/stores/{id}']: {
    /**
     * getStore - Get basic information about a store
     * 
     * Get basic information about a store based on provided ID
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStore.Responses.$200>
  }
  ['/mockup-generator/create-task/{id}']: {
    /**
     * createGeneratorTask - Create a mockup generation task
     * 
     * Creates an asynchronous mockup generation task.
     * Generation result can be retrieved using mockup generation task retrieval endpoint.<br>
     * **Rate limiting**: Up to 10 requests per 60 seconds for established stores;
     * 2 requests per 60 seconds for new stores. Currently available rate is returned in response headers.
     * A 60 seconds lockout is applied if request count is exceeded.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateGeneratorTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateGeneratorTask.Responses.$200>
  }
  ['/mockup-generator/printfiles/{id}']: {
    /**
     * getPrintfiles - Retrieve product variant printfiles
     * 
     * List of printfiles available for products variants. Printfile indicates what file resolution should be used to create a mockup or submit an order.
     * 
     * <div class="alert alert-info">
     * This endpoint uses DTG as a default printing technique for products
     * with more than one technique available. For products with DTG and more
     * techniques available please specify the correct technique in query by using
     * the `technique` parameter. For more information read the <a href="#section/Mockup-Generator-API-examples">examples</a>.
     * </div>
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPrintfiles.Responses.$200>
  }
  ['/mockup-generator/task']: {
    /**
     * getTask - Mockup generation task result
     * 
     * Returns asynchronous mockup generation task result. If generation task is completed, it will contain a list of generated mockups.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTask.Responses.$200>
  }
  ['/mockup-generator/templates/{id}']: {
    /**
     * getTemplates - Layout templates
     * 
     * Retrieve list of templates that can be used for client-side positioning.
     * 
     * <div class="alert alert-info">
     * This endpoint uses DTG as a default printing technique for product layouts
     * with more than one technique available. For products with DTG and more
     * techniques available please specify the correct technique in query by using
     * the `technique` parameter. For more information read the <a href="#section/Mockup-Generator-API-examples">examples</a>.
     * </div>
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTemplates.Responses.$200>
  }
  ['/warehouse/products']: {
    /**
     * getWarehouseProducts - Get a list of your warehouse products
     * 
     * Returns a list of warehouse products from your store
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWarehouseProducts.Responses.$200>
    /**
     * createWarehouseProduct - Create a new warehouse product
     * 
     * Creates a new warehouse product and submits it for review
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateWarehouseProduct.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateWarehouseProduct.Responses.$200>
  }
  ['/warehouse/products/{id}']: {
    /**
     * getWarehouseProduct - Get warehouse product data
     * 
     * Returns warehouse product data by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetWarehouseProduct.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWarehouseProduct.Responses.$200>
  }
  ['/warehouse/shipments']: {
    /**
     * getShipments - Get a list of your warehouse shipments
     * 
     * Returns a list of warehouse shipments from your store
     */
    'get'(
      parameters?: Parameters<Paths.GetShipments.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetShipments.Responses.$200>
    /**
     * createShipment - Create new warehouse shipment
     * 
     * Creates and submits new warehouse shipment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateShipment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateShipment.Responses.$200>
  }
  ['/warehouse/shipments/{id}']: {
    /**
     * getShipment - Get warehouse shipment data
     * 
     * Returns warehouse shipment data by ID
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetShipment.Responses.$200>
  }
  ['/webhooks']: {
    /**
     * getWebhooks - Get webhook configuration
     * 
     * Returns configured webhook URL and list of webhook event types enabled for the store
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWebhooks.Responses.$200>
    /**
     * createWebhook - Set up webhook configuration
     * 
     * Allows to enable webhook URL for the store and select webhook event types that will be sent to this URL.
     * 
     *  Note that only one webhook URL can be active for a store, so calling this method disables all existing webhook configuration.
     * 
     *  Setting up the [Stock updated](#operation/stockUpdated) webhook requires passing IDs for products that need to be monitored for changes. Stock update webhook will only include information for specified products.  These product IDs need to be set up using params property. 
     * 
     *  Method returns current webhook configuration after the update.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateWebhook.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateWebhook.Responses.$200>
    /**
     * disableWebhook - Disable webhook support
     * 
     * Removes the webhook URL and all event types from the store.
     * 
     *  Method returns current webhook configuration after the update.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DisableWebhook.Responses.$200>
  }
  ['/oauth/scopes']: {
    /**
     * getScopes - Get scopes for token
     * 
     * Returns a list of scopes associated with the token
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetScopes.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
