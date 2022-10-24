I'm rewriting everything in TypeScript :)

TODO

- [x] Setup webhooks
- [x] Sync new products when they're added
- [ ] Sync products when they're updated
- [ ] Sync products when they're deleted
- [ ] Sync shipping rates
- [ ] API endpoint to seed entire store

---

- [ ] Storefront

## Prerequisites

This starter has minimal prerequisites and most of these will usually already be installed on your computer.

- [Install Node.js](https://nodejs.org/en/download/)
- [Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Install SQLite](https://www.sqlite.org/download.html)

## Setting up your store

- Install the Medusa CLI
  ```
  npm install -g @medusajs/medusa
  yarn global add @medusajs/medusa
  ```
- Create a new Medusa project
  ```
  medusa new my-medusa-store
  ```
- Run your project
  ```
  cd my-medusa-store
  medusa develop
  ```

Your local Medusa server is now running on port **9000**.

## Try it out

```
curl -X GET localhost:9000/store/products | python -m json.tool
```

After the seed script has run you will have the following things in you database:

- a User with the email: admin@medusa-test.com and password: supersecret
- a Region called Default Region with the countries GB, DE, DK, SE, FR, ES, IT
- a Shipping Option called Standard Shipping which costs 10 EUR
- a Product called Cool Test Product with 4 Product Variants that all cost 19.50 EUR

Visit [docs.medusa-commerce.com](https://docs.medusa-comerce.com) for further guides.

<p>
  <a href="https://www.medusa-commerce.com">
    Website
  </a> 
  |
  <a href="https://medusajs.notion.site/medusajs/Medusa-Home-3485f8605d834a07949b17d1a9f7eafd">
    Notion Home
  </a>
  |
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    Twitter
  </a>
  |
  <a href="https://docs.medusa-commerce.com">
    Docs
  </a>
</p>
