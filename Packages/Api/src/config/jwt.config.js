const config = {
	secret: process.env.JWT_SECRET || "", // The secret is used to generate the token
	refreshSecret: process.env.JWT_REFRESH_SECRET || "", // The secret is used to generate the refresh token

	expiresIn: 60 * 60, // 1 hour in seconds

	refreshExpiresIn: 24 * 60 * 60, // 1 day in seconds

	refreshExpiresInRememberMe: 30 * 24 * 60 * 60, // 30 days in seconds

	// The refresh token will be regenerated if the token will expire in less than this value
	refreshGenerateIn: 60 * 60, // 1 hour in seconds

	algorithm: "HS256", // The algorithm used to sign the token
};

module.exports = config;
