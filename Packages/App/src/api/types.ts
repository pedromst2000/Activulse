export type APIResponse = {
	success: boolean;
	message: string;
	// To be removed to optional chains - Debugging the APIResponse
	status: number;
	data: any;
};
