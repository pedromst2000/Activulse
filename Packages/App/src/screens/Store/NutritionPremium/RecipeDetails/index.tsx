import { useEffect, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import utils from '@/src/utils';
import { APIResponse } from '@/src/api/types';
import { IOScrollView } from 'react-native-intersection-observer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import { useUserContext } from '@/src/context/user';
import useGetRecipeDetails, { Recipe } from '@/src/hooks/ReactQuery/recipes/details';
import useBuyRecipe from '@/src/hooks/ReactQuery/recipes/buyRecipe';
import AnimatedComponent from '../../../../components/Animated';
import DetailsHeader from '@/src/components/DetailsHeader';
import DetailsMedia from '@/src/components/DetailsMedia';
import DetailsCardInfo from '@/src/components/DetailsCardInfo';
import Modal from '@/src/components/Modal';
import GoBackBtn from '@/src/components/GoBackBtn';
import LoadingSkeleton from '@/src/components/LoadingSkeleton';
import EmptyState from '@/src/components/EmptyState';
import InfoIlus from '../../../../assets/svg/ilustrations/Modals/Info.svg';
import ErrorIlus from '../../../../assets/svg/ilustrations/EmptyStates/ErrorServer.svg';
import buyPremiumIlus from '../../../../assets/svg/ilustrations/Modals/BuyPremium.svg';
import Message from '@/src/components/Message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StoreStackParamList } from '@/src/navigation/Store';

type RecipeRouteProp = RouteProp<LifestyleStackParamList, 'Recipe'>;

type NutritionFeedNavigationProp = NativeStackNavigationProp<
	StoreStackParamList,
	'NutritionStoreFeed'
>;

/**
 *  * TODO (bugs)
 * 4. Fix Glitch Bug of Modal Showing unecessary!
 */

const RecipeStoreDetails: React.FC = (): React.JSX.Element => {
	const route = useRoute<RecipeRouteProp>();
	const navigation = useNavigation<NutritionFeedNavigationProp>();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const [messageAPI, setMessageAPI] = useState<string>('');
	const { signOut, loggedUser, updateUser } = useUserContext();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const { isLoading, data, isRefetching, refetch } = useGetRecipeDetails({
		id: route.params.recipeId,
	});

	const { mutateAsync, data: buyData } = useBuyRecipe({
		id: route.params.recipeId ?? 0,
	});
	useEffect(() => {
		if (data?.data) {
			setRecipe(data.data);
		}
	}, [data?.data]);

	//  TO BE REFACTORED
	useEffect(() => {
		if (
			data?.success === false ||
			data?.message === 'Network Error' ||
			buyData?.success === false ||
			buyData?.message === 'Network Error'
		) {
			setIsError(true);
		} else if (data?.success === true || buyData?.success === true) {
			setIsError(false);
		}

		if (
			data?.message === 'Missing auth token or refresh token' ||
			data?.message === 'Refresh token has expired' ||
			buyData?.message === 'Missing auth token or refresh token' ||
			buyData?.message === 'Refresh token has expired'
		) {
			setModalVisible(true);
		}
	}, [data?.success, data?.message, buyData?.message, buyData?.success, modalVisible]);

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		refetch().then((result) => {
			if (result.data) {
				setRecipe(result.data.data);
			}
		});
	};

	const handleOnBuyRecipe = async (): Promise<void> => {
		setShowError(false); // Hide the error message before new validation
		clearTimeout(timeoutRef.current!);
		setModalVisible(true);

		// Send the request
		await mutateAsync(
			{},
			{
				onSuccess: async (resData: APIResponse): Promise<void> => {
					if (resData.success) {
						// updating the user points
						const discount = data?.data?.price ?? 0;

						const update = {
							points: loggedUser?.points! - discount,
						};

						if (loggedUser) {
							updateUser({ ...loggedUser, ...update });
						}

						setShowSuccess(true);
						setMessageAPI(resData.message);
						timeoutRef.current = setTimeout(() => {
							setShowSuccess(false);
							// navigating to the store recipes feed
							navigation.navigate('NutritionStoreFeed', {
								recipeBoughtId: data?.data.recipe_id ?? 0,
							});
						}, utils.timers.SUCCESS_DELAY);
					}
				},
				onError: (error: any): void => {
					const errorMessage = utils.error.getMessage(error as Error);
					setMessageAPI(errorMessage);
					setShowError(true);
					timeoutRef.current = setTimeout(() => {
						setShowError(false);
					}, utils.timers.ERROR_MESSAGE_TIMEOUT);
				},
			},
		);
	};

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
				{!isLoading && !isRefetching && !isError && (
					<View className="flex-1 bg-primary-50 pb-8">
						<DetailsHeader showFavBtn={false} />

						<DetailsMedia
							type={recipe?.image?.url ? 'image' : 'video'}
							imgSrc={recipe?.image?.url || null}
							videoSrc={recipe?.video?.url || null}
						/>

						<AnimatedComponent animation="FadeIn">
							{showError ? (
								<Message marginStyle="mt-[-8px]" type="error" message={messageAPI} />
							) : showSuccess ? (
								<Message marginStyle="mt-[-8px]" type="success" message={messageAPI} />
							) : null}
						</AnimatedComponent>

						<DetailsCardInfo
							type="store"
							data={recipe}
							onPressBuy={() => {
								setModalVisible(true);
							}}
						/>
					</View>
				)}

				{(isLoading || isRefetching) && <LoadingSkeleton type="RecipeDetailsStore" />}

				{!isLoading &&
					!isRefetching &&
					(data?.message === 'Network Error' ||
						data?.message === 'Something went wrong!' ||
						data?.message === 'Missing auth token or refresh token' ||
						data?.message.includes('expired')) && (
						<View>
							<View className="absolute top-12 left-4 z-10">
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
					)}
			</IOScrollView>

			<Modal
				type={
					buyData?.message.includes('expired') || data?.message.includes('expired')
						? 'expiredWarning'
						: 'buyStoreItem'
				}
				ilustration={
					buyData?.message.includes('expired') || data?.message.includes('expired')
						? InfoIlus
						: buyPremiumIlus
				}
				message={
					buyData?.message.includes('expired') || data?.message.includes('expired')
						? 'Your session has expired ! Sign Out and Sign In again to continue'
						: `Are you sure you want to buy this Premium Recipe for ${data?.data?.price} heart points ?`
				}
				isModalVisible={modalVisible}
				onPress={() => {
					setModalVisible(false);
					signOut();
				}}
				onPressYes={() => {
					handleOnBuyRecipe();
					setModalVisible(false);
				}}
				onPressNo={() => {
					setModalVisible(false);
				}}
			/>
		</AnimatedComponent>
	);
};

export default RecipeStoreDetails;
