var winston = require("winston");
const { combine, timestamp, label, printf } = winston.format;

const LEVEL = process.env.LOG_LEVEL || "debug";

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${JSON.stringify(message)}`;
});

const logger = winston.createLogger({
  level: LEVEL,
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger;
