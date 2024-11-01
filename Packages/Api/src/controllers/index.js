const cronjob = require("../controllers/cronjob");
const auth = require("../controllers/auth");
const users = require("../controllers/users");
const recipes = require("../controllers/recipes");
const activities = require("../controllers/activities");
const favorites = require("../controllers/favorites");
const banners = require("../controllers/banners");
const challenges = require("../controllers/challenges");
const dailyGoals = require("../controllers/dailyGoals");

module.exports = {
	cronjob,
	auth,
	users,
	recipes,
	activities,
	favorites,
	banners,
	challenges,
	dailyGoals,
};
