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

		//---------------------------AUTH---------------------------------------------------

		"/auth/register": {
			post: routeDocs.auth.postRegister,
		},

		"/auth/login": {
			post: routeDocs.auth.postLogin,
		},

		"/auth/users/request-reset-password": {
			post: routeDocs.auth.postRequestResetPassword,
		},

		"/auth/users/verify-otp": {
			post: routeDocs.auth.postVerifyOTP,
		},

		"/auth/users/reset-password": {
			patch: routeDocs.auth.patchResetPassword,
		},

		//---------------------------USERS---------------------------------------------------

		"/users/me": {
			get: routeDocs.users.getLoggedUser,
		},

		"/users/{id}": {
			get: routeDocs.users.getUserProfile,
		},

		"/users/verify": {
			post: routeDocs.users.postVerifyConfirm,
		},

		"/users/resend-verify": {
			post: routeDocs.users.postResendVerify,
		},

		"/users/heart-risk-assessment": {
			post: routeDocs.users.postRiskAssessment,
		},

		"/users/verify/{token}": {
			patch: routeDocs.users.patchVerifyUser,
		},

		"/users/extra-assessment": {
			patch: routeDocs.users.patchExtraAssessment,
		},

		//---------------------------RECIPES---------------------------------------------------

		"/recipes/{id}": {
			get: routeDocs.recipes.getRecipeDetails,
		},

		"/recipes": {
			get: routeDocs.recipes.getRecipesFeed,
		},

		"/recipes/{id}/favorites": {
			post: routeDocs.recipes.postAddRecipeFavorites,
		},

		//---------------------------ACTIVITIES---------------------------------------------------

		"/activities/{id}": {
			get: routeDocs.activities.getActivitiesDetails,
		},

		"/activities": {
			get: routeDocs.activities.getActivitiesFeed,
		},

		"/activities/{id}/favorites": {
			post: routeDocs.activities.postAddActivityFav,
		},
	},
};

module.exports = swaggerDefinition;
