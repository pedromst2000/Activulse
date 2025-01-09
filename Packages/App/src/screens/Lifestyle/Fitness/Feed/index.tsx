import { useEffect, useState } from 'react';
import { RefreshControl, View, Text } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import config from '@/src/config';
import useGetActivitiesFeedData, { Activity } from '@/src/hooks/ReactQuery/activities/feed';
import AnimatedComponent from '../../../../components/Animated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import { useUserContext } from '@/src/context/user';
import ScreenTitle from '@/src/components/ScreenTitle';
import FeedMenu from '@/src/components/FeedMenu';
import Feed from '@/src/components/Feed';
import Modal from '@/src/components/Modal';
import Button from '@/src/components/Button';
import Ilustration from '@/src/components/Ilustration';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import infoIlus from '@/src/assets/svg/ilustrations/Modals/Info.svg';
import RemoveIcon from '@/src/assets/svg/icons/ErrorIcon.svg';

type FitnessFeedRouteProp = RouteProp<LifestyleStackParamList, 'FitnessFeed'>;
type FitnessFeedNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'FitnessFeed'
>;

const FitnessFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<FitnessFeedNavigationProp>();
	const route = useRoute<FitnessFeedRouteProp>();
	const [activities, setActivities] = useState<Activity[]>([]);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [isError, setIsError] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [isClearFilter, setIsClearFilter] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<
		'All' | 'Cardio' | 'Yoga' | 'Muscles' | 'Premium'
	>('All');
	const { signOut } = useUserContext();
	const { refetch, data, isLoading, isRefetching } = useGetActivitiesFeedData({
		page,
		limit: config.pagination.activities.feed.defaultLimit,
		category: selectedCategory,
		intensity: route.params?.intensity,
	});

	useEffect(() => {
		setIsClearFilter(!!route.params?.intensity);

		return () => {
			setIsClearFilter(false);
		};
	}, [route.params?.intensity]);

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

	useEffect(() => {
		setActivities([]);
		setTotal(0);
		setPage(1);
		refetch();
	}, [route.params?.intensity, selectedCategory]);

	const handleOnChange = (inView: boolean, id: number): void => {
		// Checking if it's the last item in the list
		if (
			activities &&
			!isLoading &&
			!isError &&
			inView &&
			id === activities[activities.length - 1].id
		) {
			setPage((prev: number) => prev + 1);
		}
	};

	const handleOnRefresh = (): void => {
		setActivities([]);
		setPage(1);
		setTotal(0);
		refetch();
	};

	const handleClearFilter = (): void => {
		refetch();
		setIsClearFilter(true);
		navigation.setParams({ intensity: null });
	};

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}

		if (data && data.data && data.data.activities?.length > 0) {
			// Checking if there are duplicates (if so, remove them)
			const filteredActivities = data?.data?.activities?.filter((activity: Activity) => {
				return activities.findIndex((a: Activity) => a.id === activity.id) === -1;
			});

			// // Adding the new activities to the list
			setActivities((prev: Activity[]) => [...prev, ...filteredActivities]);
			setTotal(data?.data?.total);
		}

		//! Do not add activities to the dependencies array (it will cause an infinite loop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isRefetching]);

	/**
	 * TODO
	 * 6. Fix Glitch Bug of Modal Showing unecessary!
	 */

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
					type="Filter"
					label="Fitness"
					onPress={() => navigation.goBack()}
					onFilterBtnPress={() => navigation.navigate('IntensityFilter')}
				/>
				<View className="flex-1 mt-4 px-2 sm:px-4 md:px-6 lg:px-8">
					<FeedMenu
						type="Fitness"
						items={['All', 'Cardio', 'Yoga', 'Muscles', 'Premium']}
						setSelectedFitnessCategory={setSelectedCategory}
						fitnessCategory={selectedCategory}
					/>

					{/* Clear Intensity Filter Option Feed */}
					{isClearFilter && (
						<View
							className="flex  justify-center items-center pt-4 pb-4
						sm:pt-6 sm:pb-6 md:pt-8 md:pb-8 lg:pt-10 lg:pb-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
						>
							<Button
								onPress={handleClearFilter}
								styleClass="px-6 py-2 space-x-2  sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 rounded-[30px]"
							>
								<RemoveIcon height={15} width={15} />

								<Text className="font-quicksand-bold text-secondary-700 text-[14.2px] sm:text-[16px] md:text-[18px] lg:text-[20px]">
									Clear Filter
								</Text>
							</Button>
						</View>
					)}

					<Feed
						type="activities"
						data={activities}
						handleOnChange={handleOnChange}
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						category={selectedCategory}
						messageAPI={data?.message}
						activities={activities}
					/>

					{!isLoading && activities.length > 0 && activities.length >= total && (
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
					signOut();
				}}
			/>
		</AnimatedComponent>
	);
};

export default FitnessFeed;
