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
		body("email")
			.exists()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email must be a valid email address"),

		body("password")
			.exists()
			.withMessage("Password is required")
			.isString()
			.withMessage("Password must be a string"),

		body("remember_me").exists().withMessage("Remember me is required"),

		body("remember_me").custom((value) => {
			if (value === true || value === false) {
				return true;
			}

			throw new Error("Remember me must be a boolean");
		}),
	];
}

module.exports = validator;
