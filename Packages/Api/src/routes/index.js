const { Router } = require("express");
const utils = require("../utils");
const swaggerUi = require("swagger-ui-express");
const config = require("../config");
const cronjobRoutes = require("./cronjob.routes");

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


module.exports = router;
