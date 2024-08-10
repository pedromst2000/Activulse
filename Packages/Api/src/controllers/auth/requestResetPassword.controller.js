const db = require("../../db");
const utils = require("../../utils");
const services = require("../../services");
const templates = require("../../templates");

/**
 * Resends the SMS verification code to the user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function requestResetPassword(req, res) {
	try {
		const { email } = req.body;
		const OTP = Math.random().toString().slice(2, 8); // Generate a random 6-digit OTP

		const user = await db.mysql.User.findOne({
			where: { email: email },
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
			return;
		}

		await user.update({
			OTP: await utils.password.hash(OTP),
			OTP_generated_at: db.mysql.sequelize.literal(
				"CONVERT_TZ(CURRENT_TIMESTAMP, '+00:00', '+01:00')",
			),
		});

		await services.sendEmail({
			from: "Activulse Team",
			to: [{ Email: user.email, Name: user.username }],
			subject: "Activulse - Request to reset password",
			content: templates.verifyOTP(OTP),
		});

		utils.handleResponse(
			res,
			utils.http.StatusAccepted,
			"A OTP verification code has been sent to your email",
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = requestResetPassword;
