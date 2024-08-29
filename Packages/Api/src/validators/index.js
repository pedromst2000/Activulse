const { validationResult } = require("express-validator");
const utils = require("../utils");
const auth = require("./auth");
const users = require("./users");
const recipes = require("./recipes");
const activities = require("./activities");

/**
 * Validates the result of a request and sends an error response if there are any validation errors.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @param {import("express").NextFunction} next - The next middleware function.
 * @returns {void}
 */
const validateResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		utils.handleResponse(
			res,
			utils.http.StatusBadRequest,
			"Validation Error",
			errors.array(),
		);
		return;
	}

	next();
};

module.exports = {
	validateResult,
	auth,
	users,
	recipes,
	activities,
};
