export interface APIResponse {
	success: boolean;
	message: string;
	data: {
		riskScore: number;
		typeRisk: string;
		health_data: {
			gender: string;
			age: number;
			smoker: 'Yes' | 'No';
			diabetes: 'Yes' | 'No';
			treatment_for_hypertension: 'Yes' | 'No';
			systolic_blood_pressure: number;
			HDL_cholesterol: number;
			total_cholesterol: number;
		};
	} | null;
}
