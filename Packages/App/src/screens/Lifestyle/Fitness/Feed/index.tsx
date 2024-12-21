import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
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
import Ilustration from '@/src/components/Ilustration';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import infoIlus from '@/src/assets/svg/ilustrations/Modals/Info.svg';

type FitnessFeedRouteProp = RouteProp<LifestyleStackParamList, 'FitnessFeed'>;
type FitnessFeedNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'FitnessFeed'
>;

const FitnessFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<FitnessFeedNavigationProp>();
	const route = useRoute<FitnessFeedRouteProp>();
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [intensity, setIntensity] = useState<string>('');
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const { signOut } = useUserContext();
	const { refetch, data, isLoading, isError, isRefetching } = useGetActivitiesFeedData({
		page,
		limit: config.pagination.activities.feed.defaultLimit,
		category: selectedCategory,
		intensity: route.params?.intensity,
	});

	useEffect(() => {
		if (
			isError ||
			data?.message == 'Missing auth token or refresh token' ||
			data?.message == 'Refresh token has expired'
		) {
			setModalVisible(true);
		}
	}, [isError, data?.message, modalVisible]);

	const toogleModal = (): void => {
		setModalVisible(!modalVisible);
	};

	// If one of the filters changes, resetting the page to 1
	useEffect(() => {
		setActivities([]);
		setTotal(0);
		setPage(1);
		refetch();
	}, [intensity, selectedCategory]);

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
		// not incrementing the page if the user is filtering by intensity
		if (intensity) {
			setPage(1);
		}
	};

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		setActivities([]);
		setPage(1);
		setTotal(0);
		refetch();
	};

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}

		if (data && data.data && data.data.activities?.length > 0) {
			// // Checking if there are duplicates (if so, remove them)
			const filteredActivities = data?.data?.activities?.filter((activity: Activity) => {
				return activities.findIndex((a: Activity) => a.id === activity.id) === -1;
			});

			// // Adding the new activities to the list
			setActivities((prev: Activity[]) => [...prev, ...filteredActivities]);
			setTotal(data?.data?.total);
		}

		if (isError) {
			setActivities([]);
			setTotal(0);
		}

		//! Do not add activities to the dependencies array (it will cause an infinite loop)
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
					type="Filter"
					label="Fitness"
					onPress={() => navigation.goBack()}
					onFilterBtnPress={() => console.log('Filter button pressed')}
				/>
				<View className="flex-1 mt-4 px-2 sm:px-4 md:px-6 lg:px-8">
					<FeedMenu
						type="Fitness"
						items={['All', 'Cardio', 'Yoga', 'Muscles', 'Premium']}
						setSelectedCategory={setSelectedCategory}
						category={selectedCategory}
					/>

					<Feed
						type="activities"
						data={activities}
						handleOnChange={handleOnChange}
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						category={selectedCategory}
						messageAPI={data?.message}
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
				type="ExpiredWarning"
				ilustration={infoIlus}
				message="Your session has expired ! Sign Out and Sign In again to continue."
				toogleModal={toogleModal}
				isModalVisible={modalVisible}
				setModalVisible={setModalVisible}
				onPress={signOut}
			/>
		</AnimatedComponent>
	);
};

export default FitnessFeed;
