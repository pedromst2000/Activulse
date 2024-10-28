const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the validation of the challenge id.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		param("id")
			.matches(/^(me|\d+)$/)
			.withMessage("Invalid challenge id"),
	];
}

module.exports = validator;
