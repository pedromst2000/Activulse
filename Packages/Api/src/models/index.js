const { Sequelize } = require("sequelize");

/**
 * Initialize the models and their associations
 * @param {Sequelize} sequelize - Sequelize instance
 */

function init(sequelize) {
	// all models files
	const Activity = require("./activity.model")(sequelize);
	const ActivityCategory = require("./activityCategory.model")(sequelize);
	const Badge = require("./badge.model")(sequelize);
	const Banner = require("./banner.model")(sequelize);
	const Buyer = require("./buyer.model")(sequelize);
	const Challenge = require("./challenge.model")(sequelize);
	const ChallengeCategory = require("./challengeCategory.model")(sequelize);
	const ChallengeProgress = require("./challengeProgress.model")(sequelize);
	const DailyGoals = require("./dailyGoals.model")(sequelize);
	const Diet = require("./diet.model")(sequelize);
	const Favorite = require("./favorite.model")(sequelize);
	const Ingredient = require("./ingredient.model")(sequelize);
	const Instruction = require("./instruction.model")(sequelize);
	const Picture = require("./picture.model")(sequelize);
	const Recipe = require("./recipe.model")(sequelize);
	const RecipeCategory = require("./recipeCategory.model")(sequelize);
	const RiskScore = require("./riskScore.model")(sequelize);
	const User = require("./user.model")(sequelize);
	const UserActivity = require("./userActivity.model")(sequelize);
	const UserBadge = require("./userBadge.model")(sequelize);
	const Workout = require("./workout.model")(sequelize);

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

	// User - Diet => N:1 1:N
	User.hasMany(Diet, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	Diet.belongsTo(User, {
		foreignKey: "user_id",
	});

	// User - User Badge => N:N N:N
	User.belongsToMany(Badge, {
		through: UserBadge,
		foreignKey: "user_id",
		otherKey: "badge_id",
	});
	Badge.belongsToMany(User, {
		through: UserBadge,
		foreignKey: "badge_id",
		otherKey: "user_id",
	});

	// User - Favorite  => 1:N N:1
	User.hasMany(Favorite, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	Favorite.belongsTo(User, {
		foreignKey: "user_id",
	});

	// User - Buyer  => 1:N N:1
	User.hasMany(Buyer, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	Buyer.belongsTo(User, {
		foreignKey: "user_id",
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
	// Recipe - Diet => N:1 1:N
	Recipe.hasMany(Diet, {
		foreignKey: "recipe_id",
		onDelete: "CASCADE",
	});
	Diet.belongsTo(Recipe, {
		foreignKey: "recipe_id",
	});
	// Recipe - Buyer => N:N N:N
	Recipe.belongsToMany(Buyer, {
		foreignKey: "recipe_id",
		otherKey: "buyer_id",
		through: Buyer,
	});
	Buyer.belongsToMany(Recipe, {
		foreignKey: "buyer_id",
		otherKey: "recipe_id",
		through: Buyer,
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
	// Activity - Buyer => N:N N:N
	Activity.belongsToMany(Buyer, {
		foreignKey: "activity_id",
		otherKey: "buyer_id",
		through: Buyer,
	});
	Buyer.belongsToMany(Activity, {
		foreignKey: "buyer_id",
		otherKey: "activity_id",
		through: Buyer,
	});
	// ------------------------------------------------------
	// Picture
	// Picture - Challenge => 1:1 1:1
	Picture.belongsTo(Challenge, {
		foreignKey: "challenge_id",
		onDelete: "CASCADE",
	});
	Challenge.hasOne(Picture, {
		foreignKey: "challenge_id",
	});

	// Picture - Recipe => 1:1 1:1
	Picture.belongsTo(Recipe, {
		foreignKey: "recipe_id",
		onDelete: "CASCADE",
	});
	Recipe.hasOne(Picture, {
		foreignKey: "recipe_id",
	});

	// Picture - Activity => 1:1 1:1
	Picture.belongsTo(Activity, {
		foreignKey: "activity_id",
		onDelete: "CASCADE",
	});
	Activity.hasOne(Picture, {
		foreignKey: "activity_id",
	});

	// Picture - Banner => 1:1 1:1
	Picture.belongsTo(Banner, {
		foreignKey: "banner_id",
		onDelete: "CASCADE",
	});
	Banner.hasOne(Picture, {
		foreignKey: "banner_id",
	});

	// Picture - Diet => 1:1 1:1
    Picture.belongsTo(Diet, {
        foreignKey: "diet_id",
        onDelete: "CASCADE",
    });
    Diet.hasOne(Picture, {
        foreignKey: "diet_id",
    });


	// Picture - User => 1:1 1:1
	Picture.belongsTo(User, {
		foreignKey: "user_id",
		onDelete: "CASCADE",
	});
	User.hasOne(Picture, {
		foreignKey: "user_id",
	});

	// Picture - Badge => 1:1 1:1
	Picture.belongsTo(Badge, {
		foreignKey: "badge_id",
		onDelete: "CASCADE",
	});
	Badge.hasOne(Picture, {
		foreignKey: "badge_id",
	});
	// ------------------------------------------------------
	// Buyer
	// Buyer - Banner => N:N N:N
	Buyer.belongsToMany(Banner, {
		foreignKey: "buyer_id",
		otherKey: "banner_id",
		through: Buyer,
	});
	Banner.belongsToMany(Buyer, {
		foreignKey: "banner_id",
		otherKey: "buyer_id",
		through: Buyer,
	});

	return {
		User,
		DailyGoals,
		RiskScore,
		Diet,
		UserActivity,
		UserBadge,
		Favorite,
		Buyer,
		ChallengeProgress,
		Challenge,
		ChallengeCategory,
		Recipe,
		RecipeCategory,
		Ingredient,
		Instruction,
		Activity,
		ActivityCategory,
		Workout,
		Picture,
		Banner,
		Badge,
	};
}

module.exports = { init };
