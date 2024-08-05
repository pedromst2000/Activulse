const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the login route.
 * @returns {Array} An array of validation rules.
 */

function validator() {
	return [
		body().custom((value, { req }) => {
			if (Object.keys(req.body).length === 0) {
				throw new Error("Body is empty");
			}
			return true;
		}),
		body("username")
			.exists()
			.withMessage("Username is required")
			.isLength({ min: 3 })
			.withMessage("Username must be at least 3 characters long"),

		body("email")
			.exists()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email must be a valid email address")
			.matches(/@gmail.com$/)
			.withMessage("Email must be a gmail account"),

		body("password")
			.exists()
			.withMessage("Password is required")
			.isString()
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
			.withMessage(
				"Password must contain at least one lowercase letter, one uppercase letter, one digit and be at least 8 characters long",
			),
	];
}

module.exports = validator;
