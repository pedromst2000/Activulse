const db = require("../../db");
const utils = require("../../utils");
const config = require("../../config");

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 */

/**
 * Returns the badges list for the logged user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getUserBadges(req, res) {
	try {
		const loggedUserId = req.userId;

		/** @type {QueryOptions} */

		let {
			page = config.pagination.badges.feed.defaultPage,
			limit = config.pagination.badges.feed.defaultLimit,
		} = req.query;

		const badges = await db.mysql.Badge.findAndCountAll({
			include: [
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
			limit: limit,
			offset: (page - 1) * limit,
		});

		console.log(`badges: ${JSON.stringify(badges, null, 2)}`);

		const userBadges = await db.mysql.UserBadge.findAll({
			where: {
				user_id: loggedUserId,
			},
		});

		let BADGES = {
			count: badges.count,
			rows: badges.rows,
		};

		BADGES = BADGES.rows.map((badge) => {
			const userBadge = userBadges.find((ub) => ub.badge_id === badge.badge_ID);
			return {
				id: badge.badge_ID,
				title: badge.title,
				description: badge.description,
				image: badge.asset.provider_image_url,
				earned: !!userBadge, // Key flag to check if the user has earned the badge
				createdAt: badge.createdAt,
				updatedAt: badge.updatedAt,
			};
		});

		if (BADGES.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No badges found !");
			return;
		}

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Badges retrieved successfully",
			{
				badges: BADGES,
				total: BADGES.length,
				totalEarned: userBadges.length,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getUserBadges;
