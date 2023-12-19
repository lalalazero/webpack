const Parser = require("./parser");
const path = require("path");

const cwd = process.cwd();
const file = path.join(cwd, "logs", "diff-compiler.txt");
const file2 = path.join(cwd, "logs", "webpack4-compiler-hooks-runtime.md");
const parser = new Parser(file);

parser.parse().then(() => {
	parser.printHead("## compiler hooks")
	parser.print(file2);
});
