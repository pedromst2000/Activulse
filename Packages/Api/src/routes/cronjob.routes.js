const { Router } = require("express");
const middlewares = require("../middlewares");
const controllers = require("../controllers");


const router = Router();

// Delete all unverified users
router.delete(
	"/unverified-users",
	middlewares.validateCronjob,
	controllers.cronjob.deleteUnverifiedUsers,
);

module.exports = router;
