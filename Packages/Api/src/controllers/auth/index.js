const login = require("./login.controller");
const register = require("./register.controller");
const requestResetPassword = require("./requestResetPassword.controller");
const verifyOTP = require("./verifyOTP.controller");

module.exports = {
	login,
	register,
	requestResetPassword,
	verifyOTP,
};
