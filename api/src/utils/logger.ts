import * as winston from "winston";
import { logLevel } from "./config";

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(winston.format.splat(), winston.format.timestamp(), winston.format.json()),
  // transports: [GoogleCloudLogging],
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console({ level: "error" })],
  exitOnError: false,
});

export { logger };
