const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");
const config = require("../../config");

const BANNER_ATTRIBUTES = ["banner_ID", "title", "price", "createdAt", "updatedAt"];

/**
 * Get the Banners from the store.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 */

async function getStoreBanners(req, res) {
	try {
		const loggedUser = req.userId;

		/** @type {QueryOptions} */

		let {
			page = config.pagination.banners.feed.defaultPage,
			limit = config.pagination.banners.feed.defaultLimit,
		} = req.query;

		const findBanners = await db.mysql.Banner.findAndCountAll({
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

		const banners = {
			count: findBanners.count,
			rows: findBanners.rows,
		};

		let resultBanners = banners.rows;

		let resultUserBanners = findUserBanners;

		let BANNERS = resultBanners
			.map((banner) => {
				return {
					id: banner.banner_ID,
					price: banner.price,
					imageUrl: banner.asset.provider_image_url,
					createdAt: banner.createdAt,
					updatedAt: banner.updatedAt,
				};
			})
			.filter((banner) => {
				// returning only the banners that the user doesn't own
				return !resultUserBanners.find(
					(userBanner) => userBanner.banner_id === banner.id,
				);
			})
			// Paginate the results based on the page and limit
			.slice((page - 1) * limit, page * limit);

		if (BANNERS.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No banners to buy it !");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Banners retrieved successfully", {
			banners: BANNERS,
			total: BANNERS.length,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getStoreBanners;
