const db = require("../../db");
const utils = require("../../utils");

/**
* @typedef changeGoalsRequest
* @property {number} [steps] - The steps goal of the account holder
* @property {number} [distance] - The distance goal of the account holder

*/

/**
 * change daily goals controller
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function changeGoals(req, res) {
	try {
		/**
		 * @type {changeGoalsRequest}
		 */

		const { steps, distance } = req.body;

		const loggedUserId = req.userId;

		const dailyGoals = await db.mysql.DailyGoals.findOne({
			where: {
				user_id: loggedUserId,
			},
		});

		if (dailyGoals.is_steps_completed && dailyGoals.is_distance_completed) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You can´t change the daily goals when completed !",
			);
			return;
		} else if (steps && !distance) {
			await db.mysql.DailyGoals.update(
				{
					goal_steps: steps,
					goal_distance: utils.converter.stepsToMeters(steps),
				},
				{
					where: {
						user_id: loggedUserId,
					},
				},
			);
		} else if (distance && !steps) {
			await db.mysql.DailyGoals.update(
				{
					goal_steps: utils.converter.metersToSteps(distance),
					goal_distance: distance,
				},
				{
					where: {
						user_id: loggedUserId,
					},
				},
			);
		}

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Daily goals changed successfully",
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = changeGoals;
