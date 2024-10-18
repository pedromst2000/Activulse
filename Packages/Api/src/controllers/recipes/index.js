const recipDetails = require("../recipes/recipeDetails.controller");
const getRecipes = require("../recipes/getRecipes.controller");
const getStoreRecipes = require("../recipes/getStoreRecipes.controller");
const addRecipeFav = require("../recipes/AddRecipeFav.controller");
const deleteRecipeFav = require("../recipes/deleteRecipeFav.controller");

module.exports = {
	recipDetails,
	getRecipes,
	getStoreRecipes,
	addRecipeFav,
	deleteRecipeFav,
};
