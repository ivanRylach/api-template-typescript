import { FastifyInstance } from "fastify";
import { pingCtl } from "./admin";
import { createRecordsCtl, fetchRecordCtl } from "./v1/records";

export async function router(fastify: FastifyInstance) {
  await fastify.register(pingCtl, { prefix: "/-" });

  await fastify.register(createRecordsCtl, { prefix: "/v1" });
  await fastify.register(fetchRecordCtl, { prefix: "/v1" });
}
