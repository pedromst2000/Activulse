const { query } = require("express-validator");
const config = require("../../config");

/**
 * Returns an array of validation rules for the get favorites endpoint
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
			.isInt({ min: 1, max: config.pagination.favorites.feed.maxLimit })
			.withMessage("Limit must be maximum 4")
			.toInt()
			.withMessage("Limit must be a positive integer"),
	];
}

module.exports = validator;
