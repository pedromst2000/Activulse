const fs = require("fs");
const YAML = require("yaml");

const patchChangeDailyGoals = YAML.parse(
	fs.readFileSync("./src/docs/routes/dailyGoals/patch_change_daily_goals.yml", "utf8"),
);

module.exports = {
	patchChangeDailyGoals,
};
