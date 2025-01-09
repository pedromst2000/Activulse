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
	"createdAt",
	"updatedAt",
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
					} else if (value === "Moderate") {
						query.intensity = { [Op.between]: [2, 4] };
					} else if (value === "Vigorous") {
						query.intensity = { [Op.eq]: 5 };
					}
				}
				break;
			case "category":
				if (value && value !== "All" && value !== "Premium") {
					// Finding the category by name if it's not "All" or "Premium"
					const category = await db.mysql.ActivityCategory.findOne({
						where: {
							category: value,
						},
						attributes: ["activity_category_ID"],
					});
					// If the category exists, adding the category_id to the query
					if (category) {
						query.category_id = { [Op.eq]: category.activity_category_ID };
					}
				}

				// !! Category Premium does not exist , so its needed to handle it separately. To return the proper premium activities bought by the user.
				else if (value === "Premium") {
					// If the category is "Premium", getting the premium activities bought by the user
					const userPremiumActivities = await db.mysql.Buyer.findAll({
						where: {
							user_id: options.user_ID,
							activity_id: {
								[Op.ne]: null,
							},
						},
						attributes: ["activity_id"],
					});

					// Extracting the IDs of the premium activities bought by the user
					const premiumActivityIds = userPremiumActivities.map(
						(activity) => activity.activity_id,
					);

					// Adding the premium activity IDs to the query
					query.activity_ID = { [Op.in]: premiumActivityIds };
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
		const loggedUser = req.userId;

		/** @type {QueryOptions} */

		let {
			page = config.pagination.activities.feed.defaultPage,
			limit = config.pagination.activities.feed.defaultLimit,
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
					user_ID: loggedUser,
				})),
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
			attributes: ["activity_id"],
		});

		//To avoid duplicate activities
		const uniqueActivities = [];
		const activityIds = new Set();

		for (const activity of findActivities.rows) {
			if (!activityIds.has(activity.activity_ID)) {
				uniqueActivities.push(activity);
				activityIds.add(activity.activity_ID);
			}
		}

		const activities = {
			count: uniqueActivities.length,
			rows: uniqueActivities,
		};

		let resultActivities = activities.rows;
		let resultUserPremiumActivities = findUserPremiumActivities.rows;

		resultActivities = resultActivities.filter((activity) => {
			if (activity.isPremium) {
				//returning only the bought premium activities by the user
				return resultUserPremiumActivities.some(
					(userActivity) => userActivity.activity_id === activity.activity_ID,
				);
			}

			// returning all the free activities and the premium activities bought by the user
			return true;
		});

		// // Randomize the activities feed to avoid showing the same activities in the same order
		const categories = {
			Cardio: [],
			Yoga: [],
			Muscles: [],
			Premium: [],
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

		const ACTIVITIES = resultActivities.map((parsedActivity) => ({
			id: parsedActivity.activity_ID,
			title: parsedActivity.title,
			isPremium: parsedActivity.isPremium,
			duration: parsedActivity.duration,
			videoTime: parsedActivity.video_time,
			category: parsedActivity.activity_category.category,
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
			imageUrl: parsedActivity.asset.provider_image_url,
			createdAt: parsedActivity.createdAt,
			updateAt: parsedActivity.updatedAt,
		}));

		if (intensity !== "" && ACTIVITIES.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Activities Found");
			return;
		} else if (category === "Premium" && ACTIVITIES.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Premium Activities Found");
			return;
		}

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Activities retrieved successfully",
			{
				activities: ACTIVITIES,
				total: ACTIVITIES.length,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getActivities;
