const db = require("../../db");
const utils = require("../../utils");

/**
 * Claim reward of completed daily goals by the logged user
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function claimGoalsReward(req, res) {
	try {
		const loggedUserId = req.userId;

		const dailyGoals = await db.mysql.DailyGoals.findOne({
			where: {
				user_id: loggedUserId,
			},
		});

		if (!dailyGoals) {
			return utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"Finish the Heart Assessment first, to set your daily goals!",
			);
		}

		if (!dailyGoals.is_steps_completed && !dailyGoals.is_distance_completed) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"Daily goals not completed yet. Complete it first !",
			);
		} else {
			await db.mysql.sequelize.transaction(async (t) => {
				await db.mysql.User.increment(
					{ points: dailyGoals.earn_points },
					{
						where: {
							user_ID: loggedUserId,
						},
						transaction: t,
					},
				);

				await db.mysql.DailyGoals.update(
					{
						is_steps_completed: false,
						is_distance_completed: false,
						steps_progress: 0,
						distance_progress: 0,
					},
					{
						where: {
							user_id: loggedUserId,
						},
						transaction: t,
					},
				);
			});

			return utils.handleResponse(
				res,
				utils.http.StatusOK,
				"Reward claimed successfully!",
			);
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = claimGoalsReward;
