const compression = require("./compression.config");
const rateLimit = require("./rateLimit.config");
const tokens = require("./jwt.config");
const db = require("./db.config");
const docs = require("./docs.config");
const cloudinary = require("./cloudinary.config");
const pagination = require("./pagination.config");

module.exports = {
	compression,
	rateLimit,
	tokens,
	db,
	docs,
	cloudinary,
	pagination,
};
