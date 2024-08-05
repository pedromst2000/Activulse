import { AxiosResponse } from "axios";

export interface ResponseData {
	success: boolean;
	message: string;
	data?: unknown;
}

export interface Response extends AxiosResponse<ResponseData> {
	data: ResponseData;
}

export type ErrorResponse = AxiosResponse;
