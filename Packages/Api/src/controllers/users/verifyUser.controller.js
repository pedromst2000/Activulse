const db = require("../../db");
const utils = require("../../utils");

/**
 * Verifies a user account.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function verifyUser(req, res) {
	try {
		const { token } = req.params;

		// Check if there's a user with that token
		const user = await db.mysql.User.findOne({
			where: { verify_user_token: token },
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User or Token not found");
			return;
		}

		await user.update({
			is_verified: true,
			verify_user_token: null,
		});

		utils.handleResponse(res, utils.http.StatusOK, "User verified");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = verifyUser;
