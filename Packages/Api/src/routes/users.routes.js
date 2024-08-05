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
router.get(
	"/verify/:email",
	validators.users.verifyConfirm(),
	validators.validateResult,
	controllers.users.verifyConfirm,
);

module.exports = router;
