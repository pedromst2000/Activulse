const verifyUser = require("./verifyUser.validator");
const verifyConfirm = require("./verifyConfirm.validator");
const resendVerify = require("./resendVerify.validator");
const getUser = require("./getUser.validator");
const assessmentHeartRisk = require("./assessmentHeartRisk.validator");
const extraAssessment = require("./extraAssessment.validator");

module.exports = {
	verifyUser,
	verifyConfirm,
	resendVerify,
	getUser,
	assessmentHeartRisk,
	extraAssessment,
};
