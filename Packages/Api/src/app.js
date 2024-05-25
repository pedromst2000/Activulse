const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const config = require("./config");
const rateLimiter = require("express-rate-limit");
const utils = require("./utils");
const routes = require("./routes");

const app = express(); // Create Express Application

// Apply Middlewares
app.use(helmet()); // Enable Helmet
app.use(cors()); // Enable CORS
app.use(rateLimiter(config.rateLimit)); // Enable Rate Limiter
app.use(compression(config.compression)); // Enable Compression
app.use(express.json({ limit: "15mb" })); // Enable JSON Parser with 15mb limit

// Enable Logging (development only)
if (process.env.NODE_ENV === "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

// Enable Routes
app.use("/api/v1", routes);

app.use(
	/**
	 * Handle 404
	 * @param {express.Request} _req
	 * @param {express.Response} res
	 */
	(_req, res) => {
		utils.handleResponse(res, utils.http.StatusNotFound, "Invalid route");
	},
);

module.exports = app;
