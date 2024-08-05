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
		// Not Found Routes
		"/{any*}": {
			get: routeDocs.default.notFound,
		},
		// CRONJOB
		"/cronjob/unverified-users": {
			delete: routeDocs.cronjob.deleteUnverifiedUsers,
		},

		// AUTH
		"/auth/register": {
			post: routeDocs.auth.postRegister,
		},

		"/auth/login": {
			post: routeDocs.auth.postLogin,
		},

		// USERS
		"/users/verify/{token}": {
			patch: routeDocs.users.patchVerifyUser,
		},

		"/users/verify/{email}": {
			get: routeDocs.users.getVerifyConfirm,
		},

		"/users/resend-verify/{email}": {
			post: routeDocs.users.postResendVerify,
		},
	},
};

module.exports = swaggerDefinition;
