const jwt = require("jsonwebtoken");
const config = require("../config");
const crypto = require("crypto");

/**
 * Generates a token
 * @param {number} userId - The user id
 * @param {"authToken" | "refreshToken"} type - The type of token to generate
 * @param {boolean} rememberMe - The remember me flag
 * @returns {string} The generated token
 */
const generateToken = (userId, type, rememberMe) => {
	const jwtConfig = config.tokens;
	const secret = type === "authToken" ? jwtConfig.secret : jwtConfig.refreshSecret;
	let expiresIn;

	// Assign the correct expiration time based on the type of token (authToken or refreshToken)
	if (type === "authToken") {
		expiresIn = jwtConfig.expiresIn;
	} else {
		expiresIn = rememberMe
			? jwtConfig.refreshExpiresInRememberMe
			: jwtConfig.refreshExpiresIn;
	}

	const payload = { userId, rememberMe };

	const token = jwt.sign(payload, secret, {
		expiresIn,
		algorithm: jwtConfig.algorithm,
	});

	return token;
};

/**
 * Validates a token
 * @param {string} token - The token to validate
 * @param {"authToken" | "refreshToken"} type - The type of token to validate
 * @returns {boolean} True if the token is valid, false otherwise
 */
const validateToken = (token, type) => {
	const jwtConfig = config.tokens;
	const secret = type === "authToken" ? jwtConfig.secret : jwtConfig.refreshSecret;

	try {
		const decoded = jwt.verify(token, secret, {
			algorithms: [jwtConfig.algorithm],
			ignoreExpiration: true,
		});

		return !!decoded;
	} catch (error) {
		return false;
	}
};

/**
 * Checks if a token has expired
 * @param {string} token - The token to check
 * @param {string} type - The type of token to check
 * @returns {boolean} True if the token has expired, false otherwise
 */
const didTokenExpire = (token, type) => {
	const jwtConfig = config.tokens;
	const secret = type === "authToken" ? jwtConfig.secret : jwtConfig.refreshSecret;

	const decoded = jwt.verify(token, secret, {
		algorithms: [jwtConfig.algorithm],
		ignoreExpiration: true,
	});

	// Check if the token has expired
	return decoded.exp < Date.now() / 1000;
};

/**
 * @typedef TokenPayload
 * @property {number} userId - The user id
 * @property {boolean} remember_me - The remember me flag
 * @property {number} iat - The token's issued at time
 * @property {number} exp - The token's expiration time
 */

/**
 * Decodes a token
 * @param {string} token - The token to decode
 * @param {"authToken" | "refreshToken"} type - The type of token to decode
 * @returns {TokenPayload} The decoded token
 */
const decodeToken = (token, type) => {
	const jwtConfig = config.tokens;
	const secret = type === "authToken" ? jwtConfig.secret : jwtConfig.refreshSecret;

	const decoded = jwt.decode(token, secret, {
		algorithms: [jwtConfig.algorithm],
		ignoreExpiration: true,
	});

	return decoded;
};

/**
 * Generates a random base64 token
 * @returns {string} The generated token
 */
const generateRandomBase64Token = () => {
	// Generate a random UUID to use as base for the token
	const randomUUID = crypto.randomUUID();

	return Buffer.from(randomUUID).toString("base64");
};

module.exports = {
	generateToken,
	validateToken,
	didTokenExpire,
	decodeToken,
	generateRandomBase64Token,
};
