const db = require("../../db");
const utils = require("../../utils");

/**
 * Returns the logged user daily goals
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getUserGoals(req, res) {
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
				"You don't have daily goals yet! Finish the Heart Assessment first to set your daily goals!",
			);
		} else {
			const USER_GOALS_RES = {
				isCompleted:
					dailyGoals.is_steps_completed == true &&
					dailyGoals.is_distance_completed == true,
				earn_points: dailyGoals.earn_points,
				steps: {
					goal_steps: dailyGoals.goal_steps,
					steps_progress: dailyGoals.steps_progress,
				},
				distance: {
					goal_distance: dailyGoals.goal_distance,
					distance_progress: dailyGoals.distance_progress,
				},
			};

			utils.handleResponse(
				res,
				utils.http.StatusOK,
				"Your daily goals were successfully retrieved!",
				{
					daily_goals: USER_GOALS_RES,
				},
			);
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getUserGoals;
