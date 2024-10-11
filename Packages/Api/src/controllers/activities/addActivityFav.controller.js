const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef addActivityFavParams
 * @property {number} id - The activity's id
 */

/**
 * Adds a activity to the user's favorites list.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function addActivityFav(req, res) {
	try {
		const { id } = req.params;
		const loggedUserId = req.userId;

		const activity = await db.mysql.Activity.findByPk(id);

		const findFavoritesActivities = await db.mysql.Favorite.findOne({
			where: {
				user_id: loggedUserId,
				activity_id: id,
			},
		});

		const findUserPremiumActivities = await db.mysql.Buyer.findOne({
			where: {
				user_id: loggedUserId,
				activity_id: id,
			},
		});

		if (!activity) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Activity not found !");
			return;
		}

		if (findFavoritesActivities) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"Activity already in favorites !",
			);

			return;
		} else if (!findUserPremiumActivities && activity.isPremium) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You cannot add a premium activity to favorites without buying it !",
			);
			return;
		} else {
			await db.mysql.Favorite.create({
				user_id: loggedUserId,
				activity_id: id,
			});

			utils.handleResponse(
				res,
				utils.http.StatusCreated,
				"Activity added to favorites !",
			);
			return;
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addActivityFav;
