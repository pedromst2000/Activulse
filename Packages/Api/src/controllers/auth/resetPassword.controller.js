const utils = require("../../utils");
const db = require("../../db");
const bcrypt = require("bcryptjs");

/**
 * Reset password controller
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function resetPassword(req, res) {
	try {
		const { email } = req.params;
		const { new_password, confirm_password } = req.body;

		const user = await db.mysql.User.findOne({
			where: {
				email: email,
			},
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
			return;
		}

		if (new_password !== confirm_password) {
			utils.handleResponse(res, utils.http.StatusBadRequest, "Passwords do not match");
			return;
		}

		if (new_password === confirm_password) {
			const doPasswordsMatch = await utils.password.compare(new_password, user.password);
			if (doPasswordsMatch) {
				utils.handleResponse(
					res,
					utils.http.StatusBadRequest,
					"New password cannot be the same as the old password",
				);
				return;
			}

			if(user.OTP_verified === false) {
				utils.handleResponse(res, utils.http.StatusUnauthorized, "OTP not verified");
				return;
			}

			const hashedPassword = await utils.password.hash(new_password);

			await user.update({
				password: hashedPassword,
				OTP: null,
				OTP_generated_at: null,
				OTP_verified: false,
			});

			utils.handleResponse(res, utils.http.StatusOK, "Password changed successfully");
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = resetPassword;
