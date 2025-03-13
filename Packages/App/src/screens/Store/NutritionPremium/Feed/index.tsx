import { useEffect, useState } from 'react';
import { RefreshControl, View, Text } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useUserContext } from '@/src/context/user';
import { StoreStackParamList } from '@/src/navigation/Store';
import useGetStoreRecipesFeedData, { Recipe } from '@/src/hooks/ReactQuery/recipes/storeFeed';
import config from '@/src/config';
import AnimatedComponent from '../../../../components/Animated';
import ScreenTitle from '@/src/components/ScreenTitle';
import FeedMenu from '@/src/components/FeedMenu';
import Feed from '@/src/components/Feed';
import Modal from '@/src/components/Modal';
import Ilustration from '@/src/components/Ilustration';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import infoIlus from '@/src/assets/svg/ilustrations/Modals/Info.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NutritionFeedRouteProp = RouteProp<StoreStackParamList, 'NutritionStoreFeed'>;

type NutritionFeedNavigationProp = NativeStackNavigationProp<
	StoreStackParamList,
	'RecipeStore'
>;

/**
 * TODO
 * 6. Fix Glitch Bug of Modal Showing unecessary!
 * 7. Fix blank screen while fetching data after showing the loading skeleton and the data is not yet fetched
 */

const FitnessStoreFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<NutritionFeedNavigationProp>();
	const route = useRoute<NutritionFeedRouteProp>();
	const [storeRecipes, setStoreRecipes] = useState<Recipe[]>([]);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [isError, setIsError] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<
		'All' | 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts'
	>('All');
	const { signOutExpired, loggedUser } = useUserContext();
	const { refetch, data, isLoading, isRefetching } = useGetStoreRecipesFeedData({
		page,
		limit: config.pagination.recipes.feed.defaultLimit,
		category: selectedCategory,
	});

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

		return () => {
			setModalVisible(false);
		};
	}, [isError, data?.success, data?.message, modalVisible]);

	// When the selected category changes, resetting the activities list
	useEffect(() => {
		setStoreRecipes([]);
		setTotal(0);
		setPage(1);
		refetch();
	}, [selectedCategory, route?.params?.recipeBoughtId]);

	const handleOnChange = (inView: boolean, id: number): void => {
		// Checking if it's the last item in the list
		if (
			storeRecipes &&
			!isLoading &&
			!isError &&
			inView &&
			id === storeRecipes[storeRecipes.length - 1].id
		) {
			setPage((prev: number) => prev + 1);
		}
	};

	const handleOnRefresh = (): void => {
		setStoreRecipes([]);
		setPage(1);
		setTotal(0);
		refetch();
	};

	const handleOnPressCard = (id: number): void => {
		navigation.navigate('RecipeStore', { recipeId: id });
	};

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}
		if (data && data.data && data.data.recipes?.length > 0) {
			// Checking if there are duplicates (if so, remove them)
			const filteredStoreRecipes = data?.data?.recipes?.filter((recipe: Recipe) => {
				return storeRecipes.findIndex((a: Recipe) => a.id === recipe.id) === -1;
			});

			// // Adding the new recipes to the list
			setStoreRecipes((prev: Recipe[]) => [...prev, ...filteredStoreRecipes]);
			setTotal(data?.data?.total);
		}
		//! Do not add store activities (storeRecipes) to the dependencies array (it will cause an infinite loop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isRefetching]);

	return (
		<AnimatedComponent animation="FadeIn">
			<IOScrollView
				keyboardShouldPersistTaps="handled"
				scrollEventThrottle={50}
				showsVerticalScrollIndicator={false}
				className="flex-1 bg-primary-50"
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={handleOnRefresh}
						colors={['#0C2C7E']}
					/>
				}
			>
				<ScreenTitle
					type="Store"
					points={loggedUser?.points ?? 0}
					label="Nutrition"
					onPress={() => navigation.goBack()}
				/>
				<View className="flex-1 mt-4 px-2 sm:px-4 md:px-6 lg:px-8">
					<FeedMenu
						type="StoreNutrition"
						items={['All', 'Soups', 'Main Dishes', 'Salads', 'Desserts']}
						setSelectedStoreNutritionCategory={setSelectedCategory}
						nutritionCategory={selectedCategory}
					/>

					<Text
						className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-secondary-700 font-quicksand-medium
			  leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px] text-center tracking-[0.8px] mt-2"
					>
						Select your preference recipe to buy
					</Text>

					<Feed
						type="recipes"
						data={storeRecipes}
						handleOnChange={handleOnChange}
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						category={selectedCategory}
						messageAPI={data?.message}
						recipes={storeRecipes}
						onPressCard={handleOnPressCard}
					/>

					{!isLoading && storeRecipes.length > 0 && storeRecipes.length >= total && (
						<View className="flex-1 w-full items-center pb-8 pt-8 sm:pb-10 sm:pt-10 md:pb-12 md:pt-12 lg:pb-14 lg:pt-14">
							<Ilustration
								ilustration={LogoIlus}
								styleClass="w-36 h-14 sm:w-40 sm:h-16 md:w-44 md:h-18 lg:w-48 lg:h-20"
							/>
						</View>
					)}
				</View>
			</IOScrollView>
			{/* Session Expire Warning  */}

			<Modal
				type="expiredWarning"
				ilustration={infoIlus}
				message="Your session has expired ! Sign Out and Sign In again to continue."
				isModalVisible={modalVisible}
				onPress={() => {
					setModalVisible(false);
					signOutExpired();
				}}
			/>
		</AnimatedComponent>
	);
};

export default FitnessStoreFeed;
