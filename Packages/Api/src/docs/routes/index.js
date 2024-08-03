const fs = require("fs");
const YAML = require("yaml");
const cronjob = require("./cronjob");
const auth = require("./auth");

const getWelcomeApi = YAML.parse(
	fs.readFileSync("./src/docs/routes/default/get_welcome_api.yml", "utf8"),
);
const notFound = YAML.parse(
	fs.readFileSync("./src/docs/routes/default/not_found.yml", "utf8"),
);

module.exports = {
	default: { getWelcomeApi, notFound },
	cronjob,
	auth,
};
