import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type Params = {
	email: string;
};

export type BodyData = {
	OTP: string;
};

const verifyOTP = async (params: Params, bodyData: BodyData): Promise<APIResponse> => {
	const { data }: AxiosResponse<APIResponse> = await api.post(
		`/auth/users/verify-OTP/${params.email}`,
		bodyData,
	);

	return data;
};

const useVerifyOTP = (params: Params): UseMutationResult<APIResponse, Error, BodyData> => {
	return useMutation({
		mutationFn: (bodyData: BodyData) => verifyOTP(params, bodyData),
	});
};
export default useVerifyOTP;
