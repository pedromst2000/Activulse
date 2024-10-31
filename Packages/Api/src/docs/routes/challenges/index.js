const fs = require("fs");
const YAML = require("yaml");

const getTopChallenges = YAML.parse(
	fs.readFileSync("./src/docs/routes/challenges/get_top_challenges.yml", "utf8"),
);

const getChallengesFeed = YAML.parse(
	fs.readFileSync("./src/docs/routes/challenges/get_challenges_feed.yml", "utf8"),
);

const getChallengeDetails = YAML.parse(
	fs.readFileSync("./src/docs/routes/challenges/get_challenge_details.yml", "utf8"),
);

const postStartChallenge = YAML.parse(
	fs.readFileSync("./src/docs/routes/challenges/post_start_challenge.yml", "utf8"),
);

const postClaimReward = YAML.parse(
	fs.readFileSync("./src/docs/routes/challenges/post_claim_reward.yml", "utf8"),
);

module.exports = {
	getTopChallenges,
	getChallengesFeed,
	getChallengeDetails,
	postStartChallenge,
	postClaimReward,
};
