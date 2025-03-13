import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import { useUserContext } from '@/src/context/user';
import utils from '@/src/utils';
import useGetActivityDetails, { Activity } from '@/src/hooks/ReactQuery/activities/details';
import useAddFavoriteActivity from '@/src/hooks/ReactQuery/activities/addFavoriteActivity';
import useDeleteFavoriteActivity from '@/src/hooks/ReactQuery/activities/deleteFavoriteActivity';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ActivityRouteProp = RouteProp<LifestyleStackParamList, 'Activity'>;
type ActivityDetailsNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'Activity'
>;

/**
 *  * TODO (bugs)
 * 4. Fix Glitch Bug of Modal Showing unecessary!
 * Add Button skeleton loader (excluding activity details with workouts)
 */

const ActivityDetails: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<ActivityDetailsNavigationProp>();
	const route = useRoute<ActivityRouteProp>();
	const [activity, setActivity] = useState<Activity | null>(null);
	const [isToogleFav, setIsToogleFav] = useState<boolean>(false);
	const [isMyFav, setIsMyFav] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [showMessage, setShowMessage] = useState<string>('');
	const { signOut } = useUserContext();

	const { isLoading, data, isRefetching, refetch } = useGetActivityDetails({
		id: route.params.activityId,
	});

	const { mutateAsync: mutateAsyncAdd, data: addData } = useAddFavoriteActivity({
		id: route.params.activityId,
	});
	const { mutateAsync: mutateAsyncDelete, data: deleteData } = useDeleteFavoriteActivity({
		id: route.params.activityId,
	});

	useEffect(() => {
		if (data?.data) {
			setActivity(data.data);
			setIsMyFav(data.data.isMyFavorite ?? false);
		}
	}, [data?.data]);

	useEffect(() => {
		if (data?.success === false || data?.message === 'Network Error') {
			setActivity(null);
		}

		if (
			data?.message === 'Missing auth token or refresh token' ||
			data?.message === 'Refresh token has expired'
		) {
			setModalVisible(true);
		}
	}, [data?.success, data?.message]);

	useEffect(() => {
		if (
			addData?.message === 'Missing auth token or refresh token' ||
			addData?.message === 'Refresh token has expired' ||
			deleteData?.message === 'Missing auth token or refresh token' ||
			deleteData?.message === 'Refresh token has expired' ||
			addData?.message === 'Activity added to favorites !' ||
			deleteData?.message === 'Activity removed from favorites !'
		) {
			setModalVisible(true);
		}
	}, [addData?.message, deleteData?.message]);

	useEffect(() => {
		console.log(`message: ${data?.message}`);
	}, [data?.message]);

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		refetch();
	};

	const handleOnToogleFav = (): void => {
		utils.toogleFav({
			id: route.params.activityId,
			isToogleFav,
			setIsToogleFav,
			isMyFav,
			setIsMyFav,
			setModalVisible,
			setShowMessage,
			mutateAsyncAdd,
			mutateAsyncDelete,
		});
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
				{!isLoading && !isRefetching && data?.success && (
					<View className="flex-1 bg-primary-50 pb-8">
						<DetailsHeader onToggleFav={handleOnToogleFav} isMyFav={isMyFav} />

						<DetailsMedia
							type={activity?.image?.url ? 'image' : 'video'}
							imgSrc={activity?.image?.url || null}
							videoSrc={activity?.video?.url || null}
						/>

						<DetailsCardInfo
							type="activity"
							data={activity}
							navigateTo={() =>
								navigation.navigate('PracticeActivity', {
									title: activity?.title ?? '',
									intensity: activity?.intensity ?? '',
									workouts: activity?.workouts ?? [],
									duration: activity?.duration ?? 0,
								})
							}
						/>
					</View>
				)}

				{(isLoading || isRefetching) && (
					<LoadingSkeleton
						type={activity?.workouts ? 'WorkoutPlanDetails' : 'ActivityDetails'}
					/>
				)}

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
					if (addData?.message.includes('added') || deleteData?.message.includes('removed')) {
						console.log('Modal Closed');
						setModalVisible(false);
					} else if (data?.message == 'Network Error' || data?.message.includes('expired')) {
						signOut();
					}
				}}
			/>
		</AnimatedComponent>
	);
};

export default ActivityDetails;
