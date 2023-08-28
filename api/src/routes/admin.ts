import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

/**
 * Responds with HTTP Status 200
 *
 * @param fastify
 */
export async function pingCtl(fastify: FastifyInstance) {
  fastify.get("/ping", ping);
}

// eslint-disable-next-line require-await
async function ping(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  reply.send({ msg: "pong" });
}
