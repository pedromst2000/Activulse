const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the verify user route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		param("token").exists().withMessage("Token is required"),
		param("token").isString().isLength({ min: 10 }).withMessage("Invalid token"),
	];
}

module.exports = validator;
