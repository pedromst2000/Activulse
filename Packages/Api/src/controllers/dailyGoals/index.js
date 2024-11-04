const changeDailyGoals = require("../dailyGoals/changeGoals.controller");
const getUserGoals = require("../dailyGoals/getUserGoals.controller");
const claimRewardGoals = require("../dailyGoals/claimGoalsReward.controller");

module.exports = {
	changeDailyGoals,
	getUserGoals,
	claimRewardGoals,
};
