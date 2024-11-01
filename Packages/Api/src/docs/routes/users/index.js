const fs = require("fs");
const YAML = require("yaml");

const patchVerifyUser = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/patch_verify_user.yml", "utf8"),
);

const postVerifyConfirm = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/post_verify_confirm.yml", "utf8"),
);

const postResendVerify = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/post_resend_verify.yml", "utf8"),
);

const getLoggedUser = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/get_logged_user.yml", "utf8"),
);

const getUserProfile = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/get_user_profile.yml", "utf8"),
);

const getUserBadges = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/get_user_badges.yml", "utf8"),
);

const getLeaderboard = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/get_leaderboard.yml", "utf8"),
);

const postRiskAssessment = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/post_risk_assessment.yml", "utf8"),
);

const patchExtraAssessment = YAML.parse(
	fs.readFileSync("./src/docs/routes/users/patch_extra_assessment.yml", "utf8"),
);

module.exports = {
	patchVerifyUser,
	postVerifyConfirm,
	postResendVerify,
	getLoggedUser,
	getUserProfile,
	getUserBadges,
	getLeaderboard,
	postRiskAssessment,
	patchExtraAssessment,
};
