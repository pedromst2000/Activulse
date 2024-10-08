const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");
const { Op } = require("sequelize");

const RECIPE_ATTRIBUTES = [
	"recipe_ID",
	"title",
	"video_time",
	"duration_conf",
	"isPremium",
	"category_id",
	"diet_id",
];

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {"DASH" | "Vegan" | "Mediterranean" | undefined } diet - The diet name.
 * @property {"All" | "Soups" | "Main Dishes" | "Salads" | "Desserts" | "Premium" | undefined } category - The category name.
 * @property {string?} title - The title name.
 */

/**
 * @typedef GetQueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {"DASH" | "Vegan" | "Mediterranean" | undefined } diet - The diet name.
 * @property {"All" | "Soups" | "Main Dishes" | "Salads" | "Desserts" | "Premium" | undefined} category - The category name.
 * @property {string?} title - The title name.
 */

/**
 * @param {GetQueryOptions} options
 * @returns {import("sequelize").WhereOptions}
 */
async function GetQueryOptions(options) {
	const query = {};

	for (const [key, value] of Object.entries(options)) {
		switch (key) {
			case "diet":
				if (value) {
					const diet = await db.mysql.Diet.findOne({
						where: {
							diet_name: value,
						},
						attributes: ["diet_ID"],
					});

					diet ? (query.diet_id = { [Op.eq]: diet.diet_ID }) : null; // if the diet exists, add the diet_id to the query
				}
				break;
			case "category":
				if (value && value !== "All") {
					const category = await db.mysql.RecipeCategory.findOne({
						where: {
							category: value,
						},
						attributes: ["recipe_category_ID"],
					});
					category
						? (query.category_id = { [Op.eq]: category.recipe_category_ID }) // if the category exists, add the category_id to the query
						: null;
				}
				break;
			case "title":
				if (value) {
					query.title = {
						[Op.like]: `%${value}%`,
					};
				}
				break;
			default:
				break;
		}
	}

	return query;
}

