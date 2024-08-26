const db = require("../../db");
const utils = require("../../utils");

/**
* @typedef AssessmentHeartRiskRequest
* @property {string} gender - The gender of the account holder 
* @property {number} age - The age of the account holder
* @property {boolean} smoker - The smoking status of the account holder
* @property {boolean} diabetes - The diabetes status of the account holder
* @property {boolean} treatment_for_hypertension - The hypertension status of the account holder
* @property {number} systolic_blood_pressure - The systolic blood pressure of the account holder
* @property {number} HDL_cholesterol - The HDL cholesterol of the account holder
* @property {number} total_cholesterol - The total cholesterol of the account holder

*/

/**
 * heart risk assessment controller
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function assessmentHeartRisk(req, res) {
	try {
		/** @type {AssessmentHeartRiskRequest} */
		const {
			gender,
			age,
			smoker,
			diabetes,
			treatment_for_hypertension,
			systolic_blood_pressure,
			HDL_cholesterol,
			total_cholesterol,
		} = req.body;

		const loggedUserId = req.userId;

		const user = await db.mysql.User.findOne({
			where: {
				user_ID: loggedUserId,
			},
		});

		const havesRiskScore = await db.mysql.RiskScore.findOne({
			where: {
				user_id: loggedUserId,
			},
		});

		// Checking if the user is registered
		if (!user) {
			utils.handleResponse(res, utils.http.StatusForbidden, "You are not registered!");
			return;
		}

		if (user && user.is_verified === false) {
			utils.handleResponse(res, utils.http.StatusForbidden, "You are not verified!");
			return;
		} else if (havesRiskScore) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"You have already done the assessment risk!",
				{
					riskScore: havesRiskScore.score,
					typeRisk: havesRiskScore.typeRisk,
				},
			);
			return;
		} else if (!havesRiskScore) {
			const assessmentRisk = utils.CVDriskScore(
				gender,
				age,
				smoker,
				diabetes,
				treatment_for_hypertension,
				systolic_blood_pressure,
				HDL_cholesterol,
				total_cholesterol,
			);

			await db.mysql.User.update(
				{
					gender: gender,
					age: age,
					is_smoker: smoker == true ? 1 : 0,
					is_diabetic: diabetes == true ? 1 : 0,
					is_treatment_hypertension: treatment_for_hypertension == true ? 1 : 0,
					systolic_blood_pressure: systolic_blood_pressure,
					HDL_Cholesterol: HDL_cholesterol,
					Total_Cholesterol: total_cholesterol,
					selected_avatar_ID: gender === "Female" ? 2 : 1,
					selected_banner_ID: 1,
				},
				{
					where: {
						user_ID: loggedUserId,
					},
				},
			);

			await db.mysql.RiskScore.create({
				user_id: loggedUserId,
				score: assessmentRisk.score,
				typeRisk: assessmentRisk.risk,
			});

			await db.mysql.UserAvatar.create({
				user_id: loggedUserId,
				avatar_id: user.gender === "Female" ? 2 : 1,
			});

			return utils.handleResponse(
				res,
				utils.http.StatusCreated,
				"Risk assessment done!",
				{
					riskScore: assessmentRisk.score,
					typeRisk: assessmentRisk.risk,
					health_data: {
						gender,
						age,
						smoker: smoker ? "Yes" : "No",
						diabetes: diabetes ? "Yes" : "No",
						treatment_for_hypertension: treatment_for_hypertension ? "Yes" : "No",
						systolic_blood_pressure,
						HDL_cholesterol,
						total_cholesterol,
					},
				},
			);
		}
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = assessmentHeartRisk;
