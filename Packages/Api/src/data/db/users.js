const utils = require("../../utils");

module.exports = [
	// The password for all the users is the same "HelloWorld123"
	{
		email: "johnDoe@gmail.com",
		username: "johnDoe",
		password: utils.tokens.generateRandomBase64Token(),
		verify_user_token: null,
		is_verified: true,
		gender: "Male",
		age: 53,
		is_smoker: false,
		is_diabetic: true,
		is_treatment_hypertension: true,
		systolic_blood_pressure: 130,
		HDL_Cholesterol: 75,
		Total_Cholesterol: 150,
		stress_status: "Sometimes",
		know_diet: false,
		fast_food_status: "Rare",
		points: 80,
		selected_banner_ID: 1,
		selected_avatar_ID: 1,
	},
	{
		email: "Katerine@gmail.com",
		username: "Katerine",
		password: utils.tokens.generateRandomBase64Token(),
		verify_user_token: null,
		is_verified: true,
		gender: "Female",
		age: 61,
		is_smoker: true,
		is_diabetic: false,
		is_treatment_hypertension: false,
		systolic_blood_pressure: 124,
		HDL_Cholesterol: 47,
		Total_Cholesterol: 180,
		stress_status: "Sometimes",
		know_diet: true,
		fast_food_status: "Rare",
		points: 100,
		diet_id: 2,
		selected_banner_ID: 1,
		selected_avatar_ID: 2,
	},
	{
		email: "Avsa@gmail.com",
		username: "Avsa",
		password: utils.tokens.generateRandomBase64Token(),
		verify_user_token: utils.tokens.generateRandomBase64Token(),
		is_verified: false,
		gender: "Female",
		age: 31,
		is_smoker: false,
		is_diabetic: false,
		is_treatment_hypertension: false,
		systolic_blood_pressure: 104,
		HDL_Cholesterol: 37,
		Total_Cholesterol: 120,
		stress_status: "Sometimes",
		know_diet: true,
		fast_food_status: "Rare",
		points: 100,
		diet_id: 2,
		selected_banner_ID: 1,
		selected_avatar_ID: 2,
	},
	{
		email: "pedroK@gmail.com",
		username: "pedroK",
		password: utils.tokens.generateRandomBase64Token(),
		verify_user_token: utils.tokens.generateRandomBase64Token(),
		is_verified: false,
		gender: "Male",
		age: 38,
		is_smoker: false,
		is_diabetic: true,
		is_treatment_hypertension: true,
		systolic_blood_pressure: 130,
		HDL_Cholesterol: 57,
		Total_Cholesterol: 190,
		stress_status: "Sometimes",
		know_diet: true,
		fast_food_status: "Rare",
		points: 100,
		diet_id: 2,
		selected_banner_ID: 1,
		selected_avatar_ID: 2,
	},
];
