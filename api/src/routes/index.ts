import { FastifyInstance } from "fastify";
import { pingCtl } from "./admin";

export async function router(fastify: FastifyInstance) {
  await fastify.register(pingCtl, { prefix: "/-" });
}
