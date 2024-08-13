const db = require("../../db");
const utils = require("../../utils");
const { Op } = require("sequelize");

/**
 * Returns the logged user data or the user data by id
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getUser(req, res) {
	try {
		const { id } = req.params;

		// Checking if the user is trying to fetch his own data.
		const fetchLoggedUser = id === "me" || Number(id) === req.userId;

		/** @type {number} */
		const userId = fetchLoggedUser ? req.userId : Number(id);

		const isLoggedUser = req.userId === userId;

		const user = await db.mysql.User.findByPk(userId, {
			attributes: [
				"user_ID",
				"username",
				"email",
				"points",
				"gender",
				"age",
				"is_smoker",
				"is_diabetic",
				"is_treatment_hypertension",
				"systolic_blood_pressure",
				"HDL_Cholesterol",
				"Total_Cholesterol",
				"selected_banner_ID",
				"selected_avatar_ID",
				"diet_id",
				"createdAt",
				"updatedAt",
			],
			include: [
				{
					model: db.mysql.Avatar,
					attributes: ["provider_url"],
				},
				{
					model: db.mysql.Banner,
					attributes: ["banner_ID"],
					include: [
						{
							model: db.mysql.Picture,
							attributes: ["provider_url"],
						},
					],
					required: false,
				},
				{
					model: db.mysql.Diet,
					attributes: ["diet_ID", "diet_name"],
				},
				{
					model: db.mysql.UserAvatar,
					attributes: ["avatar_id"],
					include: [
						{
							model: db.mysql.Avatar,
							attributes: ["provider_url"],
						},
					],
					required: false,
				},
				{
					model: db.mysql.Buyer,
					attributes: ["banner_id", "user_id"],
					where: {
						banner_id: {
							[Op.not]: null,
						},
					},
					include: [
						{
							model: db.mysql.Banner,
							attributes: ["Banner_ID"],
							include: [
								{
									model: db.mysql.Picture,
									attributes: ["banner_id", "provider_url"],
								},
							],
						},
					],
					required: false,
				},
				{
					model: db.mysql.UserBadge,
					attributes: ["badge_id"],
					include: [
						{
							model: db.mysql.Badge,
							attributes: ["badge_ID", "title", "description"],
							include: [
								{
									model: db.mysql.Picture,
									attributes: ["badge_id", "provider_url"],
								},
							],
						},
					],
					required: false,
				},
				{
					model: db.mysql.UserActivity,
					attributes: ["user_activity_ID", "total_steps", "total_distance"],
				},
				{
					model: db.mysql.RiskScore,
					attributes: ["risk_ID", "score", "typeRisk"],
				},
			],
			required: false,
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
			return;
		}

		const responseData = isLoggedUser
			? {
					user_id: user.user_ID,
					username: user.username,
					email: user.email,
					points: user.points,
					risk_score:
						user.risk_score !== null
							? {
									score: user.risk_score.score,
									type_risk: user.risk_score.typeRisk,
								}
							: null,
					tag:
						user.user_badges.length === 0
							? "Beginner"
							: user.user_badges.length === 3
								? "Cardio Beginner"
								: user.user_badges.length >= 4 && user.user_badges.length <= 6
									? "Health Explorer"
									: user.user_badges.length >= 7 && user.user_badges.length <= 9
										? "Wellness Warrior"
										: user.user_badges.length >= 10 && user.user_badges.length <= 12
											? "Fitness Fanatic"
											: user.user_badges.length >= 13 && user.user_badges.length <= 15
												? "Health Hero"
												: user.user_badges.length >= 16 && user.user_badges.length <= 18
													? "Cardio Conqueror"
													: user.user_badges.length === 18
														? "Heart Champion"
														: "Beginner",
					total_steps: user.user_activity === null ? 0 : user.user_activity.total_steps,
					total_distance:
						user.user_activity === null ? 0 : user.user_activity.total_distance,
					diet:
						user.diet !== null
							? { id: user.diet.diet_ID, name: user.diet.diet_name }
							: null,

					gender: user.gender,
					age: user.age,
					is_smoker: user.is_smoker,
					is_diabetic: user.is_diabetic,
					is_treatment_hypertension: user.is_treatment_hypertension,
					systolic_blood_pressure: user.systolic_blood_pressure,
					HDL_cholesterol: user.HDL_Cholesterol,
					Total_cholesterol: user.Total_Cholesterol,
					selected_banner:
						user.selected_banner_ID !== null
							? {
									id: user.selected_banner_ID,
									banner: user.banner.picture.provider_url,
								}
							: null,
					selected_avatar:
						user.selected_avatar_ID !== null
							? {
									id: user.selected_avatar_ID,
									avatar: user.avatar.provider_url,
								}
							: null,
					avatars:
						user.user_avatars.length > 0
							? user.user_avatars.map((avatar) => ({
									id: avatar.avatar_id,
									is_selected: avatar.avatar_id === user.selected_avatar_ID,
									avatar: avatar.avatar.provider_url,
								}))
							: [],

					banners:
						user.buyers.length > 0
							? user.buyers.map((banner) => ({
									id: banner.banner_id,
									is_selected: banner.banner_id === user.selected_banner_ID,
									banner: banner.banner.picture.provider_url,
								}))
							: [],
					badges:
						user.user_badges.length > 0
							? user.user_badges.map((badge) => ({
									id: badge.badge.badge_ID,
									title: badge.badge.title,
									description: badge.badge.description,
									badge: badge.badge.picture.provider_url,
								}))
							: [],
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				}
			: {
					user_id: user.user_ID,
					username: user.username,
					tag:
						user.user_badges.length === 0
							? "Beginner"
							: user.user_badges.length === 3
								? "Cardio Beginner"
								: user.user_badges.length >= 4 && user.user_badges.length <= 6
									? "Health Explorer"
									: user.user_badges.length >= 7 && user.user_badges.length <= 9
										? "Wellness Warrior"
										: user.user_badges.length >= 10 && user.user_badges.length <= 12
											? "Fitness Fanatic"
											: user.user_badges.length >= 13 && user.user_badges.length <= 15
												? "Health Hero"
												: user.user_badges.length >= 16 && user.user_badges.length <= 18
													? "Cardio Conqueror"
													: user.user_badges.length === 18
														? "Heart Champion"
														: "Beginner",
					total_steps: user.user_activity === null ? 0 : user.user_activity.total_steps,
					total_distance:
						user.user_activity === null ? 0 : user.user_activity.total_distance,
					selected_banner:
						user.selected_banner_ID !== null
							? {
									id: user.selected_banner_ID,
									banner: user.banner.picture.provider_url,
								}
							: null,
					selected_avatar:
						user.selected_avatar_ID !== null
							? {
									id: user.selected_avatar_ID,
									avatar: user.avatar.provider_url,
								}
							: null,

					badges:
						user.user_badges.length > 0
							? user.user_badges.map((badge) => ({
									id: badge.badge.badge_ID,
									title: badge.badge.title,
									description: badge.badge.description,
									badge: badge.badge.picture.provider_url,
								}))
							: [],
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				};

				
		utils.handleResponse(
			res,
			utils.http.StatusOK,
			"User data retrieved successfully",
			responseData,
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getUser;
