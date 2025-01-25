import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	id: number;
};

export type Recipe = {
	recipe_id: number;
	isPremium: boolean;
	isMyFavorite: boolean;
	title: string;
	description: string;
	category: {
		id: number;
		name: string;
	};
	diet: {
		id: number;
		name: string;
	};
	durationConf?: number | null;
	videoTime?: number | null;
	image?: {
		url: string;
	} | null;
	video?: {
		url: string;
	} | null;
	ingredients?:
		| [
				{
					id: number;
					ingredient: string;
				},
		  ]
		| null;
	instructions?:
		| [
				{
					id: number;
					instruction: string;
				},
		  ]
		| null;
	createdAt: string;
	updatedAt: string;
};

interface getRecipeData extends APIResponse {
	data: Recipe;
}

const getRecipeDetails = async (params: Params): Promise<getRecipeData> => {
	try {
		const { data }: AxiosResponse<getRecipeData> = await api.get(`/recipes/${params.id}`);

		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		return error;
	}
};

const useGetRecipeDetails = (params: Params): UseQueryResult<getRecipeData, Error> => {
	return useQuery({
		queryKey: ['recipe', params.id],
		queryFn: async () => await getRecipeDetails(params),
		retry(failureCount: number, error: Error) {
			if (error) {
				switch (error.message) {
					case 'Network Error':
						return false;
					default:
						return failureCount < 3; // Retry up to 3 times
				}
			}
			return false;
		},
	});
};

export default useGetRecipeDetails;
