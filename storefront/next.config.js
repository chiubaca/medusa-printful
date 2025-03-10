const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "printful.s3-accelerate.amazonaws.com",
      "files.cdn.printful.com",
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
