const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the get activity endpoint.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		param("id")
			.matches(/^(me|\d+)$/)
			.withMessage("Invalid Activity id"),
	];
}

module.exports = validator;
