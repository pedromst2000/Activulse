const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get top challenges
router.get("/top", middlewares.validateTokens, controllers.challenges.topChallenges);

module.exports = router;
