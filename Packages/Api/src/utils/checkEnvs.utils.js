const colors = require("colors");
const VALID_ENVS = require("../data/envs.json");
const process = require("process");

/**
 * Check if all the required environment variables are set
 * @returns {boolean} true if all the required environment variables are set, false otherwise
 */
const checkEnvs = () => {
	const missingEnvs = VALID_ENVS.filter((env) => !process.env[env]);
	if (missingEnvs.length) {
		console.log(
			colors.yellow("\n[checkEnvs.js] ") +
				colors.red("Missing environment variables: ") +
				colors.yellow(missingEnvs.join(", ")),
		);
		return false;
	}
	return true;
};

module.exports = checkEnvs;
