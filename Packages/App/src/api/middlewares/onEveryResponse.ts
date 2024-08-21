import { AxiosInstance, AxiosResponse } from 'axios';
import utils from '../../utils';

export default (api: AxiosInstance): void => {
	api.interceptors.response.use(
		async (response: AxiosResponse): Promise<AxiosResponse> => {
			try {
				const authToken: string | undefined = response.headers['x-auth-token'];

				const refreshToken: string | undefined = response.headers['x-refresh-token'];

				if (authToken) {
					await utils.storage.setItem('authToken', authToken);
				}

				if (refreshToken) {
					await utils.storage.setItem('refreshToken', refreshToken);
				}
			} catch (error) {
				console.error('Error in response interceptor:', error);
			}

			return response;
		},
		async (error) => {
			try {
				// Handle 401 Unauthorized errors
				if (error.response?.status === 401) {
					await utils.storage.removeItem('authToken');
					await utils.storage.removeItem('refreshToken');
					console.log('Removed authToken and refreshToken from storage due to 401 error');
				}
			} catch (err) {
				console.error('Error handling 401 response:', err);
			}

			// console.error('Response error:', error.message);
			return Promise.reject(error);
		},
	);
};
