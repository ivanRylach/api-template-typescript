import Fastify, { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import { router } from "./routes";
import { logger } from "./utils/logger";
import { mongoClient } from "./services/mongo";

export const server: FastifyInstance = Fastify({
  // pluginTimeout: 30000,

  // We rely on readiness probe to stop accepting traffic - https://github.com/fastify/fastify/issues/1714
  return503OnClosing: false,
  logger: true,
});

// Register CORS plugin prior to everything else, so it would have precedence
server.register(fastifyCors, {
  origin: ["http://localhost:3000", "http://127.0.0.1:8080"],
  maxAge: 24 * 60 * 60,
  strictPreflight: true,
});

server.register(router, { prefix: "/api" });

server.addHook("onReady", () => {
  logger.info("Ready to accept traffic");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.addHook("onClose", async (instance) => {
  await mongoClient.close();
  logger.info("Server resources released");
});
