import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { APIResponse } from '@/src/api/types';

type Params = {
	page: number;
	limit: number;
	category?: string | undefined;
	intensity?: string | undefined;
};

export type Activity = {
	id: number;
	title: string;
	isPremium: boolean;
	duration: number;
	videoTime?: number;
	category: string;
	intensity: string;
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
};

interface GetActivitiesFeedData extends APIResponse {
	data: {
		activities: Activity[];
		total: number;
	};
}

const getActivitiesFeedData = async (params: Params): Promise<GetActivitiesFeedData> => {
	const url = new URL('/activities', api.defaults.baseURL);

	url.searchParams.append('page', params.page.toString());
	url.searchParams.append('limit', params.limit.toString());

	params.category && url.searchParams.append('category', params.category);
	params.intensity && url.searchParams.append('intensity', params.intensity);

	try {
		const { data }: AxiosResponse<GetActivitiesFeedData> = await api.get('/activities', {
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

const useGetactivitiesFeedData = (
	params: Params,
): UseQueryResult<GetActivitiesFeedData, Error> => {
	return useQuery({
		queryKey: ['activitiesFeedData', params.page, params.limit],
		queryFn: async () => getActivitiesFeedData(params),
		retry: false,
	});
};

export default useGetactivitiesFeedData;
