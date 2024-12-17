const getMessage = (error: any): string => {
	if (error && error.response && error.response.data && error.response.data.message) {
		return error.response.data.message === 'Validation Error'
			? error.response.data.data[0].msg
			: error.response.data.message;
	} else {
		return 'An error occurred';
	}
};
const returnError = (error: any): any => {
	if (error && error.response && error.response.data) {
		return { ...error.response.data, status: error.response.status };
	} else {
		return {
			success: false,
			message: 'An error has occurred',
			status: 500,
		};
	}
};

export default { getMessage, returnError };
