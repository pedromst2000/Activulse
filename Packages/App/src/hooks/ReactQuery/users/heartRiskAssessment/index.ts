import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from './BodyResponse';
import api from '../../../../api';

type BodyData = {
	gender: 'Male' | 'Female' | null;
	age: number;
	smoker: boolean;
	diabetes: boolean;
	treatment_for_hypertension: boolean;
	systolic_blood_pressure: number;
	HDL_cholesterol: number;
	total_cholesterol: number;
};

const heartRiskAssessment = async (bodyData: BodyData): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.post(
			'/users/heart-risk-assessment',
			bodyData,
		);
		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		throw error;
	}
};

const useHeartRiskAssessment = (bodyData: BodyData): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: () => heartRiskAssessment(bodyData),
	});
};

export default useHeartRiskAssessment;
