import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import utils from '../../utils';

export default (api: AxiosInstance): void => {
	// Add the authentification tokens to the headers
	api.interceptors.request.use(
		(res: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
			// const authToken: string | undefined = utils.storage.getString('authToken');
			// const refreshToken: string | undefined = utils.storage.getString('refreshToken');

			// if (authToken && refreshToken) {
			// 	res.headers['x-auth-token'] = authToken;
			// 	res.headers['x-refresh-token'] = refreshToken;
			// }

			return res;
		},
	);
};
