const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the resend verify route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [param("email").isEmail().withMessage("Email must be a valid email address")];
}

module.exports = validator;
