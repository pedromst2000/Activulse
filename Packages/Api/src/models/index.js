const { Sequelize } = require("sequelize");

/**
 * Initialize the models and their associations
 * @param {Sequelize} sequelize - Sequelize instance
 */

function init(sequelize) {
	// all models files
	const Avatar = require("../models/avatar.model")(sequelize);
	const Activity = require("../models/activity.model")(sequelize);
	const ActivityCategory = require("../models/activityCategory.model")(sequelize);
	const Badge = require("../models/badge.model")(sequelize);
	const Banner = require("../models/banner.model")(sequelize);
	const Buyer = require("../models/buyer.model")(sequelize);
	const Challenge = require("../models/challenge.model")(sequelize);
	const ChallengeCategory = require("../models/challengeCategory.model")(sequelize);
	const ChallengeProgress = require("../models/challengeProgress.model")(sequelize);
	const DailyGoals = require("../models/dailyGoals.model")(sequelize);
	const Diet = require("../models/diet.model")(sequelize);
	const Favorite = require("../models/favorite.model")(sequelize);
	const Ingredient = require("../models/ingredient.model")(sequelize);
	const Instruction = require("../models/instruction.model")(sequelize);
	const Asset = require("../models/asset.model")(sequelize);
	const Recipe = require("../models/recipe.model")(sequelize);
	const RecipeCategory = require("../models/recipeCategory.model")(sequelize);
	const RiskScore = require("../models/riskScore.model")(sequelize);
	const User = require("../models/user.model")(sequelize);
	const UserActivity = require("./UserActivity.model")(sequelize);
	const UserBadge = require("../models/userBadge.model")(sequelize);
	const UserAvatar = require("../models/userAvatar.model")(sequelize);
	const Workout = require("../models/workout.model")(sequelize);

	//* Associations / Relationships

	// User
	// User - daily goals =>  1:N N:1
	User.hasMany(DailyGoals, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	DailyGoals.belongsTo(User, {
		foreignKey: "user_id",
	});

	// User - user activity =>  1:1 1:1
	User.hasOne(UserActivity, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	UserActivity.belongsTo(User, {
		foreignKey: "user_id",
	});

	// User - Risk Score  =>  1:1 1:1
	User.hasOne(RiskScore, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	RiskScore.belongsTo(User, {
		foreignKey: "user_id",
	});

	// Diet - User => 1:N N:1
	Diet.hasMany(User, {
		foreignKey: "diet_id",
		onDelete: "CASCADE",
	});
	User.belongsTo(Diet, {
		foreignKey: "diet_id",
	});

	// User - User Badge => 1:N N:1
	User.hasMany(UserBadge, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});

	UserBadge.belongsTo(User, {
		foreignKey: "user_id",
	});

	// User - User Avatar => 1:N N:1
	User.hasMany(UserAvatar, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});

	UserAvatar.belongsTo(User, {
		foreignKey: "user_id",
	});

	// User - Favorite  => 1:N N:1
	User.hasMany(Favorite, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	Favorite.belongsTo(User, {
		foreignKey: "user_id",
	});

	// User - Buyer => 1:N N:1
	User.hasMany(Buyer, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});

	Buyer.belongsTo(User, {
		foreignKey: "user_id",
	});

	// Banner - Buyer => 1:N N:1
	Banner.hasMany(Buyer, {
		foreignKey: "banner_id",
		onDelete: "CASCADE",
	});

	Buyer.belongsTo(Banner, {
		foreignKey: "banner_id",
	});

	// Recipe - Buyer => 1:N N:1
	Recipe.hasMany(Buyer, {
		foreignKey: "recipe_id",
		onDelete: "CASCADE",
	});

	Buyer.belongsTo(Recipe, {
		foreignKey: "recipe_id",
	});

	// Activity - Buyer => 1:N N:1
	Activity.hasMany(Buyer, {
		foreignKey: "activity_id",
		onDelete: "CASCADE",
	});

	Buyer.belongsTo(Activity, {
		foreignKey: "activity_id",
	});

	// User - Challenge Progress => 1:N  N:1
	User.hasMany(ChallengeProgress, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	ChallengeProgress.belongsTo(User, {
		foreignKey: "user_id",
	});
	// ------------------------------------------------------
	// Favorite
	// Favorite - Recipe => 1:N N:1
	Favorite.belongsTo(Recipe, {
		foreignKey: "recipe_id",
		onDelete: "CASCADE",
	});
	Recipe.hasMany(Favorite, {
		foreignKey: "recipe_id",
	});

	// Favorite - Activity => 1:N N:1
	Favorite.belongsTo(Activity, {
		foreignKey: "activity_id",
		onDelete: "CASCADE",
	});
	Activity.hasMany(Favorite, {
		foreignKey: "activity_id",
	});

	// ------------------------------------------------------
	// Badge
	// Badge - User Badge => 1:N N:1
	Badge.hasMany(UserBadge, {
		foreignKey: "badge_id",
		onDelete: "CASCADE",
	});
	UserBadge.belongsTo(Badge, {
		foreignKey: "badge_id",
	});
	// ------------------------------------------------------
	// Recipe
	// Recipe - Instruction => 1:N N:1
	Recipe.hasMany(Instruction, {
		foreignKey: "recipe_id",
		onDelete: "CASCADE",
	});
	Instruction.belongsTo(Recipe, {
		foreignKey: "recipe_id",
	});
	// Recipe - Ingredient => 1:N N:1
	Recipe.hasMany(Ingredient, {
		foreignKey: "recipe_id",
		onDelete: "CASCADE",
	});
	Ingredient.belongsTo(Recipe, {
		foreignKey: "recipe_id",
	});
	// Diet - Recipe => 1:N N:1
	Diet.hasMany(Recipe, {
		foreignKey: "diet_id",
		onDelete: "CASCADE",
	});
	Recipe.belongsTo(Diet, {
		foreignKey: "diet_id",
	});

	// Recipe - Recipe Category => N:1 1:N
	Recipe.belongsTo(RecipeCategory, {
		foreignKey: "category_id",
		onDelete: "CASCADE",
	});
	RecipeCategory.hasMany(Recipe, {
		foreignKey: "category_id",
	});
	// ------------------------------------------------------
	// Challenge
	// Challenge - Challenge Category => N:1 1:N
	Challenge.belongsTo(ChallengeCategory, {
		foreignKey: "category_id",
		onDelete: "CASCADE",
	});
	ChallengeCategory.hasMany(Challenge, {
		foreignKey: "category_id",
	});
	// Challenge - Challenge Progress => 1:N N:1
	Challenge.hasMany(ChallengeProgress, {
		foreignKey: "challenge_id",
		onDelete: "CASCADE",
	});
	ChallengeProgress.belongsTo(Challenge, {
		foreignKey: "challenge_id",
	});
	// ------------------------------------------------------
	// Activity
	// Activity - Activity Category => N:1 1:N
	Activity.belongsTo(ActivityCategory, {
		foreignKey: "category_id",
		onDelete: "CASCADE",
	});
	ActivityCategory.hasMany(Activity, {
		foreignKey: "category_id",
	});
	// Activity - Workout => 1:N N:1
	Activity.hasMany(Workout, {
		foreignKey: "activity_id",
		onDelete: "CASCADE",
	});
	Workout.belongsTo(Activity, {
		foreignKey: "activity_id",
	});

	// ------------------------------------------------------
	// Asset
	// Asset - Challenge => 1:1 1:1
	Asset.belongsTo(Challenge, {
		foreignKey: "challenge_id",
		onDelete: "CASCADE",
	});
	Challenge.hasOne(Asset, {
		foreignKey: "challenge_id",
	});

	// Asset - Recipe => 1:1 1:1
	Asset.belongsTo(Recipe, {
		foreignKey: "recipe_id",
		onDelete: "CASCADE",
	});
	Recipe.hasOne(Asset, {
		foreignKey: "recipe_id",
	});

	// Asset - Activity => 1:1 1:1
	Asset.belongsTo(Activity, {
		foreignKey: "activity_id",
		onDelete: "CASCADE",
	});
	Activity.hasOne(Asset, {
		foreignKey: "activity_id",
	});

	// Asset - Banner => 1:1 1:1
	Asset.belongsTo(Banner, {
		foreignKey: "banner_id",
		onDelete: "CASCADE",
	});
	Banner.hasOne(Asset, {
		foreignKey: "banner_id",
	});

	// Asset - Badge => 1:1 1:1
	Asset.belongsTo(Badge, {
		foreignKey: "badge_id",
		onDelete: "CASCADE",
	});
	Badge.hasOne(Asset, {
		foreignKey: "badge_id",
	});

	// Asset - Avatar => 1:1 1:1
	Asset.belongsTo(Avatar, {
		foreignKey: "avatar_id",
		onDelete: "CASCADE",
	});

	Avatar.hasOne(Asset, {
		foreignKey: "avatar_id",
	});

	// ------------------------------------------------------

	// User - banner => *FK selected_banner_ID
	User.belongsTo(Banner, {
		foreignKey: "selected_banner_ID",
		onDelete: "CASCADE",
	});

	Banner.hasMany(User, {
		foreignKey: "selected_banner_ID",
	});

	// User Avatar - User => 1:N N:1
	UserAvatar.belongsTo(User, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});

	User.hasMany(UserAvatar, {
		foreignKey: "user_id",
	});

	// User avatar - avatar => 1:N N:1
	UserAvatar.belongsTo(Avatar, {
		foreignKey: "avatar_id",
		onDelete: "CASCADE",
	});

	Avatar.hasMany(UserAvatar, {
		foreignKey: "avatar_id",
	});

	return {
		User,
		DailyGoals,
		RiskScore,
		Diet,
		UserActivity,
		UserBadge,
		UserAvatar,
		Favorite,
		Buyer,
		ChallengeProgress,
		Challenge,
		ChallengeCategory,
		Recipe,
		RecipeCategory,
		Ingredient,
		Instruction,
		Avatar,
		Activity,
		ActivityCategory,
		Workout,
		Asset,
		Banner,
		Badge,
	};
}

module.exports = { init };
