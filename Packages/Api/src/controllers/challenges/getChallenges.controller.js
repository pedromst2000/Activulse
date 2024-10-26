const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");
const { Op } = require("sequelize");

const CHALLENGE_ATTRIBUTES = [
	"challenge_ID",
	"title",
	"category_id",
	"difficulty",
	"earn_points",
	"createdAt",
	"updatedAt",
];

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {"All" | "Not Started" | "In Progress" | "Completed" | undefined } status - The status of the challenge.
 * @property {"All" | "Walk" | "Jogging" | "Run" | "Marathon" | undefined } category - The category name.
 * @property {"Easy" | "Medium" | "Hard" | "Master" | undefined } difficulty - The difficulty name.
 */

/**
 * @typedef GetQueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {"All" | "Not Started" | "In Progress" | "Completed" | undefined } status - The status of the challenge.
 * @property {"All" | "Walk" | "Jogging" | "Run" | "Marathon" | undefined } category - The category name.
 * @property {"Easy" | "Medium" | "Hard" | "Master" | undefined } difficulty - The difficulty name.
 */

/**
 * @param {GetQueryOptions} options
 * @returns {Promise<import("sequelize").WhereOptions>}
 */
async function GetQueryOptions(options) {
	const query = {};

	if (options.status && options.status !== "All") {
		const status = await db.mysql.ChallengeProgress.findOne({
			where: {
				user_id: options.user_ID,
				status: options.status.replace("+", " "),
			},
		});

		if (status) {
			query.challenge_ID = { [Op.eq]: status.challenge_id };
		}
	}

	if (options.category && options.category !== "All") {
		const category = await db.mysql.ChallengeCategory.findOne({
			where: {
				category: options.category,
			},
			attributes: ["challenge_category_ID", "category"],
		});
		if (category) {
			query.category_id = { [Op.eq]: category.challenge_category_ID };
		}
	}

	if (options.difficulty) {
		switch (options.difficulty) {
			case "Easy":
				query.difficulty = { [Op.eq]: 1 };
				break;
			case "Medium":
				query.difficulty = { [Op.between]: [2, 3] };
				break;
			case "Hard":
				query.difficulty = { [Op.eq]: 4 };
				break;
			case "Master":
				query.difficulty = { [Op.eq]: 5 };
				break;
			default:
				break;
		}
	}

	return query;
}

/**
 * Get the Challenges (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getChallenges(req, res) {
	try {
		const loggedUser = req.userId;

		/** @type {QueryOptions} */
		let {
			page = config.pagination.challenges.feed.defaultPage,
			limit = config.pagination.challenges.feed.defaultLimit,
			category = "All",
			status = "All",
			difficulty = "",
		} = req.query;

		const challenges = await db.mysql.Challenge.findAll({
			attributes: CHALLENGE_ATTRIBUTES,
			where: {
				...(await GetQueryOptions({
					status: status,
					category: category,
					difficulty: difficulty,
					user_ID: loggedUser,
				})),
			},
			include: [
				{
					model: db.mysql.ChallengeCategory,
					attributes: ["challenge_category_ID", "category"],
				},
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
			limit: limit,
			offset: (page - 1) * limit,
		});

		const challengesProgress = await db.mysql.ChallengeProgress.findAll({
			where: {
				user_id: loggedUser,
			},
		});

		let CHALLENGES_RES = challenges.map((challenge) => {
			const userChallenge = challengesProgress.find(
				(progress) => progress.challenge_id === challenge.challenge_ID,
			);

			return {
				id: challenge.challenge_ID,
				title: challenge.title,
				category: challenge.challenge_category.category,
				earnPoints: challenge.earn_points,
				status: userChallenge ? userChallenge.status : "Not Started",
				difficulty:
					challenge.difficulty === 1
						? "Light"
						: challenge.difficulty === 2
							? "Moderate I"
							: challenge.difficulty === 3
								? "Moderate II"
								: challenge.difficulty === 4
									? "Moderate III"
									: "Vigorous",
				imageUrl: challenge.asset.provider_image_url,
				createdAt: challenge.createdAt,
				updatedAt: challenge.updatedAt,
			};
		});

		if (CHALLENGES_RES.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Challenges Not Found !");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Challenges retrieved successfully", {
			challenges: CHALLENGES_RES,
			total: challenges.length,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getChallenges;
