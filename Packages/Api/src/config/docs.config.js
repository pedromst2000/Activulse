const fs = require("fs");
const YAML = require("yaml");
const routeDocs = require("../docs/routes");

const info = YAML.parse(fs.readFileSync("./src/docs/info.yml", "utf8"));

const serverURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:5000/api/v1"
		: process.env.API_PROD_URL;

/** @type {import("swagger-jsdoc").SwaggerDefinition} */
const swaggerDefinition = {
	openapi: "3.0.1",
	info,
	servers: [{ url: serverURL }],
	paths: {
		// DEFAULT
		"/": {
			get: routeDocs.default.getWelcomeApi,
		},
		"/{any*}": {
			get: routeDocs.default.notFound,
		},
	},
};

module.exports = swaggerDefinition;
