const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef deleteRecipeFavParams
 * @property {number} id - The recipe's id
 */

/**
 * Deletes a recipe from the user's favorites list.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function deleteRecipeFav(req, res) {
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

		if (!recipe) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Recipe not found !");
			return;
		}

		if (!findFavoritesRecipes) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Recipe not in favorites !");
			return;
		} else {
			await db.mysql.Favorite.destroy({
				where: {
					user_id: loggedUserId,
					recipe_id: id,
				},
			});

			utils.handleResponse(res, utils.http.StatusOK, "Recipe removed from favorites !");
			return;
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteRecipeFav;
