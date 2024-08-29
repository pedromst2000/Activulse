const fs = require("fs");
const YAML = require("yaml");


const getRecipeDetails = YAML.parse(
    fs.readFileSync("./src/docs/routes/recipes/get_recipe_details.yml", "utf8"),
);  


module.exports = {
    getRecipeDetails,
};