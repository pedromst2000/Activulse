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
			// reseting after 24h the daily goals or at midnight or different day than the last updated
			const currentHour = new Date().getHours();
			const currentDate = new Date().toLocaleDateString();
			const now = new Date();
			const lastUpdated = new Date(dailyGoals.updatedAt);
			const diffTime = Math.abs(now - lastUpdated);
			const hours = Math.floor(diffTime / 3600000); // convert ms to hours

			if (
				hours >= 24 ||
				currentHour == 0 ||
				currentDate != lastUpdated.toLocaleDateString()
			) {
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
					},
				);
			}

			const USER_GOALS_RES = {
				isCompleted:
					dailyGoals.is_steps_completed == true &&
					dailyGoals.is_distance_completed == true,
				earn_points: dailyGoals.earn_points,
				steps: {
					goal: dailyGoals.goal_steps,
					progress: dailyGoals.steps_progress,
				},
				distance: {
					goal: dailyGoals.goal_distance,
					progress: dailyGoals.distance_progress,
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
