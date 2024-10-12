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

// Get Favorites Activities
router.get(
	"/activities",
	validators.favorites.getFavorites(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.favorites.getActivitiesFav,
);

module.exports = router;
