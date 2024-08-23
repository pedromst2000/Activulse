const db = require("../../db");
const utils = require("../../utils");
const services = require("../../services");
const templates = require("../../templates");

/**
 * Resends other verification email to the user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function resendVerify(req, res) {
	try {
		const { email } = req.body;

		const user = await db.mysql.User.findOne({
			where: { email: email },
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
			return;
		}

		if (user.is_verified) {
			utils.handleResponse(res, utils.http.StatusConflict, "User already verified!");
			return;
		}

		// Sending the confirmation email again
		await services.sendEmail({
			from: "Activulse Team",
			to: [{ Email: user.email, Name: user.username }],
			subject: "Welcome to Activulse!",
			content: templates.verifyEmail(user.verify_user_token, user.username),
		});

		utils.handleResponse(
			res,
			utils.http.StatusAccepted,
			"A confirmation email has been resent to your email address.",
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = resendVerify;
