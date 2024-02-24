FROM node:20 as build

WORKDIR /usr

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

COPY package.json .

RUN npm install --production

COPY --from=build /usr/dist .

EXPOSE 3000

ENV ADDRESS=0.0.0.0 PORT=3000

CMD ["node", "index.js"]
