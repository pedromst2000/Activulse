const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get Recipes Feed
router.get(
	"/",
	validators.recipes.getRecipes(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.getRecipes,
);

// Get Store Recipes
router.get(
	"/store",
	validators.recipes.getRecipes(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.getStoreRecipes,
);

// Get One Recipe Details
router.get(
	"/:id",
	validators.recipes.recipeID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.recipDetails,
);

// Add Recipe to Favorites
router.post(
	"/:id/favorites",
	validators.recipes.recipeID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.addRecipeFav,
);

// Buy Recipe
router.post(
	"/:id/buy",
	validators.recipes.recipeID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.buyRecipe,
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
