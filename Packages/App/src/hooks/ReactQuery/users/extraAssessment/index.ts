import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type BodyData = {
	stress: 'Rare' | 'Sometimes' | 'Frequently' | null | undefined;
	havesDiet: boolean;
	fastFoodStatus?: 'Rare' | 'Sometimes' | 'Frequently' | null | undefined;
	diet?: 'DASH' | 'Mediterranean' | 'Vegan' | null | undefined;
};

const extraAssessment = async (bodyData: BodyData): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.patch(
			`/users/extra-assessment`,
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

const useExtraAssessment = (bodyData: BodyData): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: () => extraAssessment(bodyData),
	});
};

export default useExtraAssessment;
