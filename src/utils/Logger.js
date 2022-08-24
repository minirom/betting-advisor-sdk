/* eslint-disable no-console */
import colors from 'colors';
import LoggerLevelsEnum from '../enums/LoggerLevelsEnum.js';

colors.setTheme({
	[LoggerLevelsEnum.INFO]: 'blue',
	[LoggerLevelsEnum.DEBUG]: 'yellow',
	[LoggerLevelsEnum.ERROR]: 'red',
	[LoggerLevelsEnum.FATAL]: 'cyan',
	[LoggerLevelsEnum.WARN]: 'green',
});

let level = LoggerLevelsEnum.INFO;

const INFO_LEVELS = [LoggerLevelsEnum.DEBUG, LoggerLevelsEnum.INFO];
const WARN_LEVELS = [...INFO_LEVELS, LoggerLevelsEnum.WARN];
const ERROR_LEVELS = [...WARN_LEVELS, LoggerLevelsEnum.ERROR];
const FATAL_LEVELS = [...ERROR_LEVELS, LoggerLevelsEnum.FATAL];

class Logger {
	static setLevel(_level) {
		level = _level;
	}

	static displayLevel(l) {
		return `[${l}]`[l];
	}

	static debug(...message) {
		if (level === LoggerLevelsEnum.DEBUG) {
			console.log(this.displayLevel(LoggerLevelsEnum.DEBUG), ...message);
		}
	}

	static info(...message) {
		if (INFO_LEVELS.includes(level)) {
			console.log(this.displayLevel(LoggerLevelsEnum.INFO), ...message);
		}
	}

	static warn(...message) {
		if (WARN_LEVELS.includes(level)) {
			console.log(this.displayLevel(LoggerLevelsEnum.WARN), ...message);
		}
	}

	static error(...message) {
		if (ERROR_LEVELS.includes(level)) {
			console.log(this.displayLevel(LoggerLevelsEnum.ERROR), ...message);
		}
	}

	static fatal(...message) {
		if (FATAL_LEVELS.includes(level)) {
			console.log(this.displayLevel(LoggerLevelsEnum.FATAL), ...message);
		}
	}
}

export default Logger;
