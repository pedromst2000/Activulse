const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");

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

// Request reset password
router.post(
	"/request-reset-password",
	validators.auth.requestResetPassword(),
	validators.validateResult,
	controllers.auth.requestResetPassword,
);

module.exports = router;
