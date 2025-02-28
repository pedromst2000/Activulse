import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { APIResponse } from '@/src/api/types';

type Params = {
	page: number;
	limit: number;
	category?: 'All' | 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts';
};

export type Recipe = {
	id: number;
	title: string;
	videoTime: number;
	price: number;
	category: 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts';
	diet: 'DASH' | 'Mediterranean' | 'Vegan';
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
};

interface GetStoreRecipesFeedData extends APIResponse {
	data: {
		recipes: Recipe[];
		total: number;
	};
}

const getStoreRecipesFeedData = async (params: Params): Promise<GetStoreRecipesFeedData> => {
	const url = new URL('/recipes/store', api.defaults.baseURL);

	url.searchParams.append('page', params.page.toString());
	url.searchParams.append('limit', params.limit.toString());

	params.category && url.searchParams.append('category', params.category);

	try {
		const { data }: AxiosResponse<GetStoreRecipesFeedData> = await api.get('/recipes/store', {
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

const useGetStoreRecipesFeedData = (
	params: Params,
): UseQueryResult<GetStoreRecipesFeedData, Error> => {
	return useQuery({
		queryKey: ['storeRecipesFeedData', params.page, params.limit],
		queryFn: async () => getStoreRecipesFeedData(params),
		retry: false,
	});
};

export default useGetStoreRecipesFeedData;
