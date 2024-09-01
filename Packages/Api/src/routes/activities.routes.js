const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get One Activity
router.get(
	"/:id",
	validators.activities.activityDetails(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.activities.activityDetails,
);

module.exports = router;
