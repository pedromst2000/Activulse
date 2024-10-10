const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the validation of the recipe id.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		param("id")
			.matches(/^(me|\d+)$/)
			.withMessage("Invalid recipe id"),
	];
}

module.exports = validator;
