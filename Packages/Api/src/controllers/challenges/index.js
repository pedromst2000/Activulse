const topChallenges = require("./topChallenges.controller");
const getChallenges = require("./getChallenges.controller");
const challengeDetails = require("./challengeDetails.controller");
const startChallenge = require("./startChallenge.controller");
const claimReward = require("./claimReward.controller");

module.exports = {
	topChallenges,
	getChallenges,
	challengeDetails,
	startChallenge,
	claimReward,
};
