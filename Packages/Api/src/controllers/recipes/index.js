const recipDetails = require("../recipes/recipeDetails.controller");
const getRecipes = require("../recipes/getRecipes.controller");
const addRecipeFav = require("../recipes/AddRecipeFav.controller");
const deleteRecipeFav = require("../recipes/deleteRecipeFav.controller");

module.exports = {
	recipDetails,
	getRecipes,
	addRecipeFav,
	deleteRecipeFav,
};
