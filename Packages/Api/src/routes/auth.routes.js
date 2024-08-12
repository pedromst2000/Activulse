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
	"/users/request-reset-password",
	validators.auth.requestResetPassword(),
	validators.validateResult,
	controllers.auth.requestResetPassword,
);

// Verify OTP for reset password
router.post(
	"/users/verify-OTP/:email",
	validators.auth.verifyOTP(),
	validators.validateResult,
	controllers.auth.verifyOTP,
);

// Reset Password
router.patch(
	"/users/reset-password/:email",
	validators.auth.resetPassword(),
	validators.validateResult,
	controllers.auth.resetPassword,
);

module.exports = router;
