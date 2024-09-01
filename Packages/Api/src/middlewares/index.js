const validateTokens = require("../middlewares/validateTokens.middleware");
const validateCronjob = require("../middlewares/validateCronjob.middleware");

module.exports = {
	validateTokens,
	validateCronjob,
};
