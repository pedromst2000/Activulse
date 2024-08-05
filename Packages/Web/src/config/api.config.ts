import { CreateAxiosDefaults } from "axios";

const axiosOptions: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_API_ROUTE, // Base URL for all requests
	headers: { "Content-Type": "application/json" }, // Default header for all requests
	timeout: 60000, // 1 minute
	timeoutErrorMessage: "Request timed out", // Error message when request times out
};

export default axiosOptions;
