const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get One Activity Details
router.get(
	"/:id",
	validators.activities.activityDetails(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.activityDetails,
);

// Get Activities Feed
router.get(
	"/",
	validators.activities.getActivities(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.getActivities,
);

module.exports = router;
