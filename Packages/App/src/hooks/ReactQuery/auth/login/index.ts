import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';
import { LoggedUser } from '../../../../context/user/types';

type BodyData = {
	email: string;
	password: string;
	remember_me: boolean;
};

export interface LoginData extends APIResponse {
	data: {
		authToken: string;
		refreshToken: string;
		user: LoggedUser;
	};
}

const login = async (bodyData: BodyData): Promise<LoginData> => {
	try {
		const { data }: AxiosResponse<LoginData> = await api.post('/auth/login', bodyData);
		return data;
	} catch (error: any) {
		return error;
	}
};

const useLogin = (bodyData: BodyData): UseMutationResult<LoginData, Error> => {
	return useMutation({
		mutationFn: async () => await login(bodyData),
	});
};

export default useLogin;
