const fs = require("fs");
const readline = require("readline");

class Parser {
	constructor(filename) {
		this.filename = filename;
		this.cache = {};
		this.runtimeHooksOrderList = [];
		this.outputString = [];
	}

	addRuntimeHook(hook) {
		if (this.runtimeHooksOrderList.includes(hook)) {
			return;
		}

		this.runtimeHooksOrderList.push(hook);
	}
	addHookPlugin(hook, plugin) {
		if (!this.cache[hook]) {
			this.cache[hook] = [plugin];
			return;
		}

		if (!this.cache[hook].includes(plugin)) {
			this.cache[hook].push(plugin);
		}
	}

	async parse() {
		const filestream = fs.createReadStream(this.filename);
		const rl = readline.createInterface({
			input: filestream,
			crlfDelay: Infinity,
		});

		let prevHookName = "";
		let prevPluginName = "";

		for await (const line of rl) {
			let isPlugin = false;
			let text = line.trim();

			if (text) {
				if (text.endsWith("Plugin")) {
					isPlugin = true;
				} else {
					isPlugin = false;
				}

				if (isPlugin) {
					prevPluginName = text;
				} else {
					prevHookName = text;
					this.addHookPlugin(prevHookName, prevPluginName);
					this.addRuntimeHook(text);
				}
			} else {
				prevHookName = "";
				prevPluginName = "";
			}
		}
	}

	printHead(head) {
		this.outputString.push(head)
	}

	print(filename) {
		this.printHead();
		this.runtimeHooksOrderList.forEach((hook) => {
			const template = `
### ${hook}

| 注册插件                    |                                        作用 |
|-------------------------|---------------------------------------------|
`;

			// fs.appendFileSync(filename, template, "utf8");
			this.outputString.push(template);
			const hookPlugins = this.cache[hook] || [];

			hookPlugins.forEach((plugin) => {
				const t = `| ${plugin} | |\n`;
				this.outputString.push(t);
				// fs.appendFileSync(filename, template, "utf8");
			});
		});

		fs.appendFileSync(filename, this.outputString.join(""), "utf8");
	}
}

module.exports = Parser;
