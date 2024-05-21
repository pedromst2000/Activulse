const colors = require("colors");
const http = require("./http.utils");
const handleResponse = require("./handleResponse.utils");

/**
 * Handles a internal server error.
 * @param {import("express").Response} response - The Express Response object.
 * @param {Error} error - The error object.
 * @param {string} fileAbsolutePath - The absolute path of the file where the error occurred.
 */
const handleError = (response, error, fileAbsolutePath) => {
	// Send the response with a 500 status code
	handleResponse(response, http.StatusInternalServerError, "Something went wrong!");

	// Get the file path (relative to the src folder)
	const filePath = fileAbsolutePath.split("/src/").at(-1);

	console.log(
		colors.yellow(`[${filePath}] `) + colors.red("Error: ") + colors.yellow(error.name),
	);
	console.log(
		colors.yellow(`[${filePath}] `) +
			colors.red("Message: ") +
			colors.yellow(error.message),
	);
};

module.exports = handleError;
