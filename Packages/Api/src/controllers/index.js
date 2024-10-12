const cronjob = require("../controllers/cronjob");
const auth = require("../controllers/auth");
const users = require("../controllers/users");
const recipes = require("../controllers/recipes");
const activities = require("../controllers/activities");
const favorites = require("../controllers/favorites");

module.exports = {
	cronjob,
	auth,
	users,
	recipes,
	activities,
	favorites,
};
