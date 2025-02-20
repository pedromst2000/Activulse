import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { APIResponse } from '@/src/api/types';

type Params = {
	page: number;
	limit: number;
};

export type Banner = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
};

interface GetBannersFeedData extends APIResponse {
	data: {
		banners: Banner[];
		total: number;
	};
}

const getBannersFeedData = async (params: Params): Promise<GetBannersFeedData> => {
	const url = new URL('/banners/store', api.defaults.baseURL);

	url.searchParams.append('page', params.page.toString());
	url.searchParams.append('limit', params.limit.toString());

	try {
		const { data }: AxiosResponse<GetBannersFeedData> = await api.get('/banners/store', {
			params,
		});

		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		return error;
	}
};

const useGetBannersFeedData = (params: Params): UseQueryResult<GetBannersFeedData, Error> => {
	return useQuery({
		queryKey: ['bannersFeedData', params.page, params.limit],
		queryFn: async () => getBannersFeedData(params),
		retry: false,
	});
};

export default useGetBannersFeedData;
