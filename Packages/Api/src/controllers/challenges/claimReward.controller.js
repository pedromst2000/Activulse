const db = require("../../db");
const utils = require("../../utils");
const { Op } = require("sequelize");

/**
 * @typedef claimRewardParams
 * @property {number} id - The challenge's id
 */

/**
 * Claim reward of one challenge completed by user
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function claimReward(req, res) {
	try {
		/**
		 * @type {claimRewardParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const user = await db.mysql.User.findByPk(loggedUserId);

		const challenge = await db.mysql.Challenge.findAll({
			where: {
				challenge_ID: id,
			},
		});

		if (!challenge.some((ch) => ch.challenge_ID === parseInt(id))) {
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
				utils.http.StatusForbidden,
				"Challenge not completed yet. Complete the challenge first !",
			);
			return;
		} else if (
			!userChallenges.some((userChallenge) => userChallenge.challenge_id === parseInt(id))
		) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"Challenge not started yet. Start the challenge first !",
			);
			return;
		} else {
			const EARN_POINTS = challenge.find((ch) => ch.challenge_ID === +id).earn_points;

			await db.mysql.ChallengeProgress.destroy({
				where: {
					[Op.and]: [
						{ challenge_id: id },
						{ status: "Completed" },
						{ user_id: loggedUserId },
					],
				},
			});
			await db.mysql.User.update(
				{ points: user.points + EARN_POINTS },
				{ where: { user_ID: loggedUserId } },
			);
		}

		utils.handleResponse(res, utils.http.StatusOK, "Reward claimed successfully !");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = claimReward;
