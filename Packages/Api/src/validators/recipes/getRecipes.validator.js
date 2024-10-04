const { query } = require("express-validator");
const utils = require("../../utils");
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

		query("diet")
			.optional()
			.isString()
			.isIn(["DASH", "Vegan", "Mediterranean"])
			.withMessage(`Diet must be a valid diet type: Vegan, DASH, or Mediterranean`),

		query("category")
			.optional()
			.isString()
			.isIn(["All", "Soups", "Main Dishes", "Salads", "Desserts", "Premium"])
			.withMessage(
				"Category must be a valid category: All, Soups, Main Dishes, Salads, Desserts, or Premium",
			),
	];
}

module.exports = validator;
