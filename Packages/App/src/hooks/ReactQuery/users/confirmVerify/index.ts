import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../api/types';
import api from '../../../../api';

type BodyData = {
	email: string;
};

const confirmVerify = async (bodyData: BodyData): Promise<APIResponse> => {
	try {
		const { data }: AxiosResponse<APIResponse> = await api.post(`/users/verify`, bodyData);

		return data;
	} catch (error: any) {
		return error;
	}
};

const useConfirmVerify = (bodyData: BodyData): UseMutationResult<APIResponse, Error> => {
	return useMutation({
		mutationFn: () => confirmVerify(bodyData),
	});
};

export default useConfirmVerify;
