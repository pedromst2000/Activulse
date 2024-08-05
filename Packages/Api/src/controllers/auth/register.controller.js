const utils = require("../../utils");
const db = require("../../db");
const services = require("../../services");
const templates = require("../../templates");

/**
 * @typedef RegisterRequest
 * @property {string} username - The user's display name
 * @property {string} email - The user's email
 * @property {string} password - The user's password
 */

/**
 * Registers a new user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function register(req, res) {
	try {
		/**  @type {RegisterRequest} */
		const { username, email, password } = req.body;

		const findUsername = await db.mysql.User.findOne({
			where: { username },
		});

		const findEmail = await db.mysql.User.findOne({
			where: { email },
		});

		if (findUsername) {
			utils.handleResponse(res, utils.http.StatusConflict, "The username already exists");
			return;
		}

		if (findEmail) {
			utils.handleResponse(res, utils.http.StatusConflict, "The email already exists");
			return;
		}

		const hashedPassword = await utils.password.hash(password);

		const newUser = await db.mysql.User.create({
			username,
			email,
			password: hashedPassword,
			change_password_token: utils.tokens.generateRandomBase64Token(),
			change_password_token_generated_at: db.mysql.sequelize.literal("CURRENT_TIMESTAMP"),
			verify_user_token: utils.tokens.generateRandomBase64Token(),
		});

		// Sending the confirmation email
		await services.sendEmail({
			from: "Activulse Team",
			to: [{ Email: newUser.email, Name: newUser.username }],
			subject: "Welcome to Activulse!",
			content: templates.verifyEmail(newUser.verify_user_token, newUser.username),
		});

		utils.handleResponse(
			res,
			utils.http.StatusCreated,
			"A confirmation email has been sent",
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = register;
