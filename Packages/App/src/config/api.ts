import { API_URL } from '@env';
import { CreateAxiosDefaults } from 'axios';

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL, // Base URL for all requests
	headers: {
		'Content-Type': 'application/json',
		// ! Enable Caching only in development for debugging purposes !! DO NOT USE IN PRODUCTION CAN CAUSE PERFORMANCE ISSUES
		'Cache-Control': 'no-cache',
		Pragma: 'no-cache',
		Expires: '0',
	}, // Default header for all requests
	timeout: 120000, // 2 minutes
	timeoutErrorMessage: 'Request timed out', // Error message when request times out
	withCredentials: false, // Disable sending and receiving cookies from the server
} as const;

export default axiosOptions;
