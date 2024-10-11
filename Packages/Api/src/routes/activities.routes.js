const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get One Activity Details
router.get(
	"/:id",
	validators.activities.activityID(),
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

// Add Activity to Favorites
router.post(
	"/:id/favorites",
	validators.activities.activityID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.addActivityFav,
);

// Delete Activity from Favorites
router.delete(
	"/:id/favorites",
	validators.activities.activityID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.deleteActivityFav,
);

module.exports = router;
