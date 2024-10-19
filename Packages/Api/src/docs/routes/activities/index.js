const fs = require("fs");
const YAML = require("yaml");

const getActivitiesDetails = YAML.parse(
	fs.readFileSync("./src/docs/routes/activities/get_activity_details.yml", "utf8"),
);

const getActivitiesFeed = YAML.parse(
	fs.readFileSync("./src/docs/routes/activities/get_activities_feed.yml", "utf8"),
);

const getStoreActivities = YAML.parse(
	fs.readFileSync("./src/docs/routes/activities/get_store_activities.yml", "utf8"),
);

const postAddActivityFav = YAML.parse(
	fs.readFileSync("./src/docs/routes/activities/post_add_activity_favorites.yml", "utf8"),
);

const postBuyActivity = YAML.parse(
	fs.readFileSync("./src/docs/routes/activities/post_buy_activity.yml", "utf8"),
);

const deleteActivityFav = YAML.parse(
	fs.readFileSync("./src/docs/routes/activities/delete_activity_favorites.yml", "utf8"),
);

module.exports = {
	getActivitiesDetails,
	getActivitiesFeed,
	getStoreActivities,
	postAddActivityFav,
	postBuyActivity,
	deleteActivityFav,
};
