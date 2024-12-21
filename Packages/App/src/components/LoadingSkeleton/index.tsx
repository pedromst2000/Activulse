import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

type Props = {
	type?: 'FeedRecipes' | 'FeedActivities';
	category?: string;
};

const LoadingSkeleton: React.FC<Props> = ({ type, category }): React.JSX.Element => {
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
		<View
			className="
        relative rounded-[30px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden w-[320px] sm:w-[300px] md:w-[320px] h-[255px] sm:h-[210px] md:h-[220px]"
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
	);
};

export default LoadingSkeleton;
