const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the get user endpoint.
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
		body("stress")
			.exists()
			.withMessage("stress is required")
			.isString()
			.withMessage("stress must be a string")
			.isIn(["Rare", "Sometimes", "Frequently"])
			.withMessage("stress must be one of Rare, Sometimes, Frequently"),

		body("havesDiet")
			.exists()
			.withMessage("havesDiet required")
			.isBoolean({ strict: true })
			.withMessage("havesDiet must be a boolean"),

		body("fastFoodStatus").custom((value, { req }) => {
			if (req.body.havesDiet === false) {
				if (!req.body.fastFoodStatus) {
					throw new Error("fastFoodStatus is required");
				}
				if (req.body.fastFoodStatus) {
					const POSSIBLE_VALUES = ["Rare", "Sometimes", "Frequently"];

					if (!POSSIBLE_VALUES.includes(req.body.fastFoodStatus)) {
						throw new Error("fastFoodStatus must be one of Rare, Sometimes, Frequently");
					}
				}
			} else if (
				req.body.havesDiet === true &&
				(req.body.fastFoodStatus || req.body.fastFoodStatus === "")
			) {
				throw new Error("fastFoodStatus is not required when havesDiet is true");
			}

			return true; // advance to the next validation
		}),

		body("diet").custom((value, { req }) => {
			if (req.body.havesDiet === true) {
				if (!req.body.diet) {
					throw new Error("diet is required when havesDiet is true");
				}
				if (req.body.diet) {
					const POSSIBLE_VALUES = ["DASH", "Mediterranean", "Vegan"];

					if (!POSSIBLE_VALUES.includes(req.body.diet)) {
						throw new Error("diet must be one of DASH, Mediterranean, Vegan");
					}
				}
			} else if (
				req.body.havesDiet === false &&
				(req.body.diet || req.body.diet === "")
			) {
				throw new Error("diet is not required when havesDiet is false");
			}

			return true; // advance to the next validation
		}),
	];
}

module.exports = validator;
