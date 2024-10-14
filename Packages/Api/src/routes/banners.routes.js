const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get the Banners from the store.
router.get("/store", middlewares.validateTokens, controllers.banners.getStoreBanners);

module.exports = router;
