const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the login route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		body("email").isEmail().withMessage("Email must be a valid email address"),

		body("password").isString().withMessage("Password must be a string"),

		body("remember_me").custom((value) => {

			if(value === true || value === false) {
				return true;
			}

			throw new Error("Remember me must be a boolean");

		})
	];
}

module.exports = validator;
