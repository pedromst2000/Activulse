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
 */

/**
 * Get the Favorites Recipes (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function getRecipesFav(req, res) {
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
				recipe_id: {
					[Op.not]: null,
				},
			},
			include: [
				{
					model: db.mysql.Recipe,
					attributes: RECIPE_ATTRIBUTES,
					include: [
						{
							model: db.mysql.RecipeCategory,
							attributes: ["category"],
						},
						{
							model: db.mysql.Diet,
							attributes: ["diet_name"],
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

		//To avoid duplicate recipes
		const uniqueFavRecipes = [];
		const recipeIds = new Set();

		for (const favorite of findFavorites.rows) {
			const recipe = favorite.recipe;
			if (!recipeIds.has(recipe.recipe_ID)) {
				uniqueFavRecipes.push(recipe);
				recipeIds.add(recipe.recipe_ID);
			}
		}

		const favRecipes = {
			count: uniqueFavRecipes.length,
			rows: uniqueFavRecipes,
		};

		let resultFavRecipes = favRecipes.rows;

		if (resultFavRecipes.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Favorites Recipes Found");
			return;
		} else {
			utils.handleResponse(
				res,
				utils.http.StatusOK,
				"Favorites Recipes retrieved successfully",
				{
					recipes: resultFavRecipes.map((favRecipe) => {
						const recipe = favRecipe;
						return recipe.isPremium
							? {
									id: recipe.recipe_ID,
									isPremium: recipe.isPremium,
									title: recipe.title,
									videoTime: recipe.video_time,
									category: recipe.recipe_category.category,
									diet: recipe.diet.diet_name,
									imageUrl: recipe.asset.provider_image_url,
								}
							: {
									id: recipe.recipe_ID,
									isPremium: recipe.isPremium,
									title: recipe.title,
									confTime: recipe.duration_conf,
									category: recipe.recipe_category.category,
									diet: recipe.diet.diet_name,
									imageUrl: recipe.asset.provider_image_url,
								};
					}),
					total: resultFavRecipes.length,
				},
			);
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getRecipesFav;
