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

module.exports = router;
