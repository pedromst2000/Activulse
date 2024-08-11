const login = require("./login.validator");
const register = require("./register.validator");
const requestResetPassword = require("./requestResetPassword.validator");
const verifyOTP = require("./verifyOTP.validator");
// const resetPassword = require("./resetPassword.validator");

module.exports = {
	login,
	register,
	requestResetPassword,
	verifyOTP,
	// resetPassword,
};
