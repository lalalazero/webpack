const fs = require("fs");
const path = require("path");
const Parser = require('./parser')

const map = new Map();

function appendFile(text, filename, newLine = true) {
	const cwd = process.cwd();
	const file = path.join(cwd, "logs", filename);
	fs.appendFileSync(file, text, "utf8");
	newLine && fs.appendFileSync(file, "\n", "utf8");
}

function logImmediate(text, filename) {
	appendFile(text, "diff-" + filename);
}

function logNoDuplication(text, filename) {
	let list = map.get(filename);

	if (!list) {
		list = [];
		map.set(filename, list);
		list.push(text);
	} else {
		if (list.indexOf(text) < 0) {
			list.push(text);
		}
	}
}
function logErrorStack(err, filename) {
	try {
		tryErrorStack();
	} catch (e) {
		const text = err || "111 " + e.stack.toString();
		const regex = /(\w+)Plugin/

		const match = text.match(regex);
		const pluginName = match ? match[0] : null;
		if (pluginName) {
			appendFile('\n', filename, false)
			appendFile(pluginName, filename);
		}
	}
}

function log(text, filename, isErr) {
	if (isErr) {
		logErrorStack(text, filename);
	} else {
		logImmediate(text, filename);
		logNoDuplication(text, filename);
	}
}

function tryErrorStack() {
	const { stackTraceLimit } = Error;
	Error.stackTraceLimit = 0;
	const err = new Error();
	Error.stackTraceLimit = stackTraceLimit;

	Error.captureStackTrace(err, log);

	throw err;
}

module.exports = {
	log,
	Parser,
};
