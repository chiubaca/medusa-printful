// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL = process.env.DATABASE_URL;
// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL;

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
};
