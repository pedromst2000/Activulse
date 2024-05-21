const colors = require("colors");
const mysql = require("./mysql");

/**
 * Connects to the mysql database.
 * @async
 * @function connect
 * @returns {Promise<boolean>} Whether the connection was successful.
 */
async function connect() {
	try {
		await Promise.all([mysql.sequelize.authenticate()]);

		return true;
	} catch (error) {
		console.log(
			colors.red("Unable to connect to the database: ") +
				colors.yellow(error.message + "\n"),
		);

		return false;
	}
}

module.exports = { mysql, connect };
