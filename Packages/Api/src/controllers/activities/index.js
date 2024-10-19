const activityDetails = require("../activities/activityDetails.controller");
const getActivities = require("../activities/getActivities.controller");
const getStoreActivities = require("../activities/getStoreActivities.controller");
const addActivityFav = require("../activities/addActivityFav.controller");
const deleteActivityFav = require("../activities/deleteActivityFav.controller");
const buyActivity = require("../activities/buyActivity.controller");

module.exports = {
	activityDetails,
	getActivities,
	getStoreActivities,
	addActivityFav,
	deleteActivityFav,
	buyActivity,
};
