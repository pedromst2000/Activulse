const db = require("../../db");
const utils = require("../../utils");
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
 * Get the top challenges
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function topChallenges(req, res) {
	try {
		const loggedUser = req.userId;

		const Topchallenges = await db.mysql.Challenge.findAll({
			attributes: CHALLENGE_ATTRIBUTES,
			where: {
				earn_points: {
					[Op.gt]: 600,
				},
			},
			order: [["earn_points", "DESC"]],
			include: [
				{
					model: db.mysql.ChallengeCategory,
					attributes: ["category"],
				},
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
		});

		const TopChallengesProgress = await db.mysql.ChallengeProgress.findAll({
			where: {
				user_id: loggedUser,
			},
		});

		let TOP_CHALLENGES_RES = Topchallenges.map((challenge) => {
			const userChallenge = TopChallengesProgress.find(
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

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Top Challenges retrieved successfully",
			{
				topChallenges: TOP_CHALLENGES_RES.map((challenge) => {
					return {
						...challenge,
					};
				}),
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = topChallenges;
