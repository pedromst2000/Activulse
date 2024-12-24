import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { APIResponse } from '@/src/api/types';

type Params = {
	page: number;
	limit: number;
	diet: 'DASH' | 'Vegan' | 'Mediterranean';
	category: 'All' | 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts' | 'Premium';
	title?: string | undefined;
};

export type Recipe = {
	id: number;
	isPremium: boolean;
	title: string;
	confTime: number | null;
	videoTime?: number | null;
	category: 'All' | 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts' | 'Premium';
	diet: 'DASH' | 'Vegan' | 'Mediterranean';
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
};

interface GetRecipesFeedData extends APIResponse {
	data: {
		recipes: Recipe[];
		total: number;
	};
}

const getRecipesFeedData = async (params: Params): Promise<GetRecipesFeedData> => {
	const url = new URL('/recipes', api.defaults.baseURL);

	url.searchParams.append('page', params.page.toString());
	url.searchParams.append('limit', params.limit.toString());

	params.title?.toLowerCase() && url.searchParams.append('title', params.title);
	params.diet && url.searchParams.append('diet', params.diet);
	params.category && url.searchParams.append('category', params.category);

	try {
		const { data }: AxiosResponse<GetRecipesFeedData> = await api.get('/recipes', {
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

const useGetRecipesFeedData = (params: Params): UseQueryResult<GetRecipesFeedData, Error> => {
	return useQuery({
		queryKey: ['recipesFeedData', params.page, params.limit],
		queryFn: async () => getRecipesFeedData(params),
		retry: false,
	});
};

export default useGetRecipesFeedData;
