const fs = require("fs");
const YAML = require("yaml");

const patchVerifyUser = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/patch_verify_user.yml", "utf8"),
);

const getVerifyConfirm = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/get_verify_confirm.yml", "utf8"),
);

const postResendVerify = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/post_resend_verify.yml", "utf8"),
);

module.exports = {
	patchVerifyUser,
	getVerifyConfirm,
	postResendVerify,
};
