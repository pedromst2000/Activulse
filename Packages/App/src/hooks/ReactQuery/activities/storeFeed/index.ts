import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '../../../../api';
import { APIResponse } from '@/src/api/types';
import utils from '@/src/utils';

type Params = {
	page: number;
	limit: number;
	category?: 'All' | 'Cardio' | 'Yoga' | 'Muscles';
};

export type Activity = {
	id: number;
	title: string;
	videoTime: number;
	intensity: 'Light' | 'Moderate I' | 'Moderate II' | 'Moderate III' | 'Vigorous';
	price: number;
	tag: string;
	category: 'Cardio' | 'Yoga' | 'Muscles';
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
};

interface GetStoreActivitiesFeedData extends APIResponse {
	data: {
		activities: Activity[];
		total: number;
	};
}

const getStoreActivitiesFeedData = async (
	params: Params,
): Promise<GetStoreActivitiesFeedData> => {
	const url = new URL('/activities/store', api.defaults.baseURL);

	url.searchParams.append('page', params.page.toString());
	url.searchParams.append('limit', params.limit.toString());

	params.category && url.searchParams.append('category', params.category);

	try {
		const { data }: AxiosResponse<GetStoreActivitiesFeedData> = await api.get(
			'/activities/store',
			{
				params,
			},
		);

		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		return error;
	}
};

const useGetStoreActivitiesFeedData = (
	params: Params,
): UseQueryResult<GetStoreActivitiesFeedData, Error> => {
	return useQuery({
		queryKey: ['storeActivitiesFeedData', params.page, params.limit],
		queryFn: async () => getStoreActivitiesFeedData(params),
		retry: false,
	});
};

export default useGetStoreActivitiesFeedData;
