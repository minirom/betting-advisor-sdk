import winston, { createLogger, format, transports } from 'winston';

const { combine, printf, colorize, timestamp } = format;
const colorizer = colorize();

const LEVEL = Symbol.for('level');

const filterOnly = (level) => format((info) => (info[LEVEL] === level ? info : undefined))();

const myFormatInfo = printf(({ message, timestamp: time }) => `${time} | info  | ${message}`);

const myFormatWarn = printf(({ level, message, timestamp: time }) => colorizer.colorize(level, `${time} | warn  | ${message}`));

const myFormatError = printf(({ level, message, timestamp: time }) => {
	if (message instanceof Error) {
		const text = `${time} | error | ${message.name}`;

		return colorizer.colorize(level, text);
	}
	return colorizer.colorize(level, `${time} | error | ${typeof message === 'string' ? message : JSON.stringify(message)}`);
});

class Logger {
	constructor(filename = 'logs/all.log') {
		this.logger = createLogger({
			transports: [
				new transports.Console({
					level: 'info',
					format: combine(filterOnly('info'), timestamp(), myFormatInfo),
				}),
				new transports.Console({
					level: 'warn',
					format: combine(filterOnly('warn'), timestamp(), myFormatWarn),
				}),
				new transports.Console({
					level: 'error',
					format: combine(filterOnly('error'), timestamp(), myFormatError),
				}),
				new winston.transports.File({ filename }),
			],
		});
	}

	info(...message) {
		this.logger.info(...message);
	}

	warn(...message) {
		this.logger.warn(...message);
	}

	error(...message) {
		this.logger.error(...message);
	}
}

export default new Logger();
