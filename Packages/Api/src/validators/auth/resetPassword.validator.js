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

		body("new_password")
			.exists()
			.withMessage("new_password is required")
			.isString()
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
			.withMessage(
				"new_password must contain at least one lowercase letter, one uppercase letter, one digit and be at least 8 characters long",
			),
		body("confirm_password")
			.exists()
			.withMessage("confirm_password is required")
			.isString()
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
			.withMessage(
				"confirm_password must contain at least one lowercase letter, one uppercase letter, one digit and be at least 8 characters long",
			),
		body("email")
			.exists()
			.withMessage("email is required")
			.isEmail()
			.withMessage("email must be a valid email"),
	];
}

module.exports = validator;
