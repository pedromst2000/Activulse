import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { APIResponse } from '@/src/api/types';

type Params = {
	page: number;
	limit: number;
	diet?: string | undefined;
	category?: string | undefined;
	title?: string | undefined;
};

export type Recipe = {
	id: number;
	isPremium: boolean;
	title: string;
	confTime?: number | null;
	videoTime?: number | null;
	category: string;
	diet: string;
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
	params.diet?.toLowerCase() && url.searchParams.append('diet', params.diet);
	params.category?.toLowerCase() && url.searchParams.append('category', params.category);

	try {
		const { data }: AxiosResponse<GetRecipesFeedData> = await api.get('/recipes', {
			params,
		});

		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		throw error;
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
