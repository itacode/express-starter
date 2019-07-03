const winston = require('winston');
require('winston-daily-rotate-file');

const consoleTransport = new winston.transports.Console({
  level: 'debug',
  format: winston.format.simple(),
});

const dailyRotateFile = new winston.transports.DailyRotateFile({
  filename: './log/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'info',
  transports: [
    consoleTransport,
    dailyRotateFile,
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports.logger = logger;
