const verifyUser = require("../users/verifyUser.controller");
const verifyConfirm = require("../users/verifyConfirm.controller");
const resendVerify = require("../users/resendVerify.controller");
const getUser = require("../users/getUser.controller");
// const updateUser = require("./updateUser.controller");
const assessmentHeartRisk = require("./assessmentHeartRisk.controller");

module.exports = {
	verifyUser,
	verifyConfirm,
	resendVerify,
	getUser,
	// updateUser,
	assessmentHeartRisk,
};
