const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef deleteActivityFavParams
 * @property {number} id - The activity's id
 */

/**
 * Deletes a activity from the user's favorites list.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function deleteActivityFav(req, res) {
	try {
		/**
		 * @type {deleteActivityFavParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const activity = await db.mysql.Activity.findByPk(id);

		const findFavoritesActivities = await db.mysql.Favorite.findOne({
			where: {
				user_id: loggedUserId,
				activity_id: id,
			},
		});

		if (!activity) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Activity not found !");
			return;
		}

		if (!findFavoritesActivities) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Activity not in favorites !");
			return;
		} else {
			await db.mysql.Favorite.destroy({
				where: {
					user_id: loggedUserId,
					activity_id: id,
				},
			});

			utils.handleResponse(res, utils.http.StatusOK, "Activity removed from favorites !");
			return;
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteActivityFav;
