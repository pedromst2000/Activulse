import axios, { AxiosInstance } from 'axios';
import config from '../config';
import middlewares from './middlewares';

const api: AxiosInstance = axios.create(config.api);

// Apply middlewares
middlewares.onEveryRequest(api);
middlewares.onEveryResponse(api);

// DEBUGGING: add a 2 seconds delay to every request
// api.interceptors.request.use((res) => {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve(res);
// 		}, 2000);
// 	});
// });

export default api;
