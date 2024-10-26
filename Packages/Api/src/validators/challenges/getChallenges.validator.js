const { query } = require("express-validator");
const config = require("../../config");

/**
 * Returns an array of validation rules for the get challenges feed endpoint
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
			.isInt({ min: 1, max: config.pagination.challenges.feed.maxLimit })
			.toInt()
			.withMessage("Limit must be a positive integer"),

		query("category")
			.optional()
			.isString()
			.isIn(["All", "Walk", "Jogging", "Run", "Marathon"])
			.withMessage(
				"Category must be a valid category: All, Walk, Jogging, Run, or Marathon",
			),

		query("status")
			.optional()
			.isString()
			.isIn(["All", "Not Started", "In Progress", "Completed"])
			.withMessage(
				"Status must be a valid category: All, Not Started, In Progress, or Completed",
			),

		query("difficulty")
			.optional()
			.isString()
			.isIn(["All", "Easy", "Medium", "Hard", "Master"])
			.withMessage(
				"Difficulty must be a valid category: All, Easy, Medium, Hard, or Master",
			),
	];
}

module.exports = validator;
