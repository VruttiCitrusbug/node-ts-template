/*external modules*/
import { createLogger, format, transports, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { addMonths } from "date-fns";
import path from "path";
import config from "config";

/**
 * Singleton class that provides a logger instance to log messages.
 * It uses winston and winston-daily-rotate-file to log messages to a file.
 * The log file is rotated daily and the old log files are zipped and kept for 3 months.
 * The logger instance is exposed by the getInstance() method.
 *
 * @class LoggerService
 * @hideconstructor
 */
class LoggerService {
  private static instance: LoggerService;
  private logger: Logger;

  // Private constructor to enforce singleton pattern
  private constructor() {
    const logDir = path.join(__dirname, "logs");

    // Create the logger instance
    this.logger = createLogger({
      level: config.logger.level,
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        }),
      ),
      transports: [
        new DailyRotateFile({
          filename: `${logDir}/app-%DATE%.log`,
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: `${addMonths(new Date(), -3).toISOString()}`,
          auditFile: `${logDir}/audit.json`,
        }),
        new transports.Console(),
      ],
      exitOnError: false,
    });
  }

  // Singleton method to return the same instance of LoggerService
  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  // Public method to expose the logger for logging messages
  public info(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public debug(message: string) {
    this.logger.debug(message);
  }
}

export default LoggerService;
