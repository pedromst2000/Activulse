const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");

const USER_ATTRIBUTES = ["user_ID", "username", "points"];

/**
 * Get the leaderboard
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function leaderboard(req, res) {
	try {
		const users = await db.mysql.User.findAll({
			attributes: USER_ATTRIBUTES,
			order: [["points", "DESC"]],
			where: {
				points: {
					[Op.gt]: 0,
				},
			},
			limit: 5,
			include: [
				{
					model: db.mysql.UserAvatar,
					include: [
						{
							model: db.mysql.Avatar,
							include: [
								{
									model: db.mysql.Asset,
									attributes: ["provider_image_url"],
								},
							],
						},
					],
				},
			],
		});

		if (users.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Users Available");
			return;
		}

		const responseData = users.map((user) => {
			return {
				id: user.user_ID,
				username: user.username,
				points: user.points,
				avatar: user.user_avatars.find(
					(avatar) => avatar.avatar_ID === user.selected_avatar_ID,
				).avatar.asset.provider_image_url,
			};
		});

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Leaderboard TOP 5 retrieved successfully",
			{
				top_5: responseData,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = leaderboard;
