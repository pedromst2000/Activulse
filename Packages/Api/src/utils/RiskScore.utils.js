/**
 * @function CVDRiskScore
 * @description Calculates the cardiovascular risk score for a user based on the Framingham Risk Score algorithm.
 * This function assesses the 10-year risk of developing cardiovascular disease using the Framingham Risk Score, which considers various health parameters.
 *
 * The algorithm used is detailed in the following resources:
 * - FRS Oficial Web Site [Framingham Risk Score](https://www.framinghamheartstudy.org/fhs-risk-functions/cardiovascular-disease-10-year-risk/)
 * - AHA/ACC General Cardiovascular Risk Profile: [Circulation](https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579#d1e386)
 * - 2024 Update on Framingham Risk Score: [Thieme Connect](https://www.thieme-connect.de/products/ejournals/abstract/10.1055/s-0044-1782528)
 *
 * @param {string} gender - The gender of the user ('male' or 'female').
 * @param {number} age - The age of the user (in years).
 * @param {boolean} smoker - Indicates if the user is a smoker (true for smoker, false for non-smoker).
 * @param {boolean} diabetes - Indicates if the user has diabetes (true for diabetic, false for non-diabetic).
 * @param {boolean} treatmentForHypertension - Indicates if the user is being treated for hypertension (true for treated, false for not treated).
 * @param {number} systolicBloodPressure - The systolic blood pressure of the user (in mmHg).
 * @param {number} hdlCholesterol - The HDL cholesterol level of the user (in mg/dL).
 * @param {number} totalCholesterol - The total cholesterol level of the user (in mg/dL).
 *
 * @returns {Object} - The result of the cardiovascular risk assessment.
 * @returns {number} result.score - The calculated risk score of the user, rounded to one decimal place.
 * @returns {string} result.risk - The risk level of the user ('Low', 'Moderate', 'High').
 */

function CVDRiskScore(
	gender,
	age,
	smoker,
	diabetes,
	treatmentForHypertension,
	systolicBloodPressure,
	hdlCholesterol,
	totalCholesterol,
) {
	// Age adjustments
	if (age < 30) age = 30;
	if (age > 74) age = 74;

	/**
	 * @constant coefficients
	 * @description The coefficients used in the Framingham Risk Score algorithm for cardiovascular risk assessment.
	 */
	const coefficients = {
		Female: {
			_age_coef: 2.32888,
			_total_cholesterol_coef: 1.20904,
			_HDL_coef: -0.70833,
			_SBP_NotTreated_coef: 2.76157,
			_SBP_Treated_coef: 2.82263,
			_smoker_coef: 0.52873,
			_diabetes_coef: 0.69154,
			subtractionConstant: 26.1931,
			baselineRisk: 0.95012,
		},
		Male: {
			_age_coef: 3.06117,
			_total_cholesterol_coef: 1.1237,
			_HDL_coef: -0.93263,
			_SBP_NotTreated_coef: 1.93303,
			_SBP_Treated_coef: 1.99881,
			_smoker_coef: 0.65451,
			_diabetes_coef: 0.57367,
			subtractionConstant: 23.9802,
			baselineRisk: 0.88936,
		},
	};

	const coeff = coefficients[gender];

	/**
	 * @constant SBP_Coefficient
	 * @description The coefficient for systolic blood pressure based on treatment status.
	 * This value is used to determine the coefficient for systolic blood pressure based on whether the user is being treated for hypertension.
	 */

	const SBP_Coefficient = treatmentForHypertension
		? coeff._SBP_Treated_coef
		: coeff._SBP_NotTreated_coef;
	/**
	 * @constant logSum
	 * @description The sum of the logarithms of the health parameters multiplied by their respective coefficients.
	 */
	const logSum =
		coeff._age_coef * Math.log(age) +
		coeff._total_cholesterol_coef * Math.log(totalCholesterol) +
		coeff._HDL_coef * Math.log(hdlCholesterol) +
		SBP_Coefficient * Math.log(systolicBloodPressure) +
		coeff._smoker_coef * (smoker ? 1 : 0) +
		coeff._diabetes_coef * (diabetes ? 1 : 0);

	/**
	 * @constant scoreExponent
	 * @description The exponent used to calculate the raw risk score.
	 */
	const scoreExponent = logSum - coeff.subtractionConstant;
	const rawScore = 1 - Math.pow(coeff.baselineRisk, Math.exp(scoreExponent));

	let score = Math.round(rawScore * 1000) / 10;

	if (score > 99) score = 99;
	if (score < 1) score = 1;

	//The risk level based on the calculated score
	let risk;
	if (diabetes || score > 20) {
		risk = "High Risk";
	} else if (score >= 10 && score <= 20) {
		risk = "Moderate Risk";
	} else {
		risk = "Low Risk"; // score < 10
	}

	return { score, risk };
}

module.exports = CVDRiskScore;