/**
 * Get the Recipes (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getRecipes(req, res) {
	try {
		/** @type {QueryOptions} */

		const loggedUser = req.userId;

		const userDiet = await db.mysql.User.findOne({
			where: {
				user_id: loggedUser,
			},
			attributes: ["diet_id"],
			include: {
				model: db.mysql.Diet,
				attributes: ["diet_ID", "diet_name"],
			},
			required: false,
		});

		let {
			page = config.pagination.recipes.feed.defaultPage,
			limit = config.pagination.recipes.feed.defaultLimit,
			diet,
			title = "",
			category,
		} = req.query;

		category = !category ? "All" : category; // by default the category is All to return all the recipes
		title = !title ? "" : title; // by default the title is empty to return all the recipes

		// if the user has no diet, it is mandatory to set a value to the query diet
		if (userDiet.diet == null && !diet) {
			utils.handleResponse(res, utils.http.StatusBadRequest, "Please provide a diet!");
			return;
		}

		// if the user has a diet, the query diet is not mandatory and by default is the user diet the value of the query diet
		if (userDiet.diet !== null && !diet) {
			diet = userDiet.diet?.diet_name;
		}

		const findRecipes = await db.mysql.Recipe.findAndCountAll({
			attributes: RECIPE_ATTRIBUTES,
			where: {
				...(await GetQueryOptions({
					title,
					diet: diet,
					category: category,
				})),
				isPremium: !1, // not premium recipes
			},

			include: [
				{
					model: db.mysql.Diet,
					attributes: ["diet_ID", "diet_name"],
				},
				{
					model: db.mysql.RecipeCategory,
					attributes: ["recipe_category_ID", "category"],
				},
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
			limit: limit,
			offset: (page - 1) * limit,
		});

		const findUserPremiumRecipes = await db.mysql.Buyer.findAndCountAll({
			where: {
				user_id: loggedUser,
				recipe_id: {
					[Op.ne]: null,
				},
			},
			include: {
				model: db.mysql.Recipe,
				attributes: RECIPE_ATTRIBUTES,
				include: [
					{
						model: db.mysql.Diet,
						attributes: ["diet_ID", "diet_name"],
					},
					{
						model: db.mysql.RecipeCategory,
						attributes: ["recipe_category_ID", "category"],
					},
					{
						model: db.mysql.Asset,
						attributes: ["provider_image_url"],
					},
				],
			},
		});

		//To avoid duplicate recipes
		const uniqueRecipes = [];
		const uniqueUserPremiumRecipes = [];
		const recipeIds = new Set();
		const userPremiumRecipeIds = new Set();

		for (const recipe of findRecipes.rows) {
			if (!recipeIds.has(recipe.recipe_ID)) {
				uniqueRecipes.push(recipe);
				recipeIds.add(recipe.recipe_ID);
			}
		}

		for (const recipe of findUserPremiumRecipes.rows) {
			if (!userPremiumRecipeIds.has(recipe.recipe.recipe_ID)) {
				uniqueUserPremiumRecipes.push(recipe);
				userPremiumRecipeIds.add(recipe.recipe.recipe_ID);
			}
		}

		const recipes = {
			count: uniqueRecipes.length,
			rows: uniqueRecipes,
		};

		const premiumUserRecipes = {
			count: uniqueUserPremiumRecipes.length,
			rows: uniqueUserPremiumRecipes,
		};

		let resultRecipes = recipes.rows;
		const resultUserPremiumRecipes = premiumUserRecipes.rows;

		// Randomize the recipes feed to avoid showing the same recipes in the same order
		const categorizedRecipes = {
			Soups: [],
			"Main Dishes": [],
			Salads: [],
			Desserts: [],
			Premium: [],
		};

		resultRecipes.forEach((recipe) => {
			const category = recipe.recipe_category.category;
			if (categorizedRecipes[category]) {
				categorizedRecipes[category].push(recipe);
			}
		});

		const randomizedRecipes = [];
		let index = 0;
		const categories = Object.keys(categorizedRecipes);

		while (randomizedRecipes.length < resultRecipes.length) {
			const category = categories[index % categories.length];
			if (categorizedRecipes[category].length > 0) {
				randomizedRecipes.push(categorizedRecipes[category].shift());
			}
			index++;
		}

		resultRecipes = randomizedRecipes;

		const PREMIUM_RECIPES = uniqueUserPremiumRecipes
			.map((recipe) => recipe.recipe)
			.filter((recipe) => recipe.title.includes(title))
			.map((parsedRecipe) => ({
				id: parsedRecipe.recipe_ID,
				isPremium: parsedRecipe.isPremium,
				title: parsedRecipe.title,
				videoTime: parsedRecipe.video_time,
				category: parsedRecipe.recipe_category.category,
				diet: parsedRecipe.diet.diet_name,
				imageUrl: parsedRecipe.asset.provider_image_url,
			}));

		if (category === "Premium") {
			if (PREMIUM_RECIPES.length === 0) {
				utils.handleResponse(res, utils.http.StatusNotFound, "No Premium Recipes Found");
				return;
			}
		} else {
			if (resultRecipes.length === 0) {
				utils.handleResponse(res, utils.http.StatusNotFound, "No Recipes Found");
				return;
			}
		}

		utils.handleResponse(res, utils.http.StatusOK, "Recipes retrieved successfully", {
			recipes:
				category === "Premium"
					? PREMIUM_RECIPES
					: resultRecipes.map((recipe) => {
							const parsedRecipe = recipe.toJSON();

							return {
								id: parsedRecipe.recipe_ID,
								isPremium: parsedRecipe.isPremium,
								title: parsedRecipe.title,
								confTime: parsedRecipe.duration_conf,
								category: parsedRecipe.recipe_category.category,
								diet: parsedRecipe.diet.diet_name,
								imageUrl: parsedRecipe.asset.provider_image_url,
							};
						}),
			total: category === "Premium" ? PREMIUM_RECIPES.length : resultRecipes.length,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getRecipes;
