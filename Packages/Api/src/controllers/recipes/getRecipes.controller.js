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
	"createdAt",
	"updatedAt",
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

					diet ? (query.diet_id = { [Op.eq]: diet.diet_ID }) : null; // if the diet exists, adding the diet_id to the query
				}
				break;

			case "category":
				if (value && value !== "All" && value !== "Premium") {
					// Finding the category by name if it's not "All" or "Premium"
					const category = await db.mysql.RecipeCategory.findOne({
						where: {
							category: value,
						},
						attributes: ["recipe_category_ID"],
					});
					// If the category exists, adding the category_id to the query
					category
						? (query.category_id = { [Op.eq]: category.recipe_category_ID })
						: null;
				}

				// !! Category Premium does not exist , so its needed to handle it separately. To return the proper premium recipes bought by the user.
				else if (value === "Premium") {
					// If the category is "Premium", getting the premium recipes bought by the user
					const userPremiumRecipes = await db.mysql.Buyer.findAll({
						where: {
							user_id: options.user_ID,
							recipe_id: {
								[Op.ne]: null,
							},
						},
						attributes: ["recipe_id"],
					});

					// // Extracting the IDs of the premium recipes bought by the user
					const premiumRecipeIds = userPremiumRecipes.map((recipe) => recipe.recipe_id);

					// Adding the premium recipe IDs to the query
					query.recipe_ID = { [Op.in]: premiumRecipeIds };
				}
				break;
			case "title":
				if (value) {
					// If a title is provided, adding it to the query with a LIKE operator for partial matching
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

		/** @type {QueryOptions} */

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
					user_ID: loggedUser,
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

		const findUserPremiumRecipes = await db.mysql.Buyer.findAndCountAll({
			where: {
				user_id: loggedUser,
				recipe_id: {
					[Op.ne]: null,
				},
			},
			attributes: ["recipe_id"],
		});

		//To avoid duplicate recipes
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

		let resultRecipes = recipes.rows;

		let resultUserPremiumRecipes = findUserPremiumRecipes.rows;

		resultRecipes = resultRecipes.filter((recipe) => {
			if (recipe.isPremium) {
				//returning only the bought premium recipes by the user
				return resultUserPremiumRecipes.some(
					(userRecipe) => userRecipe.recipe_id === recipe.recipe_ID,
				);
			}

			// // returning all the free recipes and the premium recipes bought by the user
			return true;
		});

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

		const RECIPES = resultRecipes.map((recipe) => {
			const parsedRecipe = recipe.toJSON();

			return {
				id: parsedRecipe.recipe_ID,
				isPremium: parsedRecipe.isPremium,
				title: parsedRecipe.title,
				confTime: parsedRecipe.duration_conf,
				videoTime: parsedRecipe.video_time,
				category: parsedRecipe.recipe_category.category,
				diet: parsedRecipe.diet.diet_name,
				imageUrl: parsedRecipe.asset.provider_image_url,
				createdAt: parsedRecipe.createdAt,
				updateAt: parsedRecipe.updatedAt,
			};
		});

		if (RECIPES.length === 0 && title !== "") {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Recipes Found");
			return;
		} else if (RECIPES.length === 0 && category === "Premium" && title.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No Premium Recipes Found");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Recipes retrieved successfully", {
			recipes: RECIPES,
			total: RECIPES.length,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getRecipes;
