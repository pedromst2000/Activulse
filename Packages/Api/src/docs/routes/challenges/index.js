const fs = require("fs");
const YAML = require("yaml");

const getTopChallenges = YAML.parse(
	fs.readFileSync("./src/docs/routes/challenges/get_top_challenges.yml", "utf8"),
);

module.exports = {
	getTopChallenges,
};
