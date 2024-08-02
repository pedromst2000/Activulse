const validateTokens = require("./validateTokens.middleware");
const validateCronjob = require("./validateCronjob.middleware");

module.exports = {
	validateTokens,
	validateCronjob,
};
