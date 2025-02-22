const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the chance daily goals endpoint.
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

		body("steps")
			.optional()
			.custom((value) => {
				if (typeof value !== "number") {
					throw new Error("steps must be a number");
				}
				return true;
			})
			.isInt({ min: 0 })
			.withMessage("steps must be a positive number")
			.isInt({ min: 2500 })
			.withMessage("steps must be at least 2500"),

		body("distance")
			.optional()
			.custom((value) => {
				if (typeof value !== "number") {
					throw new Error("distance must be a number");
				}
				return true;
			})
			.isInt({ min: 0 })
			.withMessage("distance must be a positive number")
			.isInt({ min: 1905 })
			.withMessage("distance must be at least 1905"),
	];
}

module.exports = validator;
