import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../utils/logger";
import { createRecord, fetchRecord } from "../../repos/recordsRepo";
import { getErrorMessage } from "../../utils/errors";

/**
 * Creates a new record
 *
 * @param fastify
 */
export async function createRecordsCtl(fastify: FastifyInstance) {
  fastify.post("/records", async (request, reply) => {
    try {
      const inserted = await createRecord({
        name: "n-qwe",
        description: "d-qwe",
      });
      return reply.status(StatusCodes.OK).send(JSON.stringify(inserted));
    } catch (e) {
      logger.error(e);
      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  });
}

interface IParams {
  name: string;
}

/**
 * Creates a new record
 *
 * @param fastify
 */
export async function fetchRecordCtl(fastify: FastifyInstance) {
  fastify.get<{
    Params: IParams;
  }>("/records/:name", async (request, reply) => {
    try {
      const name = request.params.name;
      const record = await fetchRecord(name);
      if (record) {
        return reply.status(StatusCodes.OK).send(JSON.stringify(record));
      } else {
        return reply.status(StatusCodes.NOT_FOUND).send("Not found");
      }
    } catch (e) {
      logger.error(getErrorMessage(e));
      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  });
}
