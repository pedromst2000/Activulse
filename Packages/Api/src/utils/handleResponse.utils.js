/**
 * Handle the response and send it
 * @param {import("express").Response} response - The Express Response object
 * @param {string} status - The status of the response "success" or "error"
 * @param {number} statusCode - The status code of the response
 * @param {string} message - The message of the response
 * @param {object?} data - The data of the response
 * @returns {void}
 */
const handleResponse = (response, statusCode, message, data) => {
	response.status(statusCode).json({
		success: !!(statusCode >= 200 && statusCode <= 299),
		message,
		...(data && { data }), // If the data is undefined, then don't send it
	});
};

module.exports = handleResponse;
