const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");

const BANNER_ATTRIBUTES = ["banner_ID", "price"];

/**
 * Get the Banners from the store.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getStoreBanners(req, res) {
	try {
		const loggedUser = req.userId;

		const findBanners = await db.mysql.Banner.findAll({
			attributes: BANNER_ATTRIBUTES,
			include: [
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
		});

		const findUserBanners = await db.mysql.Buyer.findAll({
			where: {
				user_id: loggedUser,
				banner_id: {
					[Op.ne]: null,
				},
			},
		});

		const shopBanners = findBanners
			.map((banner) => {
				const userBanner = findUserBanners.find(
					(userBanner) => userBanner.banner_id === banner.banner_ID,
				);
				return {
					...banner.dataValues,
					owned: !!userBanner,
				};
			})
			.filter((banner) => !banner.owned)
			.map((banner) => {
				return {
					id: banner.banner_ID,
					price: banner.price,
					provider_image_url: banner.asset.provider_image_url,
				};
			});

		if (shopBanners.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No banners to buy it !");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Banners retrieved successfully", {
			banners: shopBanners,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getStoreBanners;
