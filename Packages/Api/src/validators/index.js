const { validationResult } = require("express-validator");
const utils = require("../utils");
const auth = require("../validators/auth");
const users = require("../validators/users");
const recipes = require("../validators/recipes");
const activities = require("../validators/activities");
const favorites = require("../validators/favorites");

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
	favorites,
};
