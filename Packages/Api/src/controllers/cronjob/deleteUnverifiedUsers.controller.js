const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");

const TIME_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Delete all unverified users.
 * @param {import("express").Request} _req - The Express Request object (unused).
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function deleteUnverifiedUsers(_req, res) {
	try {
		const result = await db.mysql.User.destroy({
			where: {
				is_verifiedn: false,
				createdAt: {
					[Op.lt]: new Date(new Date() - TIME_INTERVAL),
				},
			},
		});

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			`Deleted ${result} unverified users successfully.`,
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteUnverifiedUsers;
