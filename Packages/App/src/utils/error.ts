const getMessage = (error: any): string => {
	if (error) {
		return error.message === 'Validation Error' ? error.data?.data[0].msg : error.message;
	} else {
		return 'An error occurred';
	}
};

export default { getMessage };
