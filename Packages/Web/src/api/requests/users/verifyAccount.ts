import api from "../../index";
import { Response } from "../types";
import { handleError } from "../utils";

export default async (token: string): Promise<Response> => {
	try {
		const response: Response = await api.patch(`/users/verify/${token}`);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
