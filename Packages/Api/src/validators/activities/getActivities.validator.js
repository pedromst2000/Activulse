const { query } = require("express-validator");
const config = require("../../config");

/**
 * Returns an array of validation rules for the get recipes feed endpoint
 * @returns {Array} An array of validation rules
 */

function validator() {
	return [
		query("page").exists().withMessage("Page Query is required"),

		query("page")
			.isInt({ min: 1 })
			.toInt()
			.withMessage("Page must be a positive integer"),

		query("limit").exists().withMessage("Limit Query is required"),

		query("limit")
			.isInt({ min: 1, max: config.pagination.recipes.feed.maxLimit })
			.toInt()
			.withMessage("Limit must be a positive integer"),

		query("intensity")
			.optional()
			.isString()
			.isIn(["Light", "Moderate", "Vigorous"])
			.withMessage(`Intensity must be a valid intensity: Light, Moderate, or Vigorous`),

		query("category")
			.optional()
			.isString()
			.isIn(["All", "Cardio", "Yoga", "Muscles", "Premium"])
			.withMessage(
				"Category must be a valid category: All, Cardio, Yoga, Muscles, or Premium",
			),
	];
}

module.exports = validator;
