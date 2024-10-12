const { Router } = require("express");
const utils = require("../utils");
const swaggerUi = require("swagger-ui-express");
const config = require("../config");
const cronjobRoutes = require("../routes/cronjob.routes");
const authRoutes = require("../routes/auth.routes");
const userRoutes = require("../routes/users.routes");
const recipesRoutes = require("../routes/recipes.routes");
const activitiesRoutes = require("../routes/activities.routes");
const favoritesRoutes = require("../routes/favorites.routes");

const router = Router();

// Swagger Docs Route
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(config.docs, { explorer: true }));

// Default Route
router.route("/").get((_req, res) => {
	utils.handleResponse(res, utils.http.StatusOK, "Welcome to the Activulse API !");
});

// Cronjob Routes
router.use("/cronjob", cronjobRoutes);

// Auth Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/users", userRoutes);

// Recipes Routes
router.use("/recipes", recipesRoutes);

// Activities Routes
router.use("/activities", activitiesRoutes);

// Favorites Routes
router.use("/favorites", favoritesRoutes);

module.exports = router;
