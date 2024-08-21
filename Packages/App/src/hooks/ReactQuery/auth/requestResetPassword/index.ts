import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

export type BodyData = {
	email: string;
};

const requestResetPassword = async (bodyData: BodyData): Promise<APIResponse> => {
	const { data }: AxiosResponse<APIResponse> = await api.post(
		'/auth/users/request-reset-password',
		bodyData,
	);

	return data;
};

const useRequestResetPassword = (
	bodyData: BodyData,
): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await requestResetPassword(bodyData),
	});
};

export default useRequestResetPassword;
