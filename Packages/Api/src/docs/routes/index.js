const fs = require("fs");
const YAML = require("yaml");
const cronjob = require("../routes/cronjob");
const auth = require("../routes/auth");
const users = require("../routes/users");
const recipes = require("../routes/recipes");
const activities = require("../routes/activities");
const favorites = require("../routes/favorites");

const getWelcomeApi = YAML.parse(
	fs.readFileSync("./src/docs/routes/default/get_welcome_api.yml", "utf8"),
);
const notFound = YAML.parse(
	fs.readFileSync("./src/docs/routes/default/not_found.yml", "utf8"),
);

module.exports = {
	default: { getWelcomeApi, notFound },
	cronjob,
	auth,
	users,
	recipes,
	activities,
	favorites,
};
