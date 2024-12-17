import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	id: number | 'me';
};

type User = {
	username: string;
	tag: string;
	total_steps: number;
	total_distance: number;
	selected_banner: {
		id: number;
		banner: string;
	};
	selected_avatar: {
		id: number;
		avatar: string;
	};
	badges: [
		{
			id: number;
			title: string;
			description: string;
			badge: string;
		},
	];
};

export interface getUserData extends APIResponse {
	data: User;
}

const getUser = async (params: Params): Promise<getUserData> => {
	try {
		const { data }: AxiosResponse<getUserData> = await api.get(`/users/${params.id}`);

		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		throw error;
	}
};

const useGetUser = (params: Params): UseQueryResult<getUserData, Error> => {
	return useQuery({
		queryKey: ['user', params.id],
		queryFn: async () => await getUser(params),
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

export default useGetUser;
