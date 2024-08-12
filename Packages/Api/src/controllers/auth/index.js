const login = require("./login.controller");
const register = require("./register.controller");
const requestResetPassword = require("./requestResetPassword.controller");
const verifyOTP = require("./verifyOTP.controller");
const resetPassword = require("./resetPassword.controller");

module.exports = {
	login,
	register,
	requestResetPassword,
	verifyOTP,
	resetPassword,
};
