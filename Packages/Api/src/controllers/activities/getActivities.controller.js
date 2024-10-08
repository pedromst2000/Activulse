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
 * @property {"Light" | "Moderate" | "Vigorous" | undefined } intensity - The intensity of the activity.
 * @property {"All" | "Cardio" | "Yoga" | "Muscles" | "Premium" | undefined } category - The category name.
 */

/**
 * @typedef GetQueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {"Light" | "Moderate" | "Vigorous" | undefined } intensity - The intensity of the activity.
 * @property {"All" | "Cardio" | "Yoga" | "Muscles" | "Premium" | undefined } category - The category name.
 */

/**
 * @param {GetQueryOptions} options
 * @returns {import("sequelize").WhereOptions}
 */
async function GetQueryOptions(options) {
	const query = {};

	for (const [key, value] of Object.entries(options)) {
		switch (key) {
			case "intensity":
				if (value) {
					if (value === "Light") {
						query.intensity = { [Op.eq]: 1 };
					}
					if (value === "Moderate") {
						query.intensity = { [Op.between]: [2, 4] };
					} else if (value === "Vigorous") {
						query.intensity = { [Op.eq]: 5 };
					}
				}
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
 * Get the Activities (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getActivities(req, res) {
	try {
		/** @type {QueryOptions} */

		const loggedUser = req.userId;

		let {
			page = config.pagination.recipes.feed.defaultPage,
			limit = config.pagination.recipes.feed.defaultLimit,
			intensity = "",
			category,
		} = req.query;

		category = !category ? "All" : category; // by default the category is All to return all the activities

		const findActivities = await db.mysql.Activity.findAndCountAll({
			attributes: ACTIVITY_ATTRIBUTES,
			where: {
				...(await GetQueryOptions({
					category: category,
					intensity: intensity,
				})),
				isPremium: !1, // not premium activities
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
			limit: limit,
			offset: (page - 1) * limit,
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
		const uniqueActivities = [];
		const uniqueUserPremiumActivities = [];
		const activityIds = new Set();
		const userPremiumActivityIds = new Set();

		for (const activity of findActivities.rows) {
			if (!activityIds.has(activity.activity_ID)) {
				uniqueActivities.push(activity);
				activityIds.add(activity.activity_ID);
			}
		}

		for (const activity of findUserPremiumActivities.rows) {
			if (!userPremiumActivityIds.has(activity.activity.activity_ID)) {
				uniqueUserPremiumActivities.push(activity);
				userPremiumActivityIds.add(activity.activity.activity_ID);
			}
		}

		const activities = {
			count: uniqueActivities.length,
			rows: uniqueActivities,
		};

		const premiumUserActivities = {
			count: uniqueUserPremiumActivities.length,
			rows: uniqueUserPremiumActivities,
		};

		let resultActivities = activities.rows;
		const resultUserPremiumActivities = premiumUserActivities.rows;

		// Randomize the activities feed to avoid showing the same activities in the same order
		const categories = {
			Cardio: [],
			Yoga: [],
			Muscles: [],
		};

		resultActivities.forEach((activity) => {
			const category = activity.activity_category.category;
			if (categories[category]) {
				categories[category].push(activity);
			}
		});

		const randomizedActivities = [];
		let index = 0;
		const CATEGORIES = Object.keys(categories);

		while (randomizedActivities.length < resultActivities.length) {
			const category = CATEGORIES[index];
			const activities = categories[category];
			if (activities.length > 0) {
				const randomIndex = Math.floor(Math.random() * activities.length);
				randomizedActivities.push(activities[randomIndex]);
				categories[category].splice(randomIndex, 1);
			}

			index = (index + 1) % CATEGORIES.length;
		}

		resultActivities = randomizedActivities;

		const ALL_ACTIVITIES = resultActivities.map((parsedActivity) => ({
			id: parsedActivity.activity_ID,
			title: parsedActivity.title,
			isPremium: parsedActivity.isPremium,
			duration: parsedActivity.duration,
			category: parsedActivity.activity_category.category,
			intensity:
				parsedActivity.intensity === 1
					? "Light"
					: parsedActivity.intensity === 2 ||
						  parsedActivity.intensity === 3 ||
						  parsedActivity.intensity === 4
						? "Moderate"
						: "Vigorous",
			imageUrl: parsedActivity.asset.provider_image_url,
		}));

		const PREMIUM_ACTIVITIES = uniqueUserPremiumActivities
			.map((activity) => activity.activity)
			.filter((activity) => {
				if (!intensity) return true; // If no intensity filter is provided, include all activities
				switch (intensity) {
					case "Light":
						return activity.intensity === 1;
					case "Moderate":
						return activity.intensity >= 2 && activity.intensity <= 4;
					case "Vigorous":
						return activity.intensity === 5;
					default:
						return false;
				}
			})
			.map((parsedActivity) => ({
				id: parsedActivity.activity_ID,
				title: parsedActivity.title,
				isPremium: parsedActivity.isPremium,
				videoTime: parsedActivity.video_time,
				category: parsedActivity.activity_category.category,
				intensity:
					parsedActivity.intensity === 1
						? "Light"
						: parsedActivity.intensity === 2 ||
							  parsedActivity.intensity === 3 ||
							  parsedActivity.intensity === 4
							? "Moderate"
							: "Vigorous",
				imageUrl: parsedActivity.asset.provider_image_url,
			}));

		if (category === "Premium") {
			if (PREMIUM_ACTIVITIES.length === 0) {
				utils.handleResponse(
					res,
					utils.http.StatusNotFound,
					"No Premium Activities Found",
				);
				return;
			}
		} else {
			if (resultActivities.length === 0) {
				utils.handleResponse(res, utils.http.StatusNotFound, "No Activities Found");
				return;
			}
		}

		utils.handleResponse(res, utils.http.StatusOK, "Activities retrieved successfully", {
			activities: category === "Premium" ? PREMIUM_ACTIVITIES : ALL_ACTIVITIES,
			total: category === "Premium" ? PREMIUM_ACTIVITIES.length : ALL_ACTIVITIES.length,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getActivities;
