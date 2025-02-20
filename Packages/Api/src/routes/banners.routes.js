const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get the Banners from the store.
router.get(
	"/store",
	validators.banners.getStoreBanners(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.banners.getStoreBanners,
);

// Buy a Banner.
router.post(
	"/:id/buy",
	validators.banners.bannerID(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.banners.buyBanner,
);

module.exports = router;
