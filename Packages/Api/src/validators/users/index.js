const verifyUser = require("../users/verifyUser.validator");
const verifyConfirm = require("../users/verifyConfirm.validator");
const resendVerify = require("../users/resendVerify.validator");
const getUser = require("../users/getUser.validator");
const getUserBadges = require("../users/getUserBadges.validator");
const assessmentHeartRisk = require("../users/assessmentHeartRisk.validator");
const extraAssessment = require("../users/extraAssessment.validator");
const ChanceGoals = require("../users/chanceGoals.validator");

module.exports = {
	verifyUser,
	verifyConfirm,
	resendVerify,
	getUser,
	getUserBadges,
	assessmentHeartRisk,
	extraAssessment,
	ChanceGoals,
};
