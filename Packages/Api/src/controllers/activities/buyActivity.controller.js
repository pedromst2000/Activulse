const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef buyActivityParams
 * @property {number} id - The id of the activity to buy.
 */

/**
 * Buy one activity.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function buyActivity(req, res) {
	try {
		/**
		 * @type {buyActivityParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const findPremiumActivity = await db.mysql.Activity.findOne({
			where: {
				activity_ID: id,
				isPremium: true, // Only premium activities
			},
		});

		const user = await db.mysql.User.findOne({
			where: {
				user_id: loggedUserId,
			},
			attributes: ["points"],
		});

		const alreadyBought = await db.mysql.Buyer.findOne({
			where: {
				activity_id: id,
				user_id: loggedUserId,
			},
		});

		if (!findPremiumActivity) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Activity not found !");
			return;
		}
		if (alreadyBought) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"you have already bought this activity !",
			);
			return;
		} else if (user?.points < findPremiumActivity.price) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"you do not have enough points to buy this activity !",
			);
			return;
		} else {
			const transaction = await db.mysql.sequelize.transaction();
			try {
				await db.mysql.Buyer.create(
					{
						activity_id: id,
						user_id: loggedUserId,
					},
					{ transaction },
				);

				await db.mysql.User.update(
					{
						points: user.points - findPremiumActivity.price,
					},
					{
						where: {
							user_ID: loggedUserId,
						},
						transaction,
					},
				);

				await transaction.commit();
				utils.handleResponse(
					res,
					utils.http.StatusCreated,
					"Premium Activity bought successfully !",
				);
			} catch (error) {
				await transaction.rollback();
				throw error;
			}
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = buyActivity;
