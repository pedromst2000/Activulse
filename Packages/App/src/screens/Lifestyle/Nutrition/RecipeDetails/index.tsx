import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import { useUserContext } from '@/src/context/user';
import { APIResponse } from '@/src/api/types';
import useGetRecipeDetails, { Recipe } from '@/src/hooks/ReactQuery/recipes/details';
import useAddFavoriteRecipe from '@/src/hooks/ReactQuery/recipes/addFavoriteRecipe';
import useDeleteFavoriteRecipe from '@/src/hooks/ReactQuery/recipes/deleteFavoriteRecipe';
import AnimatedComponent from '../../../../components/Animated';
import DetailsHeader from '@/src/components/DetailsHeader';
import DetailsMedia from '@/src/components/DetailsMedia';
import DetailsCardInfo from '@/src/components/DetailsCardInfo';
import Modal from '@/src/components/Modal';
import GoBackBtn from '@/src/components/GoBackBtn';
import LoadingSkeleton from '@/src/components/LoadingSkeleton';
import EmptyState from '@/src/components/EmptyState';
import FavoriteIlus from '../../../../assets/svg/ilustrations/Modals/FavoriteI.svg';
import RemoveIlus from '../../../../assets/svg/ilustrations/Modals/Remove.svg';
import InfoIlus from '../../../../assets/svg/ilustrations/Modals/Info.svg';
import ErrorIlus from '../../../../assets/svg/ilustrations/EmptyStates/ErrorServer.svg';

type RecipeRouteProp = RouteProp<LifestyleStackParamList, 'Recipe'>;

const RecipeDetails: React.FC = (): React.JSX.Element => {
	const route = useRoute<RecipeRouteProp>();
	const navigation = useNavigation();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [isToogleFav, setIsToogleFav] = useState<boolean>(false);
	const [isMyFav, setIsMyFav] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [showMessage, setShowMessage] = useState<string>('');
	const { signOut } = useUserContext();

	const { isLoading, data, isRefetching, refetch } = useGetRecipeDetails({
		id: route.params.recipeId,
	});
	const { mutateAsync: mutateAsyncAdd, data: addData } = useAddFavoriteRecipe({
		id: route.params.recipeId,
	});
	const { mutateAsync: mutateAsyncDelete, data: deleteData } = useDeleteFavoriteRecipe({
		id: route.params.recipeId,
	});

	useEffect(() => {
		if (data?.data) {
			setRecipe(data.data);
			setIsMyFav(data.data.isMyFavorite || false);
		}
	}, [data?.data, recipe, showMessage]);

	// !! TO BE REFRACTORED
	useEffect(() => {
		if (data?.success === false || data?.message === 'Network Error') {
			setIsError(true);
		}

		if (data?.success === true) {
			setIsError(false);
		} else if (
			data?.message == 'Missing auth token or refresh token' ||
			data?.message == 'Refresh token has expired'
		) {
			setModalVisible(true);
		}
	}, [
		isError,
		data?.success,
		data?.message,
		modalVisible,
		addData?.message,
		deleteData?.message,
	]);

	useEffect(() => {
		if (
			addData?.message == 'Missing auth token or refresh token' ||
			addData?.message == 'Refresh token has expired' ||
			deleteData?.message == 'Missing auth token or refresh token' ||
			deleteData?.message == 'Refresh token has expired' ||
			addData?.message == 'Recipe added to favorites !' ||
			deleteData?.message == 'Recipe removed from favorites !'
		)
			setModalVisible(true);

		return () => {
			setModalVisible(false);
		};
	}, [addData?.message, deleteData?.message]);

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		setRecipe(null);
		refetch();
	};

	const handleOnToogleFav = async (): Promise<void> => {
		const newToggleFav = !isToogleFav;
		setIsToogleFav(newToggleFav);
		setIsMyFav(!isMyFav);

		try {
			if (newToggleFav) {
				await mutateAsyncAdd(
					{ id: route.params.recipeId },
					{
						onSuccess: async (resData: APIResponse): Promise<void> => {
							if (resData.success) {
								setIsMyFav(true);
								setShowMessage(resData.message || 'Added to your Favorites List');
								setModalVisible(true);
							}
						},
						onError: (error: any): void => {
							if (error.status === 409) {
								setShowMessage('Recipe is already in your Favorites List');
								setModalVisible(true);
							} else {
								setIsMyFav(false);
								console.info('error', error);
							}
						},
					},
				);
			} else {
				await mutateAsyncDelete(
					{ id: route.params.recipeId },
					{
						onSuccess: async (resData: APIResponse): Promise<void> => {
							if (resData.success) {
								setIsMyFav(false);
								setShowMessage(resData.message || 'Removed from your Favorites List');
								setModalVisible(true);
							}
						},
						onError: (error: any): void => {
							setIsMyFav(true);
							console.info('error', error);
						},
					},
				);
			}
		} catch (error) {
			console.info('Unexpected error:', error);
			setIsMyFav(!newToggleFav);
		}
	};

	/**
	 * TODO
	 4. Fix Glitch Bug of Modal Showing unecessary!
	 * 
	 */

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<IOScrollView
				keyboardShouldPersistTaps="handled"
				scrollEventThrottle={50}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={handleOnRefresh}
						colors={['#0C2C7E']}
					/>
				}
			>
				{isLoading || isRefetching || recipe === null ? (
					<LoadingSkeleton type="RecipeDetails" />
				) : !isError && !isLoading && !isRefetching ? (
					<View className="flex-1 bg-primary-50 pb-8">
						<DetailsHeader
							onToggleFav={handleOnToogleFav}
							isToogleFav={isToogleFav}
							isMyFav={isMyFav}
						/>

						<DetailsMedia
							type={recipe?.image?.url ? 'image' : 'video'}
							imgSrc={recipe?.image?.url || null}
							videoSrc={recipe?.video?.url || null}
						/>

						<DetailsCardInfo type="recipe" data={recipe} />
					</View>
				) : (isError && recipe === null) ||
				  data?.message === 'Network Error' ||
				  data?.message === 'Something went wrong!' ||
				  data?.message === 'Missing auth token or refresh token' ||
				  data?.message.includes('expired') ? (
					<View>
						<View
							className="
						absolute top-12 left-4 z-10
								"
						>
							<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
						</View>
						<EmptyState
							type="Error"
							_ilustration_={ErrorIlus}
							message="Oops! Something went wrong"
							description="Uh-oh! It looks like something went wrong on our end. Our tech team is already working hard to fix it. Please try again Later. Thanks for your patience and understanding!"
							styleClass="mt-20"
						/>
					</View>
				) : null}
			</IOScrollView>
			<Modal
				type={
					addData?.message.includes('added')
						? 'addFavorite'
						: deleteData?.message.includes('removed')
							? 'removeFavorite'
							: 'expiredWarning'
				}
				ilustration={
					showMessage.includes('added')
						? FavoriteIlus
						: showMessage.includes('removed')
							? RemoveIlus
							: data?.message == 'Network Error' || data?.message.includes('expired')
								? InfoIlus
								: null
				}
				message={
					addData?.message || deleteData?.message
						? showMessage
						: 'Your session has expired ! Sign Out and Sign In again to continue.'
				}
				isModalVisible={modalVisible}
				onPress={() => {
					setModalVisible(false);
					if (addData?.message.includes('added') || deleteData?.message.includes('removed')) {
						refetch();
					} else {
						signOut();
					}
				}}
			/>
		</AnimatedComponent>
	);
};

export default RecipeDetails;
