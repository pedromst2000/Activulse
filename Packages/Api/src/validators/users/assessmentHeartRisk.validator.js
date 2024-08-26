const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the get user endpoint.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		body().custom((value, { req }) => {
			if (Object.keys(req.body).length === 0) {
				throw new Error("Body is empty");
			}
			return true;
		}),
		body("gender")
			.exists()
			.withMessage("gender is required")
			.isString()
			.withMessage("gender must be a string")
			.isIn(["Female", "Male"])
			.withMessage("gender must be a valid gender"),
		body("age")
			.exists()
			.withMessage("age is required")
			.custom((value) => {
				if (typeof value !== "number") {
					throw new Error("age must be a number");
				}
				return true;
			})
			.isInt({ min: 30, max: 99 })
			.withMessage("age must be between 30 and 99"),
		body("smoker")
			.exists()
			.withMessage("smoker is required")
			.isBoolean({ strict: true })
			.withMessage("smoker must be a boolean"),
		body("diabetes")
			.exists()
			.withMessage("diabetes is required")
			.isBoolean({ strict: true })
			.withMessage("diabetes must be a boolean"),
		body("treatment_for_hypertension")
			.exists()
			.withMessage("treatment_for_hypertension is required")
			.isBoolean({ strict: true })
			.withMessage("treatment for_hypertension must be a boolean"),
		body("systolic_blood_pressure")
			.exists()
			.withMessage("systolic_blood_pressure is required")
			.custom((value) => {
				if (typeof value !== "number") {
					throw new Error("systolic_blood_pressure must be a number");
				}
				return true;
			})
			.isInt({ min: 70, max: 230 })
			.withMessage("systolic blood pressure must be between 70 and 230"),
		body("HDL_cholesterol")
			.exists()
			.withMessage("HDL_cholesterol is required")
			.custom((value) => {
				if (typeof value !== "number") {
					throw new Error("HDL_cholesterol must be an number");
				}
				return true;
			})
			.isInt({ min: 20, max: 100 })
			.withMessage("HDL cholesterol must be between 20 and 100"),
		body("total_cholesterol")
			.exists()
			.withMessage("total_cholesterol is required")
			.custom((value) => {
				if (typeof value !== "number") {
					throw new Error("total_cholesterol must be an number");
				}
				return true;
			})
			.isInt({ min: 100, max: 300 })
			.withMessage("total cholesterol must be between 100 and 300"),
	];
}

module.exports = validator;
