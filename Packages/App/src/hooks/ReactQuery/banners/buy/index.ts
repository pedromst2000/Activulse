import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	id: number;
};

const buyBanner = async (params: Params): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.post(`/banners/${params.id}/buy`);

		return data;
	} catch (error: any) {
		return error;
	}
};

const useBuyBanner = (params: Params): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await buyBanner(params),
	});
};

export default useBuyBanner;
