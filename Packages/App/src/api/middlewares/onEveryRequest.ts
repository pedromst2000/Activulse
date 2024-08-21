import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import utils from '../../utils';

export default (api: AxiosInstance): void => {
	api.interceptors.request.use(
		async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
			try {
				// Retrieve tokens from storage
				const authToken = await utils.storage.getItem('authToken');

				const refreshToken = await utils.storage.getItem('refreshToken');

				// Add tokens to request headers if they exist
				if (authToken) {
					config.headers['x-auth-token'] = authToken;
				}

				if (refreshToken) {
					config.headers['x-refresh-token'] = refreshToken;
				}
			} catch (error) {
				console.error('Error in request interceptor:', error);
			}

			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
};
