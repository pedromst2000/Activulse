import React, { useEffect, useRef, useState, useReducer, useMemo } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useAudioPlayer } from 'expo-audio';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import AnimatedComponent from '../../../../components/Animated';
import Modal from '@/src/components/Modal';
import GoBackBtn from '@/src/components/GoBackBtn';
import Intensity from '@/src/components/Intensity';
import Icon from '@/src/components/Icon';
import ControllersTimer from '@/src/components/ControllersTimer';
import Ilustration from '@/src/components/Ilustration';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import finishedActivityIlus from '@/src/assets/svg/ilustrations/Modals/finishedActivity.svg';
import TimeI from '@/src/assets/svg/icons/TimeIcon.svg';

type PracticeActivityRouteProp = RouteProp<LifestyleStackParamList, 'PracticeActivity'>;

const PracticeActivity: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<PracticeActivityRouteProp>();
	const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
	const [isPause, setIsPause] = useState<boolean>(true);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [time, setTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(route.params.duration * 60); // Convert minutes to seconds
	const [dataPractice, setDataPractice] = useReducer(
		(state: any, newState: any) => ({ ...state, ...newState }),
		{
			title: '',
			intensity: '',
			workouts: [],
		},
	);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const audioSource = useMemo(() => require('../../../../assets/sounds/clock-alarm.mp3'), []);
	const player = useAudioPlayer(audioSource);

	useEffect(() => {
		setDataPractice({
			title: route.params.title,
			intensity: route.params.intensity,
			workouts: route.params.workouts,
		});

		return () => {
			clearInterval(intervalRef.current as NodeJS.Timeout);
		};
	}, [
		route.params.title,
		route.params.intensity,
		route.params.workouts,
		route.params.duration,
	]);

	useEffect(() => {
		if (time === duration) {
			setIsPause(true);
			setIsFinished(true);
			clearInterval(intervalRef.current as NodeJS.Timeout);
			setModalVisible(true);
			if (isSoundOn) {
				player.play();
			} else player.pause();
		}
	}, [time, isFinished, isPause, modalVisible, isSoundOn]);

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
	};

	const handleSwitch = (): void => {
		if (isPause) {
			intervalRef.current = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);

			setIsPause(false);
		} else {
			clearInterval(intervalRef.current as NodeJS.Timeout);
			setIsPause(true);
		}
	};

	const handleRestart = (): void => {
		setTime(0);
		setIsPause(true);
		clearInterval(intervalRef.current as NodeJS.Timeout);
	};

	const handleSound = (): void => {
		setIsSoundOn(!isSoundOn);

		if (isSoundOn) {
			player.pause();
		} else {
			player.play();
		}
	};

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<ScrollView
				keyboardShouldPersistTaps="handled"
				scrollEventThrottle={50}
				showsVerticalScrollIndicator={false}
				className="bg-primary-50"
			>
				<View className="w-full px-6 py-10">
					<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} disable={!isPause} />
				</View>

				<View className="flex flex-col items-center justify-center w-full space-y-8">
					<View className="space-y-4">
						{/* Title */}
						<View>
							<Text className="font-merriweather-bold text-secondary-700 text-xl lg:text-4xl tracking-[0.5px] leading-8 lg:leading-14 w-full max-w-lg">
								{dataPractice.title}
							</Text>
						</View>

						{/* Intensity */}
						<View className="flex flex-row items-center justify-center mt-2">
							<Intensity
								typeBullet="blue"
								intensityVal={
									dataPractice.intensity === 'Low'
										? 1
										: dataPractice.intensity === 'Moderate I'
											? 2
											: dataPractice.intensity === 'Moderate II'
												? 3
												: dataPractice.intensity === 'Moderate III'
													? 4
													: 5
								}
								iconStyles="w-8 h-8"
								bulletSizes="w-3 h-3"
							/>
						</View>

						{/* Duration */}
						<View className="flex-row items-center justify-center mt-2 space-x-2">
							<Icon icon={TimeI} width={20} height={20} />
							<Text className="font-quicksand-bold text-secondary-700 text-base lg:text-lg">
								{route.params.duration} minutes
							</Text>
						</View>
					</View>

					{/* Timer */}
					<View className="mt-10 flex flex-row items-center justify-center">
						<CircularProgress
							value={time === 0 || duration === 0 ? 0 : (time / duration) * 100}
							maxValue={100}
							duration={1000}
							radius={105}
							progressValueStyle={{
								fontSize: 34,
								color: '#0C2C7E',
							}}
							progressValueColor="#0C2C7E"
							activeStrokeColor="#FFA653"
							activeStrokeWidth={12}
							inActiveStrokeColor="#FFDAB9"
							inActiveStrokeWidth={12}
							clockwise={true}
							showProgressValue={false}
						/>
						{/* Custom Timer Display */}
						<Text
							style={{
								position: 'absolute',
								fontSize: 34,
								fontWeight: 'bold',
								color: '#0C2C7E',
							}}
						>
							{formatTime(time)}
						</Text>
					</View>

					{/* Controllers Timer */}
					<ControllersTimer
						currentTime={time}
						isFinished={isFinished}
						handleSwitch={handleSwitch}
						handleRestart={handleRestart}
						handleSound={handleSound}
						isPause={isPause}
						isSoundOn={isSoundOn}
					/>

					{/* Workout Plan */}
					{route.params?.workouts && (
						<View className="flex-col justify-center items-center space-y-2 w-full max-w-lg">
							{route.params?.workouts?.map((item: any, index: number) => (
								<View
									className="w-full flex items-center justify-center pt-2"
									key={`${item.id}-${index}`}
								>
									<Text
										className={`${index % 2 !== 0 ? 'font-quicksand-bold' : 'font-quicksand-medium'} text-secondary-700 text-[14.2px] md:text-[15px]`}
									>
										{item.workout}
									</Text>
								</View>
							))}
						</View>
					)}
				</View>

				{/* Logo */}
				<View className="flex-1 w-full items-center pb-8 pt-10">
					<Ilustration
						ilustration={LogoIlus}
						styleClass="w-36 h-14 sm:w-40 sm:h-16 md:w-44 md:h-18 lg:w-48 lg:h-20"
					/>
				</View>
			</ScrollView>
			{/* Modal */}
			<Modal
				type="finishedExercise"
				ilustration={finishedActivityIlus}
				message="Time's up! You crushed that workout like a champ!"
				isModalVisible={modalVisible}
				onPress={() => {
					setModalVisible(false);
					player.pause();
					navigation.goBack();
				}}
			/>
		</AnimatedComponent>
	);
};

export default PracticeActivity;
