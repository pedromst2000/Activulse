const db = require("../../db");
const utils = require("../../utils");
const { Op } = require("sequelize");

const CHALLENGE_ATTRIBUTES = [
	"challenge_ID",
	"title",
	"category_id",
	"difficulty",
	"earn_points",
	"description",
	"challenge_steps",
	"challenge_distance",
	"createdAt",
	"updatedAt",
];

/**
 * @typedef challengeDetailsParams
 * @property {number} id - The challenge's id
 */

/**
 * Returns one challenge data by id
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function challengeDetails(req, res) {
	try {
		/**
		 * @type {challengeDetailsParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const challenge = await db.mysql.Challenge.findByPk(id, {
			attributes: CHALLENGE_ATTRIBUTES,
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
		});

		const challengeProgress = await db.mysql.ChallengeProgress.findOne({
			where: {
				[Op.and]: [{ challenge_id: id }, { user_id: loggedUserId }],
			},
		});

		if (!challenge) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Challenge Not Found !");
			return;
		}

		let CHALLENGE_RES = {
			challenge_id: challenge.challenge_ID,
			title: challenge.title,
			category: challenge.challenge_category.category,
			status: challengeProgress ? challengeProgress?.status : "Not Started",
			earnPoints: challenge.earn_points,
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
			description: challenge.description,
			progress:
				challengeProgress?.status === "In Progress"
					? {
							currentSteps: challengeProgress.steps_progress,
							currentDistance: challengeProgress.distance_progress,
							totalSteps: challenge.challenge_steps,
							totalDistance: challenge.challenge_distance,
						}
					: challengeProgress?.status === "Completed"
						? {
								stepsCompleted: challenge.challenge_steps,
								distanceCompleted: challenge.challenge_distance,
							}
						: null,
		};

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Challenge data retrieved successfully",
			!challengeProgress
				? {
						...CHALLENGE_RES,
						goals: {
							steps: challenge.challenge_steps,
							distance: challenge.challenge_distance,
						},
						imageUrl: challenge.asset.provider_image_url,
						createdAt: challenge.createdAt,
						updatedAt: challenge.updatedAt,
					}
				: {
						...CHALLENGE_RES,
						imageUrl: challenge.asset.provider_image_url,
						createdAt: challenge.createdAt,
						updatedAt: challenge.updatedAt,
					},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = challengeDetails;
