const colors = require("colors");
const loggingPrefix = colors.yellow("[db/reset/index.js] ");

if (process.env.NODE_ENV === "production") {
	console.error(
		loggingPrefix + colors.red("This script should not be ran on production!"),
	);
	process.exit(1);
}

require("dotenv").config();
const utils = require("../utils");

// Check if all the environment variables are set
console.log(loggingPrefix + colors.cyan("Checking the environment variables..."));
if (!utils.checkEnvs()) {
	process.exit(1);
}

console.log(loggingPrefix + colors.green("All the environment variables are set!\n"));

const db = require("./");
const dbData = require("../data/db");

(async () => {
	try {
		// Attempt to connect to the database
		console.log(loggingPrefix + colors.cyan("Attempting to connect to the database..."));

		await db.connect();

		console.log(
			loggingPrefix + colors.green("Successfully connected to the database!\n"),
		);

		// Force Sync all the models (create the tables and add the foreign keys)
		console.log(loggingPrefix + colors.cyan("Syncing models..."));

		await db.mysql.forceSync();

		console.log(loggingPrefix + colors.green("Successfully synced models!\n"));

		// Populate the tables with data
		console.log(loggingPrefix + colors.cyan("Populating the tables with data...\n"));

		console.log(loggingPrefix + colors.cyan("Inserting activities..."));

		// Activity Categories data
		await db.mysql.ActivityCategory.bulkCreate(dbData.activityCategory);
		console.log(
			loggingPrefix + colors.green("Successfully inserted activity categories!\n"),
		);

		// Activities data
		await db.mysql.Activity.bulkCreate(dbData.activities);
		console.log(loggingPrefix + colors.green("Successfully inserted activities!\n"));

		console.log(loggingPrefix + colors.cyan("Inserting activity categories..."));

		console.log(loggingPrefix + colors.cyan("Inserting badges..."));

		// Workouts data
		console.log(loggingPrefix + colors.cyan("Inserting workouts..."));

		await db.mysql.Workout.bulkCreate(dbData.workouts);
		console.log(loggingPrefix + colors.green("Successfully inserted workouts!\n"));

		// Badges data
		await db.mysql.Badge.bulkCreate(dbData.badges);
		console.log(loggingPrefix + colors.green("Successfully inserted badges!\n"));

		console.log(
			loggingPrefix + colors.green("Successfully populated the tables with data!\n"),
		);

		// Banners data
		console.log(loggingPrefix + colors.cyan("Inserting banners..."));

		await db.mysql.Banner.bulkCreate(dbData.banners);
		console.log(loggingPrefix + colors.green("Successfully inserted banners!\n"));

		// Diets data
		console.log(loggingPrefix + colors.cyan("Inserting diets..."));

		await db.mysql.Diet.bulkCreate(dbData.diets);
		console.log(loggingPrefix + colors.green("Successfully inserted diets!\n"));

		// Recipe Categories data
		console.log(loggingPrefix + colors.cyan("Inserting recipe categories..."));

		await db.mysql.RecipeCategory.bulkCreate(dbData.recipecategory);
		console.log(
			loggingPrefix + colors.green("Successfully inserted recipe categories!\n"),
		);

		// Recipes data
		console.log(loggingPrefix + colors.cyan("Inserting recipes..."));

		await db.mysql.Recipe.bulkCreate(dbData.recipes);
		console.log(loggingPrefix + colors.green("Successfully inserted recipes!\n"));

		// Ingredients data
		console.log(loggingPrefix + colors.cyan("Inserting ingredients..."));

		await db.mysql.Ingredient.bulkCreate(dbData.ingredients);
		console.log(loggingPrefix + colors.green("Successfully inserted ingredients!\n"));

		// Instructions data
		console.log(loggingPrefix + colors.cyan("Inserting instructions..."));

		await db.mysql.Instruction.bulkCreate(dbData.instructions);
		console.log(loggingPrefix + colors.green("Successfully inserted instructions!\n"));

		// Challenge Categories data
		console.log(loggingPrefix + colors.cyan("Inserting challenge categories..."));

		await db.mysql.ChallengeCategory.bulkCreate(dbData.challengeCategory);
		console.log(
			loggingPrefix + colors.green("Successfully inserted challenge categories!\n"),
		);

		// Challenges data
		console.log(loggingPrefix + colors.cyan("Inserting challenges..."));

		await db.mysql.Challenge.bulkCreate(dbData.challenges);
		console.log(loggingPrefix + colors.green("Successfully inserted challenges!\n"));

		// Disconnect from the database
		console.log(loggingPrefix + colors.cyan("Disconnecting from the database..."));

		await db.mysql.sequelize.close();

		console.log(
			loggingPrefix + colors.green("Successfully disconnected from the database!\n"),
		);

		console.log(loggingPrefix + colors.green("Successfully reset the database!"));

		process.exit(0);
	} catch (error) {
		console.error(
			loggingPrefix + colors.red("An error occurred while resetting the database!"),
		);
		console.error(loggingPrefix + colors.red(error));
		process.exit(1);
	}
})();
