import { server } from "../src/server";
import { logger } from "../src/utils/logger";

/**
 * https://mochajs.org/#root-hook-plugins
 */
export function mochaHooks(): Mocha.RootHookObject {
  return {
    async afterAll() {
      logger.info("Cleaning resources up after Mocha");
      await server.close();
    },
  };
}
