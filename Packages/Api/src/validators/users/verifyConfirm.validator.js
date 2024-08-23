const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the resend verify route.
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
	];
}

module.exports = validator;
