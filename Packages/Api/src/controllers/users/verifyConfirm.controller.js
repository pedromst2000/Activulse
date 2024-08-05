const db = require("../../db");
const utils = require("../../utils");

/**
 * Verifies if the user has confirmed the email.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function verifyConfirm(req, res) {
	try {
		const { email } = req.params;

		const user = await db.mysql.User.findOne({
			where: { email: email },
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
			return;
		}

		if (user.is_verified) {
			utils.handleResponse(res, utils.http.StatusOK, "User verified");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "User not verified");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = verifyConfirm;
