const utils = require("../utils");

/**
 * Middleware to validate the cronjob request.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @param {import("express").NextFunction} next - The Express middleware callback.
 * @returns {void}
 */
function validateCronjob(req, res, next) {
	const authKey = req.headers["x-auth-key"];

	if (!authKey || authKey !== process.env.CRONJOB_AUTH_KEY) {
		utils.handleResponse(res, utils.http.StatusUnauthorized, "Unauthorized");
		return;
	}

	next();
}

module.exports = validateCronjob;
