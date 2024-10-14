const db = require("../../db");
const utils = require("../../utils");

/**
 * Returns the badges list for the logged user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getUserBadges(req, res) {
	try {
		const loggedUserId = req.userId;

		const badges = await db.mysql.Badge.findAll({
			include: [
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
		});

		const userBadges = await db.mysql.UserBadge.findAll({
			where: {
				user_id: loggedUserId,
			},
		});

		const badgesList = badges.map((badge) => {
			const userBadge = userBadges.find((ub) => ub.badge_id === badge.badge_ID);
			return {
				id: badge.badge_ID,
				title: badge.title,
				description: badge.description,
				image: badge.asset.provider_image_url,
				earned: !!userBadge, // Key flag to check if the user has earned the badge
			};
		});

		utils.handleResponse(res, utils.http.StatusOK, "Badges retrieved successfully", {
			badges: badgesList,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getUserBadges;
