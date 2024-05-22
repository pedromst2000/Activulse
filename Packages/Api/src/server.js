// Load the environment variables from the .env file (development only)
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const colors = require("colors");
const utils = require("./utils");

const loggingPrefix = colors.yellow("[server.js] ");

// Clear the console
console.clear();

// Log the environment
console.log(
	loggingPrefix + colors.cyan("Environment: ") + colors.yellow(process.env.NODE_ENV),
);

// Check if all the environment variables are set
console.log(loggingPrefix + colors.cyan("Checking the environment variables..."));
if (!utils.checkEnvs()) {
	process.exit(1);
}

console.log(loggingPrefix + colors.green("All the environment variables are set!"));

const app = require("./app");

// Attempt to connect to the database
console.log(loggingPrefix + colors.cyan("Attempting to connect to the database..."));

const db = require("./db");

db.connect().then((isConnected) => {
	if (!isConnected) {
		process.exit(1);
	}

	console.log(loggingPrefix + colors.green("Successfully connected to the database!"));

	console.log(loggingPrefix + colors.cyan("Syncing all the models..."));

	db.mysql
		.alterSync()
		.then(() => {
			console.log(loggingPrefix + colors.green("Successfully synced all the models!"));

			// Start the server
			app.listen(process.env.PORT, () => {
				console.log(
					loggingPrefix +
						colors.cyan("Server is running on port: ") +
						colors.green(process.env.PORT + "\n"),
				);
			});
		})
		.catch((error) => {
			console.error(
				loggingPrefix + colors.red("An error occurred while syncing the models!"),
			);
			console.error(loggingPrefix + colors.red(error));
			process.exit(1);
		});
});
