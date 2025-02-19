import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import GoBackBtn from '../GoBackBtn';

type Props = {
	type?:
		| 'FeedRecipes'
		| 'FeedActivities'
		| 'RecipeDetails'
		| 'ActivityDetails'
		| 'WorkoutPlanDetails'
		| 'StoreDetails'
		| 'StoreFeed'
		| 'Banners'
		| null;
	category?: string;
};

const LoadingSkeleton: React.FC<Props> = ({ type, category }): React.JSX.Element => {
	const navigation = useNavigation();
	const pulseAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		// Infinite pulse animation
		const pulse = Animated.loop(
			Animated.sequence([
				Animated.timing(pulseAnim, {
					toValue: 0.8,
					duration: 700,
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnim, {
					toValue: 1,
					duration: 700,
					useNativeDriver: true,
				}),
			]),
		);
		pulse.start();

		// Cleanup animation on unmount
		return () => pulse.stop();
	}, [pulseAnim]);

	const animatedStyle = {
		opacity: pulseAnim,
	};

	return (
		<>
			{type?.includes('Feed') || type === 'Banners' ? (
				<View
					className=" rounded-[30px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden w-[350px] sm:w-[300px] md:w-[320px] h-[255px] sm:h-[210px] md:h-[220px] 
					bg-primary-50 
				"
				>
					{/* Placeholder Image */}
					<Animated.View style={animatedStyle} className="w-full h-full bg-gray-400" />

					{/* Content Container */}
					<View className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-10">
						{/* Title */}
						<View className="mb-2">
							<Animated.View
								style={animatedStyle}
								className="h-4 bg-gray-300 rounded w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3"
							/>
						</View>

						{/* Labels */}
						{type !== 'Banners' && (
							<View className="flex flex-row flex-wrap items-center space-x-2 mb-[130px] sm:mb-[100px] md:mb-[80px] lg:mb-[60px]">
								<Animated.View
									style={animatedStyle}
									className="bg-gray-300 px-3 py-1 rounded-full w-20 h-6 sm:w-18 sm:h-5 md:w-16 md:h-4 lg:w-14 lg:h-3"
								/>

								{category == 'Premium' && (
									<Animated.View
										style={animatedStyle}
										className="bg-gray-500 px-3 py-1 rounded-full w-20 h-6 sm:w-18 sm:h-5 md:w-16 md:h-4 lg:w-14 lg:h-3"
									/>
								)}
							</View>
						)}

						{/* Time Display && Intensity */}
						<View className="flex flex-row justify-between items-center">
							{/* Time Display */}
							<View className="flex-row items-center space-x-2">
								<Animated.View
									style={animatedStyle}
									className="w-[18px] h-[18px] bg-gray-300 rounded-full sm:w-[16px] sm:h-[16px] md:w-[14px] md:h-[14px] lg:w-[12px] lg:h-[12px]"
								/>
								<Animated.View
									style={animatedStyle}
									className="h-4 bg-gray-300 rounded w-20 sm:w-18 md:w-16 lg:w-14"
								/>
							</View>

							{type === 'FeedActivities' && (
								<View className="flex-row items-center">
									<Animated.View
										style={animatedStyle}
										className="w-[18px] h-[18px] bg-gray-300 rounded-full sm:w-[16px] sm:h-[16px] md:w-[14px] md:h-[14px] lg:w-[12px] lg:h-[12px]"
									/>
									<View className="flex-row ml-2">
										{[...Array(5)].map((_, index) => (
											<Animated.View
												key={index}
												style={animatedStyle}
												className="w-[10px] h-[10px] bg-gray-300 rounded-full mx-1 sm:w-[8px] sm:h-[8px] md:w-[6px] md:h-[6px] lg:w-[4px] lg:h-[4px]"
											/>
										))}
									</View>
								</View>
							)}
						</View>
					</View>
				</View>
			) : type?.includes('Details') ? (
				<View className="flex">
					<View className="mt-8">
						<Animated.View
							style={animatedStyle}
							className="w-full h-[330px] bg-gray-400 rounded-b-[30px]"
						/>
					</View>

					{/* Details Header */}
					<View
						className="
						absolute top-12 left-4
								"
					>
						<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
					</View>

					{/* Favorite Button right side */}
					<View className="absolute top-12 right-4">
						<Animated.View
							style={animatedStyle}
							className="w-[40px] h-[40px] bg-gray-500 rounded-full"
						/>
					</View>

					{/* Title */}
					<View className="mb-20 mt-2 p-6 grid grid-cols-1 gap-6">
						<Animated.View
							style={animatedStyle}
							className="h-4 bg-gray-500 rounded w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px]"
						/>
						<View className="flex-row items-center justify-between">
							<View className="flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
								<Animated.View
									style={animatedStyle}
									className="bg-gray-300 px-3 py-1 rounded-full w-20 h-6 sm:w-18 sm:h-5 md:w-16 md:h-4 lg:w-14 lg:h-3"
								/>

								<Animated.View
									style={animatedStyle}
									className="bg-gray-500 px-3 py-1 rounded-full w-20 h-6 sm:w-18 sm:h-5 md:w-16 md:h-4 lg:w-14 lg:h-3"
								/>
							</View>
							<View className="flex-row items-center space-x-2">
								{/* Icon Time */}
								<Animated.View
									style={animatedStyle}
									className="w-[18px] h-[18px] bg-gray-400 rounded-full sm:w-[16px] sm:h-[16px] md:w-[14px] md:h-[14px] lg:w-[12px] lg:h-[12px]"
								/>

								{/* Time */}
								<Animated.View
									style={animatedStyle}
									className="h-4 bg-gray-400 rounded w-[80px] sm:w-[60px] md:w-[70px] lg:w-[80px]"
								/>
							</View>
						</View>

						{/* Intensity */}
						{type === 'ActivityDetails' ||
						type === 'WorkoutPlanDetails' ||
						type === 'StoreDetails' ? (
							<View className="flex-row ml-2">
								{[...Array(5)].map((_, index) => (
									<Animated.View
										key={index}
										style={animatedStyle}
										className="w-[15px] h-[15px] bg-gray-300 rounded-full mx-1"
									/>
								))}
							</View>
						) : null}

						{/* Plan Workout Plan */}
						{type === 'WorkoutPlanDetails' && (
							<View className="flex-col justify-center items-center space-y-4">
								<Animated.View
									style={animatedStyle}
									className="w-16 h-16 bg-gray-300 rounded-full"
								/>
								{[...Array(5)].map((_, index) => (
									<Animated.View
										key={index}
										style={animatedStyle}
										className="w-full h-2 bg-gray-300 rounded"
									/>
								))}
							</View>
						)}

						{/* Text Description */}
						{type !== 'WorkoutPlanDetails' && (
							<View>
								{[...Array(8)].map((_, index) => (
									<Animated.View
										key={index}
										style={animatedStyle}
										className="h-2 bg-gray-300 rounded w-full mb-2"
									/>
								))}
							</View>
						)}
					</View>
				</View>
			) : null}
		</>
	);
};

export default LoadingSkeleton;
