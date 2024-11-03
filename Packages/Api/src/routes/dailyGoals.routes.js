const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

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
