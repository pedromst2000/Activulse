const db = require("../../db");
const utils = require("../../utils");
const { Op } = require("sequelize");

/**
 * @typedef activityDetailsParams
 * @property {number} id - The activity's id
 */

/**
 * Returns one activity data by id
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function activityDetails(req, res) {
	try {
		const { id } = req.params;
		const loggedUserId = req.userId;

		const activity = await db.mysql.Activity.findByPk(id, {
			include: [
				{
					model: db.mysql.ActivityCategory,
					attributes: ["activity_category_ID", "category"],
				},
				{
					model: db.mysql.Workout,
					attributes: ["workout_ID", "workout"],
				},
			],
		});

		const findActivityVideo = await db.mysql.Asset.findOne({
			attributes: ["Asset_ID", "provider_video_url"],
			where: {
				activity_id: id,
				provider_video_url: {
					[Op.not]: null,
				},
			},
		});

		const findActivityImage = await db.mysql.Asset.findOne({
			attributes: ["Asset_ID", "provider_image_url"],
			where: {
				activity_id: id,
				provider_image_url: {
					[Op.not]: null,
				},
			},
		});

		if (!activity) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Activity not found");
			return;
		}

		const isMyFavorite = await db.mysql.Favorite.findOne({
			where: {
				activity_id: id,
				user_id: loggedUserId,
			},
		});

		const isMyPremium = await db.mysql.Buyer.findOne({
			where: {
				activity_id: id,
				user_id: loggedUserId,
			},
		});

		const responseData =
			isMyPremium && activity?.isPremium
				? {
						activity_id: activity.activity_ID,
						isPremium: activity.isPremium,
						isMyPremium: !!isMyPremium,
						isMyFavorite: !!isMyFavorite,
						intensity:
							activity.intensity === 1
								? "Low"
								: activity.intensity === 2
									? "Moderate I"
									: activity.intensity === 3
										? "Moderate II"
										: activity.intensity === 4
											? "Moderate III"
											: "Vigorous",
						title: activity.title,
						category: "Premium",
						tag: activity.tag,
						description: activity.description,
						video: {
							url: findActivityVideo?.provider_video_url,
						},
						videoTime: activity.video_time,
						createdAt: activity.createdAt,
						updatedAt: activity.updatedAt,
					}
				: !isMyPremium && activity?.isPremium
					? {
							activity_id: activity.activity_ID,
							isPremium: activity.isPremium,
							isMyPremium: !!isMyPremium,
							intensity:
								activity.intensity === 1
									? "Low"
									: activity.intensity === 2
										? "Moderate I"
										: activity.intensity === 3
											? "Moderate II"
											: activity.intensity === 4
												? "Moderate III"
												: "Vigorous",
							title: activity.title,
							tag: activity.tag,
							description: activity.description,
							price: activity.price,
							videoTime: activity.video_time,
							image: {
								url: findActivityImage?.provider_image_url,
							},
							createdAt: activity.createdAt,
							updatedAt: activity.updatedAt,
						}
					: {
							activity_id: activity.activity_ID,
							isPremium: activity.isPremium,
							isMyPremium: !!isMyPremium,
							isMyFavorite: !!isMyFavorite,
							intensity:
								activity.intensity === 1
									? "Low"
									: activity.intensity === 2
										? "Moderate I"
										: activity.intensity === 3
											? "Moderate II"
											: activity.intensity === 4
												? "Moderate III"
												: "Vigorous",
							title: activity.title,
							category: {
								id: activity.activity_category.activity_category_ID,
								name: activity.activity_category.category,
							},
							tag: activity.tag,
							description:
								activity.activity_category.category === "Muscles"
									? activity.workouts.map((workout) => ({
											id: workout.workout_ID,
											workout: workout.workout,
										}))
									: activity.description,
							image: {
								url: findActivityImage?.provider_image_url,
							},
							duration: activity.duration,
							createdAt: activity.createdAt,
							updatedAt: activity.updatedAt,
						};

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Activity Data retrieved successfully",
			responseData,
		);
		return;
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = activityDetails;
