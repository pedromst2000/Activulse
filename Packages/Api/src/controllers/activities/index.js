const activityDetails = require("../activities/activityDetails.controller");
const getActivities = require("../activities/getActivities.controller");
const addActivityFav = require("../activities/addActivityFav.controller");
const deleteActivityFav = require("../activities/deleteActivityFav.controller");

module.exports = {
	activityDetails,
	getActivities,
	addActivityFav,
	deleteActivityFav,
};
