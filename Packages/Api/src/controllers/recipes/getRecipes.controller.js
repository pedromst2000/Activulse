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
			title,
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

		// To avoid duplicate recipes
		const uniqueRecipes = [];
		const recipeIds = new Set();

		for (const recipe of findRecipes.rows) {
			if (!recipeIds.has(recipe.recipe_ID)) {
				uniqueRecipes.push(recipe);
				recipeIds.add(recipe.recipe_ID);
			}
		}

		const recipes = {
			count: uniqueRecipes.length,
			rows: uniqueRecipes,
		};

		const resultRecipes = recipes.rows;

		if (!resultRecipes || resultRecipes.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Recipes found");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Recipes retrieved successfully", {
			recipes: resultRecipes.map((recipe) => {
				const parsedRecipe = recipe.toJSON();

				return parsedRecipe.isPremium
					? {
							id: parsedRecipe.recipe_ID,
							isPremium: parsedRecipe.isPremium,
							title: parsedRecipe.title,
							videoTime: parsedRecipe.video_time,
							category: parsedRecipe.recipe_category.category,
							diet: parsedRecipe.diet.diet_name,
							imageUrl: parsedRecipe.asset.provider_image_url,
						}
					: {
							id: parsedRecipe.recipe_ID,
							isPremium: parsedRecipe.isPremium,
							title: parsedRecipe.title,
							durationConf: parsedRecipe.duration_conf,
							category: parsedRecipe.recipe_category.category,
							diet: parsedRecipe.diet.diet_name,
							imageUrl: parsedRecipe.asset.provider_image_url,
						};
			}),
			total: recipes.count,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getRecipes;
