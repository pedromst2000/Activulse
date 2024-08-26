const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Verify User
router.patch(
	"/verify/:token",
	validators.users.verifyUser(),
	validators.validateResult,
	controllers.users.verifyUser,
);

// Verify Confirmation
router.post(
	"/verify",
	validators.users.verifyConfirm(),
	validators.validateResult,
	controllers.users.verifyConfirm,
);

// Resend Verification Email
router.post(
	"/resend-verify",
	validators.users.resendVerify(),
	validators.validateResult,
	controllers.users.resendVerify,
);

// Get Logged User data
router.get(
	"/:id",
	validators.users.getUser(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.users.getUser,
);

// Assessment Heart Risk
router.post(
	"/heart-risk-assessment",
	validators.users.assessmentHeartRisk(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.users.assessmentHeartRisk,
);

module.exports = router;
