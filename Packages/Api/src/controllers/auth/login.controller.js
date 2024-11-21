const utils = require("../../utils");
const db = require("../../db");
const services = require("../../services");
const templates = require("../../templates");

/**
 * @typedef LoginRequest
 * @property {string} email - The user's email
 * @property {string} password - The user's password
 * @property {boolean} remember_me - Whether to remember the user or not
 */

/**
 * Login controller.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function login(req, res) {
	try {
		/**  @type {LoginRequest} */
		const { email, password, remember_me } = req.body;

		// Check if there's a user with the same email
		const user = await db.mysql.User.findOne({
			where: { email },
			include: [
				{
					model: db.mysql.UserAvatar,
					attributes: ["avatar_id"],
					include: [
						{
							model: db.mysql.Avatar,
							attributes: ["avatar_ID"],
							include: [
								{
									model: db.mysql.Asset,
									attributes: ["provider_image_url"],
								},
							],
						},
					],
					required: false,
				},
				{
					model: db.mysql.Diet,
					attributes: ["diet_name"],
				},
			],
		});

		if (!user) {
			utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"There's no user with that email",
			);
			return;
		}

		const doPasswordsMatch = await utils.password.compare(password, user.password);
		if (!doPasswordsMatch) {
			utils.handleResponse(res, utils.http.StatusUnauthorized, "Wrong password");
			return;
		}

		if (!user.is_verified) {
			// Send the verification email again
			await services.sendEmail({
				from: "Activulse Team",
				to: [{ Email: user.email, Name: user.display_name }],
				subject: "Welcome to Activulse!",
				content: templates.verifyEmail(user.verify_user_token, user.username),
			});

			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Check your email to verify your account",
			);
			return;
		}

		// Generate the jwt auth token and the refresh token
		const authToken = utils.tokens.generateToken(user.user_ID, "authToken");

		const refreshToken = utils.tokens.generateToken(
			user.user_ID,
			"refreshToken",
			remember_me,
		);

		const isNewUser = await db.mysql.RiskScore.findOne({
			where: { user_id: user.user_ID },
		});

		utils.handleResponse(res, utils.http.StatusOK, "Login with success", {
			authToken,
			refreshToken,
			user: {
				id: user.user_ID,
				isNewUser: !isNewUser,
				isAssessmentDone:
					user.stress_status !== null && user.know_diet !== null ? true : false,
				fastFoodStatus:
					user.fast_food_status === null ? "Unknown" : user.fast_food_status,
				stressStatus: user.stress_status === null ? "Unknown" : user.stress_status,
				diet: user.diet === null ? "Unknown" : user.diet.diet_name,
				username: user.username,
				points: user.points,
				avatar:
					user.user_avatars.length > 0
						? user.user_avatars[0].avatar.asset.provider_image_url
						: null,
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = login;
