const login = require("../auth/login.validator");
const register = require("../auth/register.validator");
const requestResetPassword = require("../auth/requestResetPassword.validator");
const verifyOTP = require("../auth/verifyOTP.validator");
const resetPassword = require("../auth/resetPassword.validator");

module.exports = {
	login,
	register,
	requestResetPassword,
	verifyOTP,
	resetPassword,
};
