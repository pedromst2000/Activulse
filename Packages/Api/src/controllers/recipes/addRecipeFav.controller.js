const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef addRecipeFavParams
 * @property {number} id - The recipe's id
 */

/**
 * Adds a recipe to the user's favorites list.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function addRecipeFav(req, res) {
	try {
		const { id } = req.params;
		const loggedUserId = req.userId;

		const recipe = await db.mysql.Recipe.findByPk(id, {
			include: [
				{
					model: db.mysql.Diet,
					attributes: ["diet_ID", "diet_name"],
				},
			],
		});

		const findFavoritesRecipes = await db.mysql.Favorite.findOne({
			where: {
				user_id: loggedUserId,
				recipe_id: id,
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

		const findUserPremiumRecipes = await db.mysql.Buyer.findOne({
			where: {
				user_id: loggedUserId,
				recipe_id: id,
			},
		});

		if (!recipe) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Recipe not found !");
			return;
		}

		if (findFavoritesRecipes) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"Recipe already in favorites !",
			);

			return;
		} else if (
			userDiet?.diet !== null &&
			recipe.diet.diet_name !== userDiet?.diet.diet_name
		) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You cannot add a recipe to favorites that does not match your diet !",
			);
			return;
		} else if (!findUserPremiumRecipes && recipe.isPremium) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You cannot add a premium recipe to favorites without buying it !",
			);
			return;
		} else {
			await db.mysql.Favorite.create({
				user_id: loggedUserId,
				recipe_id: id,
			});

			utils.handleResponse(res, utils.http.StatusCreated, "Recipe added to favorites !");
			return;
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addRecipeFav;
