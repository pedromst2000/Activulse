import { APIResponse } from '@/src/api/types';

type props = {
	id: number;
	isToogleFav: boolean;
	setIsToogleFav: (value: boolean) => void;
	isMyFav: boolean;
	setIsMyFav: (value: boolean) => void;
	setModalVisible: (value: boolean) => void;
	setShowMessage: (value: string) => void;
	mutateAsyncAdd: any;
	mutateAsyncDelete: any;
};

const toogleFav = async (props: props): Promise<void> => {
	const newToggleFav = !props.isToogleFav;
	props.setIsToogleFav(newToggleFav);

	try {
		if (props.isMyFav === false) {
			await props.mutateAsyncAdd(
				{ id: props.id },
				{
					onSuccess: async (resData: APIResponse): Promise<void> => {
						if (resData.success) {
							props.setIsMyFav(true);
							props.setShowMessage(resData.message || 'Added to your Favorites List');
							props.setModalVisible(true);
						}
					},
					onError: (error: any): void => {
						if (error.status === 409) {
							props.setShowMessage('Recipe is already in your Favorites List');
							props.setModalVisible(true);
						} else {
							props.setIsMyFav(false);
							console.info('error', error);
						}
					},
				},
			);
		} else {
			await props.mutateAsyncDelete(
				{ id: props.id },
				{
					onSuccess: async (resData: APIResponse): Promise<void> => {
						if (resData.success) {
							props.setIsMyFav(false);
							props.setShowMessage(resData.message || 'Removed from your Favorites List');
							props.setModalVisible(true);
						}
					},
					onError: (error: any): void => {
						props.setIsMyFav(true);
						console.info('error', error);
					},
				},
			);
		}
	} catch (error) {
		console.info('Unexpected error:', error);
		props.setIsMyFav(!newToggleFav);
	}
};

export default toogleFav;
