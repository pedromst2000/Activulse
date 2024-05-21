/**
 * @description Custom compression filter function
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {boolean}
 */

const shouldCompress = (req, res) => {
	// don't compress responses with this request header
	if (req.headers["x-no-compression"]) {
		return false;
	}

	// fallback to standard filter function
	return compression.filter(req, res);
};

/** @type {import("compression").CompressionOptions} */
const compressionConfig = {
	filter: shouldCompress,
	level: 9,
	memLevel: 8,
	chunkSize: 16 * 1024,
	strategy: 0,
	threshold: 0,
	flush: 2,
	windowBits: 15,
};

module.exports = compressionConfig;
