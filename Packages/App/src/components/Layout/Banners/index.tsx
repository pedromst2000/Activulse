import { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useUserContext } from '@/src/context/user';
import { IOScrollView } from 'react-native-intersection-observer';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import config from '@/src/config';
import { APIResponse } from '../../../api/types';
import useGetBannersFeedData, { Banner } from '@/src/hooks/ReactQuery/banners/feed';
import useBuyBanner from '@/src/hooks/ReactQuery/banners/buy';
import Feed from '../../Feed';
import Modal from '../../Modal';
import Ilustration from '../../Ilustration';
import AnimatedComponent from '@/src/components/Animated';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import InfoIlus from '@/src/assets/svg/icons/InfoIcon.svg';
import BannerIlus from '@/src/assets/svg/ilustrations/Modals/Banner.svg';
import utils from '@/src/utils';
import timers from '@/src/utils/timers';
import Message from '../../Message';

/**
 * TODO:
 * 4. Fix Glitch Bug of Modal Showing unecessary!
 * Fix blank screen while fetching data after showing the loading skeleton and the data is not yet fetched
 */

type selectedBanner = {
	id: number;
	price: number;
};

const BannersLayout: React.FC = (): React.JSX.Element => {
	const [banners, setBanners] = useState<Banner[]>([]);
	const [selectedBanner, setSelectedBanner] = useState<selectedBanner | null>({
		id: 0,
		price: 0,
	});
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [isError, setIsError] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const [messageAPI, setMessageAPI] = useState<string>('');

	const { signOutExpired, loggedUser, updateUser } = useUserContext();
	const {
		refetch,
		data: getBannersData,
		isLoading,
		isRefetching,
	} = useGetBannersFeedData({
		page,
		limit: config.pagination.banners.feed.defaultLimit,
	});

	const { mutateAsync, data: buyData } = useBuyBanner({
		id: selectedBanner?.id ?? 0,
	});
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const scrollViewRef = useRef<ScrollView | null>(null);

	// !! TO BE REFRACTORED
	useEffect(() => {
		if (
			getBannersData?.success === false ||
			getBannersData?.message === 'Network Error' ||
			buyData?.success === false ||
			buyData?.message === 'Network Error'
		) {
			setIsError(true);
		}

		if (getBannersData?.success === true || buyData?.success === true) {
			setIsError(false);
		} else if (
			getBannersData?.message == 'Missing auth token or refresh token' ||
			getBannersData?.message == 'Refresh token has expired' ||
			buyData?.message == 'Missing auth token or refresh token' ||
			buyData?.message == 'Refresh token has expired'
		) {
			setModalVisible(true);
		}
	}, [
		isError,
		getBannersData?.success,
		getBannersData?.message,
		buyData?.success,
		buyData?.message,
		modalVisible,
	]);

	const handleOnChange = (inView: boolean, id: number): void => {
		if (
			banners &&
			!isLoading &&
			!isError &&
			!isRefetching &&
			inView &&
			id === banners[banners.length - 1].id
		) {
			setPage((prev: number) => prev + 1);
		}
	};

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		setBanners([]);
		setPage(1);
		setTotal(0);
		refetch();
	};

	const handleOnPressCard = (id: number): void => {
		setModalVisible(true);
		setSelectedBanner({
			id,
			price: banners.find((a: Banner) => a.id === id)?.price ?? 0,
		});
	};

	const handleOnBuyBanner = async (): Promise<void> => {
		setShowError(false); // Hide the error message before new validation
		clearTimeout(timeoutRef.current!);

		// Send the request
		await mutateAsync(
			{},
			{
				onSuccess: async (resData: APIResponse): Promise<void> => {
					if (resData.success) {
						setShowSuccess(true);
						setMessageAPI(resData.message);
						timeoutRef.current = setTimeout(() => {
							setShowSuccess(false);
						}, timers.SUCCESS_DELAY);
						// deleting the banner from the list after buying it
						const updatedBanners = banners.filter((a: Banner) => a.id !== selectedBanner?.id);
						setBanners(updatedBanners);
						// updating the user points
						const discount = selectedBanner?.price ?? 0;

						const update = {
							points: loggedUser?.points! - discount,
						};

						if (loggedUser) {
							updateUser({ ...loggedUser, ...update });
						}
					}
				},
				onError: (error: any): void => {
					const errorMessage = utils.error.getMessage(error as Error);
					setMessageAPI(errorMessage);
					setShowError(true);
					timeoutRef.current = setTimeout(() => {
						setShowError(false);
					}, timers.ERROR_MESSAGE_TIMEOUT);
				},
			},
		);
	};

	useEffect(() => {
		if (isLoading || isRefetching) {
			return;
		}

		if (getBannersData && getBannersData.data && getBannersData.data.banners?.length > 0) {
			const filteredBanners = getBannersData?.data?.banners?.filter((banner: Banner) => {
				return banners.findIndex((a: Banner) => a.id === banner.id) === -1;
			});

			setBanners((prev: Banner[]) => [...prev, ...filteredBanners]);
			setTotal(getBannersData?.data?.total);
		}

		//! Do not add banners to the dependencies array (it will cause an infinite loop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getBannersData, isRefetching, isLoading]);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current!); // Clear the timeout when the component unmounts
		};
	}, []);

	// To scroll to the top when the error message is shown
	useEffect(() => {
		if ((showError || showSuccess) && scrollViewRef.current) {
			scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to the top
		}
	}, [showError, showSuccess]);

	return (
		<AnimatedComponent animation="FadeIn">
			<IOScrollView
				ref={scrollViewRef}
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
				<View className="flex justify-center items-center">
					{/* Message */}
					<AnimatedComponent animation="FadeIn">
						{showError ? (
							<Message type="error" message={messageAPI} />
						) : showSuccess ? (
							<Message type="success" message={messageAPI} />
						) : null}
					</AnimatedComponent>

					{/* Title & Subtitle */}
					<View className="mt-8 mb-6">
						<Text
							className="text-[22px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] text-secondary-700 font-merriweather-bold
			  leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] xl:leading-[32px] text-center tracking-[0.8px]"
						>
							Customize Your Profile with Exclusive Banners
						</Text>
						<Text
							className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-secondary-700 font-quicksand-medium
			  leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px] text-center tracking-[0.8px] mt-2"
						>
							Select your preference banner to buy
						</Text>
					</View>
					{/* Banners */}
					<Feed
						type="storeBanners"
						data={banners}
						handleOnChange={handleOnChange}
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						messageAPI={getBannersData?.message}
						banners={banners}
						onPressCard={handleOnPressCard}
					/>

					{!isLoading && banners.length > 0 && banners.length >= total && (
						<View className="flex-1 w-full items-center pb-8 pt-8 sm:pb-10 sm:pt-10 md:pb-12 md:pt-12 lg:pb-14 lg:pt-14">
							<Ilustration
								ilustration={LogoIlus}
								styleClass="w-36 h-14 sm:w-40 sm:h-16 md:w-44 md:h-18 lg:w-48 lg:h-20"
							/>
						</View>
					)}
				</View>
			</IOScrollView>

			<Modal
				type={
					buyData?.message.includes('expired') || getBannersData?.message.includes('expired')
						? 'expiredWarning'
						: 'buyStoreItem'
				}
				ilustration={
					buyData?.message.includes('expired') || getBannersData?.message.includes('expired')
						? InfoIlus
						: BannerIlus
				}
				message={
					buyData?.message.includes('expired') || getBannersData?.message.includes('expired')
						? 'Your session has expired ! Sign Out and Sign In again to continue'
						: `Are you sure you want to buy this banner for ${selectedBanner?.price} heart points ?`
				}
				isModalVisible={modalVisible}
				onPress={() => {
					setModalVisible(false);
					signOutExpired();
				}}
				onPressYes={() => {
					setModalVisible(false);
					handleOnBuyBanner();
				}}
				onPressNo={() => {
					setModalVisible(false);
				}}
			/>
		</AnimatedComponent>
	);
};

export default BannersLayout;
