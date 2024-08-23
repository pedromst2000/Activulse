import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type BodyData = {
	email: string;
};

const resendVerification = async (bodyData: BodyData): Promise<APIResponse> => {
	const { data }: AxiosResponse<APIResponse> = await api.post(
		`/users/resend-verify`,
		bodyData,
	);

	return data;
};

const useResendVerification = (bodyData: BodyData): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: async () => await resendVerification(bodyData),
	});
};

export default useResendVerification;
