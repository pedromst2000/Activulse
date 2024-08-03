const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the login route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		body("email").isEmail().withMessage("Email must be a valid email address"),

		body("password")
			.isString()
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/)
			.withMessage(
				"Password must contain at least one lowercase letter, one uppercase letter, one digit and be at least 8 characters long",
			),

		body("remember_me").isBoolean().withMessage("Remember me must be a boolean"),
	];
}

module.exports = validator;
