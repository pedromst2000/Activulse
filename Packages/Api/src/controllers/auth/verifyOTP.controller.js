const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef VerifyOTPRequest
 * @property {string} OTP - The OTP to verify
 * @property {string} email - The user's email
 */

/**
 * Verifies the OTP for resetting the password.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function verifyOTP(req, res) {
	try {
		/**  @type {VerifyOTPRequest} */
		const { OTP, email } = req.body;

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

		const doOTPMatch = await utils.password.compare(OTP, user.OTP);

		// Check if the OTP is expired
		const currentTime = new Date();
		const OTPTime = new Date(user.OTP_generated_at);
		const diff = currentTime.getTime() - OTPTime.getTime();

		if (user.OTP !== null && user.OTP_generated_at !== null) {
			if (!doOTPMatch) {
				utils.handleResponse(res, utils.http.StatusUnauthorized, "Invalid OTP!");
				return;
			}

			if (diff > 180000) {
				// 180000 milliseconds = 3 minutes

				await db.mysql.User.update(
					{
						OTP_verified: false, // Reseting the OTP_verified flag since the OTP has expired
					},
					{
						where: { email: email },
					},
				);

				utils.handleResponse(res, utils.http.StatusBadRequest, "OTP expired!");
				return;
			}

			if (user.OTP_verified === true && doOTPMatch && diff <= 180000) {
				utils.handleResponse(res, utils.http.StatusConflict, "Already verified!");
				return;
			}

			await db.mysql.User.update(
				{
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
