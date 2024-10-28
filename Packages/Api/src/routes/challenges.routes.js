const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get top challenges
router.get("/top", middlewares.validateTokens, controllers.challenges.topChallenges);

// Get Challenges Feed
router.get(
	"/",
	validators.challenges.getChallenges(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.challenges.getChallenges,
);

// Get One Challenge Details
router.get(
	"/:id",
	validators.challenges.challengeID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.challenges.challengeDetails,
);

module.exports = router;
