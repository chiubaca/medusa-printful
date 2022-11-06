FROM node:17.1.0

ARG JWT_SECRET
ARG COOKIE_SECRET
ARG PRINTFUL_API_KEY
ARG BACKEND_URL
ARG DATABASE_URL
ARG REDIS_URL
ARG SUPER_ADMIN

WORKDIR /app/medusa

COPY package.json .
COPY start.sh .
COPY yarn.* .

RUN yarn global add @medusajs/medusa-cli@latest

RUN yarn

COPY . .

ENTRYPOINT ["./start.sh"]
