import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	email: string;
};

export type BodyData = {
	new_password: string;
	confirm_password: string;
};

const resetPassword = async (params: Params, bodyData: BodyData): Promise<APIResponse> => {
	const { data }: AxiosResponse<APIResponse> = await api.patch(
		`/auth/users/reset-password/${params.email}`,
		bodyData,
	);

	return data;
};

const useResetPassword = (params: Params): UseMutationResult<APIResponse, Error, BodyData> => {
	return useMutation({
		mutationFn: (bodyData: BodyData) => resetPassword(params, bodyData),
	});
};

export default useResetPassword;
