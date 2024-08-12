const fs = require("fs");
const YAML = require("yaml");

const postRegister = YAML.parse(
	fs.readFileSync("./src/docs/routes/auth/post_register.yml", "utf8"),
);

const postLogin = YAML.parse(
	fs.readFileSync("./src/docs/routes/auth/post_login.yml", "utf8"),
);

const postRequestResetPassword = YAML.parse(
	fs.readFileSync("./src/docs/routes/auth/post_request_reset_password.yml", "utf8"),
);

const postVerifyOTP = YAML.parse(
	fs.readFileSync("./src/docs/routes/auth/post_verify_otp.yml", "utf8"),
);

const patchResetPassword = YAML.parse(
	fs.readFileSync("./src/docs/routes/auth/patch_reset_password.yml", "utf8"),
);

module.exports = {
	postRegister,
	postLogin,
	postRequestResetPassword,
	postVerifyOTP,
	patchResetPassword,
};
