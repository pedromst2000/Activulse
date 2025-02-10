import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	id: number;
};

const addActivityToFavorites = async (params: Params): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.post(
			`/activities/${params.id}/favorites`,
		);

		return data;
	} catch (error: any) {
		return error;
	}
};

const useAddFavoriteActivity = (params: Params): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await addActivityToFavorites(params),
	});
};

export default useAddFavoriteActivity;
