const db = require("../../db");
const utils = require("../../utils");

/**
* @typedef ExtraAssessmentRequest
* @property {string} stress - The stress level of the account holder
* @property {boolean} havesDiet - If the account holder has a diet
* @property {string} [fastFoodStatus] - The fast food status of the account holder (optional)
* @property {string} [diet] - The diet of the account holder (optional)


*/

/**
 * heart risk assessment controller
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function extraAssessment(req, res) {
	try {
		/** @type {ExtraAssessmentRequest} */
		const { stress, havesDiet, fastFoodStatus, diet } = req.body;

		const loggedUserId = req.userId;

		const user = await db.mysql.User.findOne({
			where: {
				user_ID: loggedUserId,
			},
		});

		const findDiet = await db.mysql.Diet.findOne({
			where: {
				diet_name: diet ? diet : null,
			},
			atrributes: ["diet_ID", "diet_name"],
		});

		// Checking if the user is registered
		if (!user) {
			utils.handleResponse(res, utils.http.StatusForbidden, "You are not registered!");
			return;
		}

		const userDataRes = {
			stress: user.stress_status,
			havesDiet: user.haves_diet ? "Yes" : "No",
			fastFoodStatus: user.fast_food_status ? user.fast_food_status : "Unknown",
			diet: user.diet_id ? findDiet?.diet_name : "Unknown",
		};

		if (user && user.is_verified == false) {
			utils.handleResponse(res, utils.http.StatusForbidden, "You are not verified!");
			return;
		} else if (user.stress_status !== null && user.haves_diet !== null) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"You have already done the extra assessment!",
				userDataRes,
			);
			return;
		} else if (user.stress_status == null && user.haves_diet == null) {
			await db.mysql.User.update(
				{
					stress_status: stress,
					haves_diet: havesDiet,
					fast_food_status: havesDiet === true ? null : fastFoodStatus,
					diet_id: havesDiet === true ? findDiet?.diet_ID : null,
				},
				{
					where: {
						user_ID: loggedUserId,
					},
				},
			);

			utils.handleResponse(
				res,
				utils.http.StatusOK,
				"Extra assessment completed successfully!",
			);
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = extraAssessment;
