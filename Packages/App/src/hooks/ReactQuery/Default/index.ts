import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse} from 'axios';
import { APIResponse } from '../../../api/types';
import api from '../../../api';

export interface DefaultData extends APIResponse {
	success: boolean;
	message: string;
}

const getDefault = async (): Promise<DefaultData> => {
	const { data }: AxiosResponse<DefaultData> = await api.get('/');

	return data;
};

console.log(getDefault());


const useDefault = (): UseQueryResult<DefaultData, Error> => {
	return useQuery({
		queryKey:['default'],
		queryFn: async () => getDefault(),
		retry(failureCount: number) {
			return failureCount < 2;
		}
	});
};

export default useDefault;