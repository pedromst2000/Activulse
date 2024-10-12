const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");
const { Op } = require("sequelize");

const ACTIVITY_ATTRIBUTES = [
	"activity_ID",
	"title",
	"intensity",
	"video_time",
	"duration",
	"isPremium",
	"category_id",
];

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 */

/**
 * Get the Favorites Activities (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getActivitiesFav(req, res) {
	try {
		/** @type {QueryOptions} */

		const loggedUser = req.userId;

		let {
			page = config.pagination.favorites.defaultPage,
			limit = config.pagination.favorites.defaultLimit,
		} = req.query;

		const findFavorites = await db.mysql.Favorite.findAndCountAll({
			where: {
				user_id: loggedUser,
				activity_id: {
					[Op.not]: null,
				},
			},
			include: [
				{
					model: db.mysql.Activity,
					attributes: ACTIVITY_ATTRIBUTES,
					include: [
						{
							model: db.mysql.ActivityCategory,
							attributes: ["category"],
						},
						{
							model: db.mysql.Asset,
							attributes: ["provider_image_url"],
						},
					],
				},
			],
			limit: limit,
			offset: (page - 1) * limit,
		});

		//To avoid duplicate activities
		const uniqueFavActivities = [];
		const activityIds = new Set();

		for (const favorite of findFavorites.rows) {
			const activity = favorite.activity;
			if (!activityIds.has(activity.activity_ID)) {
				uniqueFavActivities.push(activity);
				activityIds.add(activity.activity_ID);
			}
		}

		const favActivities = {
			count: uniqueFavActivities.length,
			rows: uniqueFavActivities,
		};

		let resultFavActivities = favActivities.rows;

		if (resultFavActivities.length === 0) {
			utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"No Favorites Activities Found",
			);
			return;
		} else {
			utils.handleResponse(
				res,
				utils.http.StatusOK,
				"Favorites Activities retrieved successfully",
				{
					activities: resultFavActivities.map((favActivity) => {
						const activity = favActivity;
						return activity.isPremium
							? {
									id: activity.activity_ID,
									isPremium: activity.isPremium,
									title: activity.title,
									videoTime: activity.video_time,
									intensity:
										activity.intensity === 1
											? "Light"
											: activity.intensity === 2
												? "Moderate I"
												: activity.intensity === 3
													? "Moderate II"
													: activity.intensity === 4
														? "Moderate III"
														: "Vigorous",
									category: activity.activity_category.category,
									tag: activity.tag,
									imageUrl: activity.asset.provider_image_url,
								}
							: {
									id: activity.activity_ID,
									isPremium: activity.isPremium,
									title: activity.title,
									duration: activity.duration,
									intensity:
										activity.intensity === 1
											? "Light"
											: activity.intensity === 2
												? "Moderate I"
												: activity.intensity === 3
													? "Moderate II"
													: activity.intensity === 4
														? "Moderate III"
														: "Vigorous",
									category: activity.activity_category.category,
									tag: activity.tag,
									imageUrl: activity.asset.provider_image_url,
								};
					}),
					total: resultFavActivities.length,
				},
			);
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getActivitiesFav;
