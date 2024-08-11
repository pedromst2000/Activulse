const db = require("../../db");
const utils = require("../../utils");

/**
 * Verifies the OTP for resetting the password.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function verifyOTP(req, res) {
	try {
		const { email } = req.params;
		const { OTP } = req.body;

		const user = await db.mysql.User.findOne({
			where: { email: email },
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
			return;
		}

		if (
			user.OTP === null &&
			user.OTP_generated_at === null &&
			user.OTP_verified === false
		) {
			utils.handleResponse(res, utils.http.StatusNotFound, "OTP not generated yet!");
			return;
		}

		if (
			user.OTP === null &&
			user.OTP_generated_at === null &&
			user.OTP_verified === true
		) {
			utils.handleResponse(res, utils.http.StatusConflict, "Already verified!");
			return;
		}

		if (user.OTP !== null && user.OTP_generated_at !== null) {
			const doOTPMatch = await utils.password.compare(OTP, user.OTP);

			if (!doOTPMatch) {
				utils.handleResponse(res, utils.http.StatusUnauthorized, "Invalid OTP!");
				return;
			}

			// Check if the OTP is expired
			const currentTime = new Date();
			const OTPTime = new Date(user.OTP_generated_at);
			const diff = currentTime.getTime() - OTPTime.getTime();

			if (diff > 180000) {
				// 180000 milliseconds = 3 minutes

				utils.handleResponse(res, utils.http.StatusBadRequest, "OTP expired!");
				return;
			}

			await db.mysql.User.update(
				{
					OTP: null,
					OTP_generated_at: null,
					OTP_verified: true,
				},
				{
					where: { email: email },
				},
			);

			utils.handleResponse(res, utils.http.StatusOK, "OTP verified successfully");
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = verifyOTP;
