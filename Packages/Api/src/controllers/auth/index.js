const login = require("../auth/login.controller");
const register = require("../auth/register.controller");
const requestResetPassword = require("../auth/requestResetPassword.controller");
const verifyOTP = require("../auth/verifyOTP.controller");
const resetPassword = require("../auth/resetPassword.controller");

module.exports = {
	login,
	register,
	requestResetPassword,
	verifyOTP,
	resetPassword,
};
