const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef buyRecipeParams
 * @property {number} id - The recipe's id to buy
 */

/**
 * Buy one recipe.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function buyRecipe(req, res) {
	try {
		/**
		 * @type {buyRecipeParams}
		 */

		const { id } = req.params;
		const loggedUserId = req.userId;

		const findPremiumRecipe = await db.mysql.Recipe.findOne({
			where: {
				recipe_ID: id,
				isPremium: true, // Only premium recipes
			},
			include: {
				model: db.mysql.Diet,
				attributes: ["diet_ID", "diet_name"],
			},
		});

		const user = await db.mysql.User.findOne({
			where: {
				user_id: loggedUserId,
			},
			attributes: ["diet_id", "points"],
			include: {
				model: db.mysql.Diet,
				attributes: ["diet_ID", "diet_name"],
			},
			required: false,
		});

		const alreadyBought = await db.mysql.Buyer.findOne({
			where: {
				recipe_id: id,
				user_id: loggedUserId,
			},
		});

		if (!findPremiumRecipe) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Recipe not found !");
			return;
		}

		if (
			user?.diet !== null &&
			findPremiumRecipe.diet.diet_name !== user?.diet.diet_name
		) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"you are not allowed to buy one recipe that does not match your diet !",
			);
			return;
		} else if (alreadyBought) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"you have already bought this recipe",
			);
			return;
		} else if (user?.points < findPremiumRecipe.price) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"you do not have enough points to buy this recipe !",
			);
			return;
		} else {
			const transaction = await db.mysql.sequelize.transaction();
			try {
				await db.mysql.Buyer.create(
					{
						recipe_id: id,
						user_id: loggedUserId,
					},
					{ transaction },
				);

				await db.mysql.User.update(
					{
						points: user.points - findPremiumRecipe.price,
					},
					{
						where: {
							user_ID: loggedUserId,
						},
						transaction,
					},
				);

				await transaction.commit();
				utils.handleResponse(
					res,
					utils.http.StatusCreated,
					"Premium Recipe bought successfully !",
				);
			} catch (error) {
				await transaction.rollback();
				throw error;
			}
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = buyRecipe;
