const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get Favorites Recipes
router.get(
	"/recipes",
	validators.favorites.getFavorites(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.favorites.getRecipesFav,
);

module.exports = router;
