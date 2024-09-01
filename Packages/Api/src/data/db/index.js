const activities = require("../db/activities");
const activityCategory = require("../db/activityCategory");
const badges = require("../db/badges");
const avatars = require("../db/avatars");
const banners = require("../db/banners");
const diets = require("../db/diets");
const ingredients = require("../db/ingredients");
const instructions = require("../db/instructions");
const recipecategory = require("../db/recipecategory");
const recipes = require("../db/recipes");
const workouts = require("../db/workouts");
const challengeCategory = require("../db/challengeCategory");
const challengeProgress = require("../db/challengeProgress");
const challenges = require("../db/challenges");
const assets = require("../db/assets");
const users = require("../db/users");
const userAvatar = require("../db/userAvatar");
const userBadge = require("../db/userBadge");
const userActivity = require("../db/userActivity");
const buyers = require("../db/buyers");
const dailyGoals = require("../db/dailyGoals");
const favorites = require("../db/favorites");
const riskScores = require("../db/riskScores");

module.exports = {
	activities,
	activityCategory,
	badges,
	banners,
	avatars,
	diets,
	ingredients,
	instructions,
	recipecategory,
	recipes,
	workouts,
	challengeCategory,
	challengeProgress,
	challenges,
	assets,
	users,
	userAvatar,
	userBadge,
	userActivity,
	buyers,
	dailyGoals,
	favorites,
	riskScores,
};
