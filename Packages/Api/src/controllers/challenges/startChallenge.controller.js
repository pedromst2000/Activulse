const utils = require("../../utils");
const db = require("../../db");

/**
 * @typedef startChallengeParams
 * @property {number} id - The challenge's id
 */

/**
 * Starts a challenge
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function startChallenge(req, res) {
	try {
		/**
		 * @type {startChallengeParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const challenge = await db.mysql.Challenge.findByPk(id);

		if (!challenge) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Challenge Not Found !");
			return;
		}

		const userChallenges = await db.mysql.ChallengeProgress.findAll({
			attributes: ["challenge_id", "user_id", "status"],
			where: {
				user_id: loggedUserId,
			},
		});

		if (
			userChallenges.find((userChallenge) => userChallenge.challenge_id === parseInt(id))
				?.status === "In Progress"
		) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"Challenge already started. Try other challenge !",
			);
			return;
		}

		if (
			userChallenges.find((userChallenge) => userChallenge.challenge_id === parseInt(id))
				?.status === "Completed"
		) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"This challenge is completed. Try other challenge !",
			);
			return;
		} else if (
			!userChallenges.some(
				(userChallenge) => userChallenge.challenge_id === parseInt(id),
			) &&
			userChallenges.find((userChallenge) => userChallenge.status === "In Progress")
		) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"You already have a challenge in progress. Complete it first !",
			);
			return;
		} else {
			await db.mysql.ChallengeProgress.create({
				user_id: loggedUserId,
				challenge_id: id,
			});

			utils.handleResponse(
				res,
				utils.http.StatusCreated,
				"Challenge Started Successfully !",
			);
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = startChallenge;
