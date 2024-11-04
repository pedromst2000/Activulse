const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Claim Reward of completed daily goals by the logged user
router.post(
	"/claim-reward",
	middlewares.validateTokens,
	controllers.dailyGoals.claimRewardGoals,
);

// Chance Daily Goals
router.patch(
	"/",
	validators.users.ChanceGoals(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.dailyGoals.changeDailyGoals,
);

// Get authenticated user daily goals
router.get("/", middlewares.validateTokens, controllers.dailyGoals.getUserGoals);

module.exports = router;
