const db = require("../../db");
const utils = require("../../utils");
const { Op } = require("sequelize");

/**
 * @typedef recipeDetailsParams
 * @property {number} id - The recipe's id
 */

/**
 * Returns one recipe data by id
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function recipeDetails(req, res) {
	try {
		/**
		 * @type {recipeDetailsParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const recipe = await db.mysql.Recipe.findByPk(id, {
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
					model: db.mysql.Instruction,
				},
				{
					model: db.mysql.Ingredient,
				},
			],
		});

		const findRecipeVideo = await db.mysql.Asset.findOne({
			attributes: ["Asset_ID", "provider_video_url"],
			where: {
				recipe_id: id,
				provider_video_url: {
					[Op.not]: null,
				},
			},
		});

		const findRecipeImage = await db.mysql.Asset.findOne({
			attributes: ["Asset_ID", "provider_image_url"],
			where: {
				recipe_id: id,
				provider_image_url: {
					[Op.not]: null,
				},
			},
		});

		const userDiet = await db.mysql.User.findOne({
			where: {
				user_id: loggedUserId,
			},
			attributes: ["diet_id"],
			include: {
				model: db.mysql.Diet,
				attributes: ["diet_ID", "diet_name"],
			},
			required: false,
		});

		if (!recipe) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Recipe not found");
			return;
		}

		if (userDiet?.diet !== null && recipe.diet.diet_name !== userDiet?.diet.diet_name) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"you are not allowed to see this recipe that does not match your diet",
			);
			return;
		}

		const isMyFavorite = await db.mysql.Favorite.findOne({
			where: {
				recipe_id: id,
				user_id: loggedUserId,
			},
		});

		const isMyPremium = await db.mysql.Buyer.findOne({
			where: {
				recipe_id: id,
				user_id: loggedUserId,
			},
		});

		const responseData = {
			recipe_id: recipe.recipe_ID,
			isPremium: recipe.isPremium,
			isMyPremium: !!isMyPremium,
			title: recipe.title,
			description: recipe.description,
			diet: {
				id: recipe.diet.diet_ID,
				name: recipe.diet.diet_name,
			},
			category: {
				id: recipe.recipe_category.recipe_category_ID,
				name: recipe.recipe_category.category,
			},
		};

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Recipe Data retrieved successfully",
			isMyPremium && recipe?.isPremium
				? {
						...responseData,
						isMyFavorite: !!isMyFavorite,
						video: { url: findRecipeVideo?.provider_video_url },
						videoTime: recipe.video_time,
						createdAt: recipe.createdAt,
						updatedAt: recipe.updatedAt,
					}
				: !isMyPremium && recipe?.isPremium
					? {
							...responseData,
							image: { url: findRecipeImage?.provider_image_url },
							price: recipe.price,
							videoTime: recipe.video_time,
							createdAt: recipe.createdAt,
							updatedAt: recipe.updatedAt,
						}
					: {
							...responseData,
							isMyFavorite: !!isMyFavorite,
							durationConf: recipe.duration_conf,
							image: { url: findRecipeImage?.provider_image_url },
							ingredients: recipe.ingredients.map((ingredient) => ({
								id: ingredient.ingredient_ID,
								ingredient: ingredient.ingredient,
							})),
							instructions: recipe.instructions.map((instruction) => ({
								id: instruction.instruction_ID,
								instruction: instruction.instruction,
							})),
							createdAt: recipe.createdAt,
							updatedAt: recipe.updatedAt,
						},
		);
		return;
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = recipeDetails;
