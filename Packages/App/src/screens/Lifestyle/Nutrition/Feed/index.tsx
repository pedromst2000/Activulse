import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useGetRecipesFeedData, { Recipe } from '@/src/hooks/ReactQuery/recipes/feed';
import config from '@/src/config';
import { useUserContext } from '@/src/context/user';
import AnimatedComponent from '../../../../components/Animated';
import ScreenTitle from '@/src/components/ScreenTitle';
import Input from '@/src/components/Input';
import FeedMenu from '@/src/components/FeedMenu';
import Feed from '@/src/components/Feed';
import Modal from '@/src/components/Modal';
import Ilustration from '@/src/components/Ilustration';
import SearchI from '@/src/assets/svg/icons/SearchIcon.svg';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import infoIlus from '@/src/assets/svg/ilustrations/Modals/Info.svg';

type NutritionFeedRouteProp = RouteProp<LifestyleStackParamList, 'NutritionFeed'>;

type NutritionFeedNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'NutritionFeed'
>;

/**
 * TODO:
 * 4. Fix Glitch Bug of Modal Showing unecessary!
 * Fix blank screen while fetching data after showing the loading skeleton and the data is not yet fetched
 */

const NutritionFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<NutritionFeedNavigationProp>();
	const route = useRoute<NutritionFeedRouteProp>();
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [isError, setIsError] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<
		'All' | 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts' | 'Premium'
	>('All');
	const { signOutExpired } = useUserContext();
	const { refetch, data, isLoading, isRefetching } = useGetRecipesFeedData({
		page,
		limit: config.pagination.recipes.feed.defaultLimit,
		diet: route.params.diet || 'DASH',
		category: selectedCategory,
		title: search,
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

	// If one of the filters changes, resetting the page to 1
	useEffect(() => {
		setRecipes([]);
		setTotal(0);
		setPage(1);
		refetch();
	}, [search, selectedCategory]);

	const handleOnChange = (inView: boolean, id: number): void => {
		// Checking if it's the last item in the list
		if (recipes && !isLoading && !isError && inView && id === recipes[recipes.length - 1].id) {
			setPage((prev: number) => prev + 1);
		}
	};

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		setRecipes([]);
		setPage(1);
		setTotal(0);
		refetch();
	};

	const handleOnPressCard = (id: number): void => {
		navigation.navigate('Recipe', { recipeId: id });
	};

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}

		if (data && data.data && data.data.recipes?.length > 0) {
			// // Check if there are duplicates (if so, remove them)
			const filteredRecipes = data?.data?.recipes?.filter((recipe: Recipe) => {
				return recipes.findIndex((a: Recipe) => a.id === recipe.id) === -1;
			});

			setRecipes((prev: Recipe[]) => [...prev, ...filteredRecipes]);
			setTotal(data?.data?.total);
		}

		//! Do not add recipes to the dependencies array (it will cause an infinite loop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isRefetching]);

	useEffect(() => {
		if (modalVisible) {
			const timeout = setTimeout(() => setModalVisible(false), 5000); // Optional timeout to auto-hide modal
			return () => clearTimeout(timeout);
		}
	}, [modalVisible]);

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
				<ScreenTitle label={route.params.diet} onPress={() => navigation.goBack()} />
				<View className="flex-1 mt-2 bg-primary-50">
					<View className="w-full flex-1 justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
						<Input
							// placeholder={`isModalVisible=${modalVisible}`}
							placeholder="Search for recipe"
							onChange={(text: string) => setSearch(text)}
							value={search}
							icon={SearchI}
							textInputClassName="w-full pl-3 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]"
							iconClassName="pl-4"
							widthIcon={20}
							heightIcon={20}
							heightInput="h-10 sm:h-12 md:h-14 lg:h-16"
							widthInput="w-full sm:w-72 md:w-96 lg:w-[500px]"
						/>
					</View>
					<FeedMenu
						type="Nutrition"
						items={['All', 'Soups', 'Main Dishes', 'Salads', 'Desserts', 'Premium']}
						setSelectedNutritionCategory={setSelectedCategory}
						nutritionCategory={selectedCategory}
					/>

					<Feed
						type="recipes"
						data={recipes}
						handleOnChange={handleOnChange}
						isLoading={isLoading}
						isRefetching={isRefetching}
						category={selectedCategory}
						search={search}
						isError={isError}
						messageAPI={data?.message}
						recipes={recipes}
						onPressCard={handleOnPressCard}
					/>

					{!isLoading && recipes.length > 0 && recipes.length >= total && (
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

export default NutritionFeed;
