const cloudinary = require("cloudinary");
const config = require("../config");

cloudinary.v2.config(config.cloudinary.options);

module.exports = cloudinary.v2;
