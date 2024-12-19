import { AxiosInstance, AxiosResponse } from 'axios';
import utils from '../../utils';

export default (api: AxiosInstance): void => {
	api.interceptors.response.use(
		async (response: AxiosResponse): Promise<AxiosResponse> => {
			const authToken: string | undefined = response.headers['x-auth-token'];
			const refreshToken: string | undefined = response.headers['x-refresh-token'];

			if (authToken) {
				await utils.storage.setItem('authToken', authToken);
			}

			if (refreshToken) {
				await utils.storage.setItem('refreshToken', refreshToken);
			}

			return response;
		},
		async (error: any) => {
			if (error.response?.status === 401) {
				await utils.storage.removeItem('authToken');
				await utils.storage.removeItem('refreshToken');
			}

			if (error.response?.status === 404) {
				return Promise.reject(error.response);
			}

			return Promise.reject(error);
		},
	);
};
