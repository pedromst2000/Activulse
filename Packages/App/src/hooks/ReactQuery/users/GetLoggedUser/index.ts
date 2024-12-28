import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type User = {
	id: number;
	username: string;
	email: string;
	points: number;
	risk_score: {
		score: number;
		type_risk: string;
	};
	tag: string;
	total_steps: number;
	total_distance: number;
	diet: {
		id: number;
		name: string;
	};
	gender: string;
	age: number;
	is_smoker: boolean;
	is_diabetic: boolean;
	is_treatment_hypertension: boolean;
	systolic_blood_pressure: number;
	HDL_cholesterol: number;
	Total_cholesterol: number;
	selected_banner: {
		id: number;
		banner: string;
	};
	selected_avatar: {
		id: number;
		avatar: string;
	};
	avatars: [
		{
			id: number;
			is_selected: boolean;
			avatar: string;
		},
	];
	banners: [
		{
			id: number;
			is_selected: boolean;
			banner: string;
		},
	];
	badges: [
		{
			id: number;
			title: string;
			description: string;
			badge: string;
		},
	];
};

export interface GetLoggedUserData extends APIResponse {
	data: User;
}

const getLoggedUser = async (): Promise<GetLoggedUserData> => {
	try {
		const { data }: AxiosResponse<GetLoggedUserData> = await api.get('/users/me');
		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		return error;
	}
};

const useGetLoggedUser = (): UseQueryResult<GetLoggedUserData, Error> => {
	return useQuery({
		queryKey: ['loggedUser'],
		queryFn: async () => await getLoggedUser(),
		retry(failureCount: number, error: Error) {
			if (error.message === 'No tokens found') {
				return false;
			}
			return failureCount < 3;
		},
	});
};

export default useGetLoggedUser;
