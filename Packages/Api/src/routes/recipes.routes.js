const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get One Recipe Details
router.get(
	"/:id",
	validators.recipes.recipeDetails(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.recipDetails,
);

// Get Recipes Feed
router.get(
	"/",
	validators.recipes.getRecipes(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.getRecipes,
);

module.exports = router;
