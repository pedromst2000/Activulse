const { param, body } = require("express-validator");

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
		body("OTP")
			.exists()
			.withMessage("OTP is required")
			.isString()
			.withMessage("OTP must be a string")
			.isLength({ min: 6, max: 6 })
			.withMessage("OTP must be 6 digits long"),
		param("email").exists().withMessage("Email is required"),
		param("email").isEmail().withMessage("Email must be a valid email address"),
	];
}

module.exports = validator;
