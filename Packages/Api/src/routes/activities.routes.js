const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get Activities Feed
router.get(
	"/",
	validators.activities.getActivities(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.getActivities,
);

// Get Store Activities
router.get(
	"/store",
	validators.activities.getStoreActivities(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.getStoreActivities,
);

// Get One Activity Details
router.get(
	"/:id",
	validators.activities.activityID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.activityDetails,
);

// Add Activity to Favorites
router.post(
	"/:id/favorites",
	validators.activities.activityID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.addActivityFav,
);

// Buy Activity
router.post(
	"/:id/buy",
	validators.activities.activityID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.buyActivity,
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
