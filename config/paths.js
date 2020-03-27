const path = require("path");

module.exports = {
	root: path.resolve(__dirname, ".."),
	dist: path.resolve(__dirname, "../dist"),
	frontend: {
		dist: path.resolve(__dirname, "../dist/frontend"),
		public_path: "assets/js",
		aliases: {
			"@styles": path.resolve("./src/styles"),
			"@components": path.resolve("./src/components"),
			"@containers": path.resolve("./src/containers"),
			"@actions": path.resolve("./src/actions")
		},
		apiBaseRoute: `api/v1/`
	},
	backend: {
		dist: path.resolve(__dirname, "../dist/backend")
	}
};
