const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get One Recipe
router.get(
	"/:id",
	validators.recipes.recipeDetails(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.recipes.recipDetails,
);

module.exports = router;
