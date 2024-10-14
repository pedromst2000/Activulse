const fs = require("fs");
const YAML = require("yaml");

const getFavoriteRecipes = YAML.parse(
	fs.readFileSync("./src/docs/routes/favorites/get_favorite_recipes.yml", "utf8"),
);

const getFavoriteActivities = YAML.parse(
	fs.readFileSync("./src/docs/routes/favorites/get_favorite_activities.yml", "utf8"),
);

module.exports = {
	getFavoriteRecipes,
	getFavoriteActivities,
};
