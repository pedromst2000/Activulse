// Name of the folder for image upload
const folderName = `activulse/${process.env.NODE_ENV === "production" ? "prod" : "dev"}`;

/** @type {import("cloudinary").ConfigOptions} */
const options = {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
};

module.exports = { folderName, options };
