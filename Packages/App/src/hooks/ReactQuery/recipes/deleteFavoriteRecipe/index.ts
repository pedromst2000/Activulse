import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	id: number;
};

const deleteFavoriteRecipe = async (params: Params): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.delete(
			`/recipes/${params.id}/favorites`,
		);

		return data;
	} catch (error: any) {
		return error;
	}
};

const useDeleteFavoriteRecipe = (params: Params): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await deleteFavoriteRecipe(params),
	});
};

export default useDeleteFavoriteRecipe;
