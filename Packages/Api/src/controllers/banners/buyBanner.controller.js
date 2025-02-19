const utils = require("../../utils");
const db = require("../../db");

/**
 * @typedef buyBannerParams
 * @property {number} id - The banner id to buy
 */

/**
 * Buy one banner.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function buyBanner(req, res) {
	try {
		/**
		 * @type {buyBannerParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const findBanner = await db.mysql.Banner.findOne({
			where: {
				banner_ID: id,
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
				banner_id: id,
				user_id: loggedUserId,
			},
		});

		if (!findBanner) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Banner not found !");
			return;
		}

		if (alreadyBought) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"you have already bought this banner !",
			);
			return;
		} else if (user?.points < findBanner.price) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"Not enough points to buy it !",
			);
			return;
		} else {
			const transaction = await db.mysql.sequelize.transaction();
			try {
				await db.mysql.Buyer.create(
					{
						banner_id: id,
						user_id: loggedUserId,
					},
					{ transaction },
				);

				await db.mysql.User.update(
					{
						points: user.points - findBanner.price,
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
					"Banner bought successfully !",
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

module.exports = buyBanner;
