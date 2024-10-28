const recipeDetails = require("../recipes/recipeDetails.controller");
const getRecipes = require("../recipes/getRecipes.controller");
const getStoreRecipes = require("../recipes/getStoreRecipes.controller");
const addRecipeFav = require("../recipes/AddRecipeFav.controller");
const deleteRecipeFav = require("../recipes/deleteRecipeFav.controller");
const buyRecipe = require("../recipes/buyRecipe.controller");

module.exports = {
	recipeDetails,
	getRecipes,
	getStoreRecipes,
	addRecipeFav,
	deleteRecipeFav,
	buyRecipe,
};
