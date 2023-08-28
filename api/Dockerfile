FROM node:20-bullseye-slim as builder

RUN npm install -g npm

ADD ./api /app

WORKDIR /app

RUN npm install
RUN npm run build

FROM node:20-bullseye-slim as target

ADD ./api /app
WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build

CMD ["node", "/app/build/main.js"]
