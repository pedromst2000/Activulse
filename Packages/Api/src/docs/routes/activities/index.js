const fs = require("fs");
const YAML = require("yaml");

const getActivitiesFeed = YAML.parse(
	fs.readFileSync("./src/docs/routes/activities/get_activities_feed.yml", "utf8"),
);

module.exports = { getActivitiesFeed };
