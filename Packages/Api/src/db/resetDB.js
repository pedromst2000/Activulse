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

        // 


		console.log(
			loggingPrefix + colors.green("Successfully populated the tables with data!\n"),
		);

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
