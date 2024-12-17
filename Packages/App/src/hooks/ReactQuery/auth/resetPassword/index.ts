import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

export type BodyData = {
	new_password: string;
	confirm_password: string;
	email: string;
};

const resetPassword = async (bodyData: BodyData): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.patch(
			`/auth/users/reset-password`,
			bodyData,
		);

		return data;
	} catch (error: any) {
		if (error.data) {
			return error.data;
		}
		throw error;
	}
};

const useResetPassword = (bodyData: BodyData): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: () => resetPassword(bodyData),
	});
};

export default useResetPassword;
