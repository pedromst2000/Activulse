const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");
const { Op } = require("sequelize");

const ACTIVITY_ATTRIBUTES = [
	"activity_ID",
	"title",
	"intensity",
	"video_time",
	"isPremium",
	"price",
	"tag",
	"category_id",
	"createdAt",
	"updatedAt",
];

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property { "All" | "Cardio" | "Yoga" | "Muscles" } category - The category name.
 */

/**
 * @typedef GetQueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property { "All" | "Cardio" | "Yoga" | "Muscles" } category - The category name.
 */

/**
 * @param {GetQueryOptions} options
 * @returns {import("sequelize").WhereOptions}
 */

async function GetQueryOptions(options) {
	const query = {};

	for (const [key, value] of Object.entries(options)) {
		switch (key) {
			case "category":
				if (value && value !== "All") {
					const category = await db.mysql.ActivityCategory.findOne({
						where: {
							category: value,
						},
						attributes: ["activity_category_ID"],
					});
					category
						? (query.category_id = { [Op.eq]: category.activity_category_ID }) // if the category exists, add the category_id to the query
						: null;
				}
				break;
			default:
				break;
		}
	}

	return query;
}

/**
 * Get the Store Activities (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getStoreActivities(req, res) {
	try {
		const loggedUser = req.userId;

		/** @type {QueryOptions} */

		let {
			page = config.pagination.premium.activities.feed.defaultPage,
			limit = config.pagination.premium.activities.feed.defaultLimit,
			category,
		} = req.query;

		category = !category ? "All" : category; // by default the category is All to return all the activities

		const findPremiumActivities = await db.mysql.Activity.findAndCountAll({
			attributes: ACTIVITY_ATTRIBUTES,
			where: {
				...(await GetQueryOptions({
					category: category,
				})),
				isPremium: true, // premium activities
			},

			include: [
				{
					model: db.mysql.ActivityCategory,
					attributes: ["activity_category_ID", "category"],
				},
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
		});

		const findUserPremiumActivities = await db.mysql.Buyer.findAndCountAll({
			where: {
				user_id: loggedUser,
				activity_id: {
					[Op.ne]: null,
				},
			},
			include: {
				model: db.mysql.Activity,
				attributes: ACTIVITY_ATTRIBUTES,
				include: [
					{
						model: db.mysql.ActivityCategory,
						attributes: ["activity_category_ID", "category"],
					},
					{
						model: db.mysql.Asset,
						attributes: ["provider_image_url"],
					},
				],
			},
		});

		//To avoid duplicate activities
		const uniquePremiumActivities = [];
		const uniqueUserPremiumActivities = [];
		const premiumActivityIds = new Set();
		const userPremiumActivityIds = new Set();

		for (const activity of findPremiumActivities.rows) {
			if (!premiumActivityIds.has(activity.activity_ID)) {
				uniquePremiumActivities.push(activity);
				premiumActivityIds.add(activity.activity_ID);
			}
		}

		for (const activity of findUserPremiumActivities.rows) {
			if (!userPremiumActivityIds.has(activity.activity.activity_ID)) {
				uniqueUserPremiumActivities.push(activity);
				userPremiumActivityIds.add(activity.activity.activity_ID);
			}
		}

		const premiumActivities = {
			count: uniquePremiumActivities.length,
			rows: uniquePremiumActivities,
		};

		const premiumUserActivities = {
			count: uniqueUserPremiumActivities.length,
			rows: uniqueUserPremiumActivities,
		};

		let PREMIUM_ACTIVITIES = premiumActivities.rows.filter(
			(activity) =>
				!premiumUserActivities.rows.some(
					(userActivity) => userActivity.activity.activity_ID === activity.activity_ID,
				),
		);

		PREMIUM_ACTIVITIES = PREMIUM_ACTIVITIES.slice((page - 1) * limit, page * limit);

		if (PREMIUM_ACTIVITIES.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Activities Found");
			return;
		}

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Store Activities retrieved successfully",
			{
				activities: PREMIUM_ACTIVITIES.map((activity) => {
					const parsedActivity = activity.toJSON();

					return {
						id: parsedActivity.activity_ID,
						title: parsedActivity.title,
						videoTime: parsedActivity.video_time,
						intensity:
							parsedActivity.intensity === 1
								? "Light"
								: parsedActivity.intensity === 2
									? "Moderate I"
									: parsedActivity.intensity === 3
										? "Moderate II"
										: parsedActivity.intensity === 4
											? "Moderate III"
											: "Vigorous",
						price: parsedActivity.price,
						tag: parsedActivity.tag,
						category: parsedActivity.activity_category.category,
						imageUrl: parsedActivity.asset.provider_image_url,
						createdAt: parsedActivity.createdAt,
						updateAt: parsedActivity.updatedAt,
					};
				}),
				total: PREMIUM_ACTIVITIES.length,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getStoreActivities;
