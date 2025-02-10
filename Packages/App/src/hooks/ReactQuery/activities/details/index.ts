import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	id: number;
};

export type Activity = {
	activity_id: number;
	isPremium: boolean;
	isMyFavorite: boolean;
	intensity: string;
	title: string;
	price?: number | null;
	category:
		| {
				id: number;
				name: string;
		  }
		| string;
	tag: string;
	description?: string | null;
	image?: {
		url: string;
	} | null;
	videoTime?: number | null;
	duration?: number | null;
	video?: {
		url: string;
	} | null;
	workouts?:
		| [
				{
					id: number;
					workout: string;
				},
		  ]
		| null;
	createdAt: string;
	updatedAt: string;
};

interface getActivityData extends APIResponse {
	data: Activity;
}

const getActivityDetails = async (params: Params): Promise<getActivityData> => {
	try {
		const { data }: AxiosResponse<getActivityData> = await api.get(`/activities/${params.id}`);

		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		return error;
	}
};

const useGetActivityDetails = (params: Params): UseQueryResult<getActivityData, Error> => {
	return useQuery({
		queryKey: ['activity', params.id],
		queryFn: async () => await getActivityDetails(params),
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

export default useGetActivityDetails;
