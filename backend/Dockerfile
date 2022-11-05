FROM node:17.1.0

WORKDIR /app/medusa

COPY package.json .
COPY start.sh .
COPY yarn.* .

RUN yarn global add @medusajs/medusa-cli@latest

RUN yarn

COPY . .

ENTRYPOINT ["./start.sh"]
