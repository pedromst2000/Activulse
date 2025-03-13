import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	id: number;
};

const buyRecipe = async (params: Params): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.post(`/recipes/${params.id}/buy`);

		return data;
	} catch (error: any) {
		return error;
	}
};

const useBuyRecipe = (params: Params): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await buyRecipe(params),
	});
};

export default useBuyRecipe;
