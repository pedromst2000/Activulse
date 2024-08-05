const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Login
router.post(
	"/login",
	validators.auth.login(),
	validators.validateResult,
	controllers.auth.login,
);

// Register
router.post(
	"/register",
	validators.auth.register(),
	validators.validateResult,
	controllers.auth.register,
);

module.exports = router;
