import { server } from "./server";
import { port } from "./utils/config";
import { logger } from "./utils/logger";

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);

function shutdown() {
  logger.info("Shutdown initiated");
  server.close().then(() => {
    logger.info("Resources released");
    logger.end();
    logger.on("end", () => {
      process.exit(0);
    });
  });
}

server.listen(port, "0.0.0.0", (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server is listening at ${address}`);
});
