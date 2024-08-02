const utils = require("../utils");
const config = require("../config");

/**
 * Middleware function to validate auth and refresh tokens in the request headers.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @param {import("express").NextFunction} next - The Express NextFunction middleware.
 * @returns {Promise<void>}
 */
async function validateTokens(req, res, next) {
	try {
		const authToken = req.headers["x-auth-token"];
		const refreshToken = req.headers["x-refresh-token"];

		if (!authToken || !refreshToken) {
			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Missing auth token or refresh token",
			);
			return;
		}

		if (
			!utils.tokens.validateToken(authToken, "authToken") ||
			!utils.tokens.validateToken(refreshToken, "refreshToken")
		) {
			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Invalid auth token or refresh token",
			);
			return;
		}

		if (utils.tokens.didTokenExpire(refreshToken, "refreshToken")) {
			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Refresh token has expired",
			);
			return;
		}

		const decodedAuthToken = utils.tokens.decodeToken(authToken, "authToken");
		const decodedRefreshToken = utils.tokens.decodeToken(refreshToken, "refreshToken");

		// Check if the refresh token is about to expire (less than config.tokens.refreshGenerateIn seconds left)
		if (
			decodedRefreshToken.exp - Math.floor(Date.now() / 1000) <
			config.tokens.refreshGenerateIn
		) {
			const newRefreshToken = utils.tokens.generateToken(
				decodedAuthToken.userId,
				"refreshToken",
				decodedAuthToken.remember_me,
			);

			res.set("x-refresh-token", newRefreshToken);
		}

		if (utils.tokens.didTokenExpire(authToken, "authToken")) {
			const newAuthToken = utils.tokens.generateToken(
				decodedAuthToken.userId,
				"authToken",
			);

			res.set("x-auth-token", newAuthToken);
		}

		req.userId = decodedAuthToken.userId;

		next();
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = validateTokens;
