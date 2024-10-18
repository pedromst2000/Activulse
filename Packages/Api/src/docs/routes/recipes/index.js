const fs = require("fs");
const YAML = require("yaml");

const getRecipeDetails = YAML.parse(
	fs.readFileSync("./src/docs/routes/recipes/get_recipe_details.yml", "utf8"),
);

const getRecipesFeed = YAML.parse(
	fs.readFileSync("./src/docs/routes/recipes/get_recipes_feed.yml", "utf8"),
);

const getStoreRecipes = YAML.parse(
	fs.readFileSync("./src/docs/routes/recipes/get_store_recipes.yml", "utf8"),
);

const postAddRecipeFavorites = YAML.parse(
	fs.readFileSync("./src/docs/routes/recipes/post_add_recipe_favorites.yml", "utf8"),
);

const postBuyRecipe = YAML.parse(
	fs.readFileSync("./src/docs/routes/recipes/post_buy_recipe.yml", "utf8"),
);

const deleteRecipeFavorites = YAML.parse(
	fs.readFileSync("./src/docs/routes/recipes/delete_recipe_favorites.yml", "utf8"),
);

module.exports = {
	getRecipeDetails,
	getRecipesFeed,
	getStoreRecipes,
	postAddRecipeFavorites,
	postBuyRecipe,
	deleteRecipeFavorites,
};
