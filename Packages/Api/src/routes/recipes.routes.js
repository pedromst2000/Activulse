const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get One Recipe Details
router.get(
	"/:id",
	validators.recipes.recipeID(),
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

// Add Recipe to Favorites
router.post(
	"/:id/favorites",
	validators.recipes.recipeID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.addRecipeFav,
);

// Delete Recipe from Favorites
router.delete(
	"/:id/favorites",
	validators.recipes.recipeID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.deleteRecipeFav,
);

module.exports = router;
