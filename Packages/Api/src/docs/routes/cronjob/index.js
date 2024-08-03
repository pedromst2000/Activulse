const fs = require("fs");
const YAML = require("yaml");

const deleteUnverifiedUsers = YAML.parse(
	fs.readFileSync("./src/docs/routes/cronjob/delete_unverified_users.yml", "utf8"),
);

module.exports = {
	deleteUnverifiedUsers,
};
