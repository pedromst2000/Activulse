const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");
const { Op } = require("sequelize");

const RECIPE_ATTRIBUTES = [
	"recipe_ID",
	"title",
	"video_time",
	"price",
	"category_id",
	"diet_id",
	"createdAt",
	"updatedAt",
];

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {"All" | "Soups" | "Main Dishes" | "Salads" | "Desserts" } category - The category name.
 */

/**
 * @typedef GetQueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {"All" | "Soups" | "Main Dishes" | "Salads" | "Desserts" } category - The category name.
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
			default:
				break;
		}
	}

	return query;
}

/**
 * Get the Store Recipes (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getStoreRecipes(req, res) {
	try {
		const loggedUser = req.userId;

		/** @type {QueryOptions} */

		let {
			page = config.pagination.premium.recipes.feed.defaultPage,
			limit = config.pagination.premium.recipes.feed.defaultLimit,
			category,
		} = req.query;

		category = !category ? "All" : category; // by default the category is All to return all the recipes

		const findUserDiet = await db.mysql.User.findOne({
			where: {
				user_ID: loggedUser,
			},
			include: {
				model: db.mysql.Diet,
				attributes: ["diet_ID", "diet_name"],
			},
		});

		const findPremiumRecipes = await db.mysql.Recipe.findAndCountAll({
			attributes: RECIPE_ATTRIBUTES,
			where: {
				...(await GetQueryOptions({
					category: category,
				})),

				diet_id: findUserDiet.diet ? findUserDiet.diet.diet_ID : { [Op.ne]: null },

				isPremium: true, // premium recipes
			},
			include: [
				{
					model: db.mysql.RecipeCategory,
					attributes: ["recipe_category_ID", "category"],
				},
				{
					model: db.mysql.Diet,
					attributes: ["diet_ID", "diet_name"],
				},
				{
					model: db.mysql.Asset,
					attributes: ["provider_image_url"],
				},
			],
		});

		// Premium Recipes Bought by the user will not be displayed

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
						model: db.mysql.RecipeCategory,
						attributes: ["recipe_category_ID", "category"],
					},
					{
						model: db.mysql.Diet,
						attributes: ["diet_ID", "diet_name"],
					},
					{
						model: db.mysql.Asset,
						attributes: ["provider_image_url"],
					},
				],
			},
		});

		// //To avoid duplicate recipes
		const uniquePremiumRecipes = [];
		const uniqueUserPremiumRecipes = [];
		const premiumRecipeIds = new Set();
		const userPremiumRecipeIds = new Set();

		for (const recipe of findPremiumRecipes.rows) {
			if (!premiumRecipeIds.has(recipe.recipe_ID)) {
				uniquePremiumRecipes.push(recipe);
				premiumRecipeIds.add(recipe.recipe_ID);
			}
		}

		for (const recipe of findUserPremiumRecipes.rows) {
			if (!userPremiumRecipeIds.has(recipe.recipe.recipe_ID)) {
				uniqueUserPremiumRecipes.push(recipe);
				userPremiumRecipeIds.add(recipe.recipe.recipe_ID);
			}
		}

		const premiumRecipes = {
			count: uniquePremiumRecipes.length,
			rows: uniquePremiumRecipes,
		};

		const premiumUserRecipes = {
			count: uniqueUserPremiumRecipes.length,
			rows: uniqueUserPremiumRecipes,
		};

		let PREMIUM_RECIPES = premiumRecipes.rows.filter(
			(recipe) =>
				!premiumUserRecipes.rows.some(
					(userRecipe) => userRecipe.recipe.recipe_ID === recipe.recipe_ID,
				),
		);

		PREMIUM_RECIPES = PREMIUM_RECIPES.slice((page - 1) * limit, page * limit);

		if (PREMIUM_RECIPES.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Store Recipes Found");
			return;
		}

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Store Recipes retrieved successfully",
			{
				recipes: PREMIUM_RECIPES.map((recipe) => {
					const parsedRecipe = recipe.toJSON();

					return {
						id: parsedRecipe.recipe_ID,
						title: parsedRecipe.title,
						videoTime: parsedRecipe.video_time,
						price: parsedRecipe.price,
						category: parsedRecipe.recipe_category.category,
						diet: parsedRecipe.diet.diet_name,
						imageUrl: parsedRecipe.asset.provider_image_url,
						createdAt: parsedRecipe.createdAt,
						updateAt: parsedRecipe.updatedAt,
					};
				}),
				total: PREMIUM_RECIPES.length,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getStoreRecipes;
