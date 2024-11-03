const fs = require("fs");
const YAML = require("yaml");

const getUserDailyGoals = YAML.parse(
	fs.readFileSync("./src/docs/routes/dailyGoals/get_user_daily_goals.yml", "utf8"),
);

const patchChangeDailyGoals = YAML.parse(
	fs.readFileSync("./src/docs/routes/dailyGoals/patch_change_daily_goals.yml", "utf8"),
);

module.exports = {
	getUserDailyGoals,
	patchChangeDailyGoals,
};
