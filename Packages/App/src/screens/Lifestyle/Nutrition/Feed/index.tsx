import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import useGetRecipesFeedData, { Recipe } from '@/src/hooks/ReactQuery/recipes/feed';
import SearchI from '@/src/assets/svg/icons/SearchIcon.svg';
import AnimatedComponent from '../../../../components/Animated';
import ScreenTitle from '@/src/components/ScreenTitle';
import Input from '@/src/components/Input';
import FeedMenu from '@/src/components/FeedMenu';
import Feed from '@/src/components/Feed';
import config from '@/src/config';

type NutritionFeedRouteProp = RouteProp<LifestyleStackParamList, 'NutritionFeed'>;

const NutritionFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<NutritionFeedRouteProp>();
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [search, setSearch] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const { refetch, data, isLoading, isError, isRefetching } = useGetRecipesFeedData({
		page,
		limit: config.pagination.recipes.feed.defaultLimit,
		diet: route.params.diet,
		category: selectedCategory,
		title: search,
	});

	useEffect(() => {
		console.log(`messageAPI: ${data?.message}`);
	}, []);

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
			// Checking if there are more recipes to fetch
			if (recipes?.length >= total) {
				return;
			}

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

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}

		if (data && data.data && data.data.recipes?.length > 0) {
			// Check if there are duplicates (if so, remove them)
			const filteredRecipes = data?.data?.recipes?.filter((recipe: Recipe) => {
				return recipes.findIndex((a: Recipe) => a.id === recipe.id) === -1;
			});

			setRecipes((prev: Recipe[]) => [...prev, ...filteredRecipes]);
			setTotal(data?.data?.total);
		}

		if (isError) {
			setRecipes([]);
			setTotal(0);
		}

		//! Do not add recipes to the dependencies array (it will cause an infinite loop)
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
				<ScreenTitle label={route.params.diet} onPress={() => navigation.goBack()} />
				<View className="flex-1 mt-2 bg-primary-50">
					<View className="w-full flex-1 justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
						<Input
							placeholder="Search Recipe"
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
						items={['All', 'Soups', 'Main Dishes', 'Salads', 'Desserts', 'Premium']}
						setSelectedCategory={setSelectedCategory}
						category={selectedCategory}
					/>

					<Feed
						data={recipes}
						handleOnChange={handleOnChange}
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						category={selectedCategory}
						messageAPI={data?.message}
					/>
				</View>
			</IOScrollView>
		</AnimatedComponent>
	);
};

export default NutritionFeed;
