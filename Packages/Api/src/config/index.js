const compression = require("../config/compression.config");
const rateLimit = require("../config/rateLimit.config");
const tokens = require("../config/jwt.config");
const db = require("../config/db.config");
const docs = require("../config/docs.config");
const cloudinary = require("../config/cloudinary.config");
const pagination = require("../config/pagination.config");

module.exports = {
	compression,
	rateLimit,
	tokens,
	db,
	docs,
	cloudinary,
	pagination,
};
