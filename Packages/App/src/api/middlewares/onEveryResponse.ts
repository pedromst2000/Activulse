import { AxiosInstance, AxiosResponse } from 'axios';
import utils from '../../utils';

export default (api: AxiosInstance): void => {
	api.interceptors.response.use(
		(res: AxiosResponse): AxiosResponse => {
			// Check if the tokens have been updated and update in the storage
			// const authToken: string | undefined = res.headers['x-auth-token'];
			// const refreshToken: string | undefined = res.headers['x-refresh-token'];

			// if (authToken) {
			// 	utils.storage.set('authToken', authToken);
			// }

			// if (refreshToken) {
			// 	utils.storage.set('refreshToken', refreshToken);
			// }

			return res;
		},

		(err: any) => {
			// if (err.response?.status === 401) {
			// 	utils.storage.delete('authToken');
			// 	utils.storage.delete('refreshToken');
			// }

			console.log(err.message);
			return Promise.reject(err);
		},
	);
};
