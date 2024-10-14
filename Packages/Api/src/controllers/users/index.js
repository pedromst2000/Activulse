const verifyUser = require("../users/verifyUser.controller");
const verifyConfirm = require("../users/verifyConfirm.controller");
const resendVerify = require("../users/resendVerify.controller");
const getUser = require("../users/getUser.controller");
const getUserBadges = require("../users/getUserBadges.controller");
// const updateUser = require("./updateUser.controller");
const assessmentHeartRisk = require("../users/assessmentHeartRisk.controller");
const extraAssessment = require("../users/extraAssessment.controller");

module.exports = {
	verifyUser,
	verifyConfirm,
	resendVerify,
	getUser,
	getUserBadges,
	// updateUser,
	assessmentHeartRisk,
	extraAssessment,
};
