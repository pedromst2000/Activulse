import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

type Props = {
	type?: 'FeedRecipes' | 'FeedWorkouts';
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
			<View className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-4 py-4">
				{/* Title */}
				<View className="mb-2">
					<Animated.View style={animatedStyle} className="h-4 bg-gray-300 rounded w-3/4" />
				</View>

				{/* Labels */}
				<View className="flex flex-row flex-wrap items-center space-x-2 mb-[130px]">
					<Animated.View
						style={animatedStyle}
						className="bg-gray-300 px-3 py-1 rounded-full w-20 h-6"
					/>

					{category == 'Premium' && (
						<Animated.View
							style={animatedStyle}
							className="bg-gray-500 px-3 py-1 rounded-full w-20 h-6"
						/>
					)}
				</View>

				{/* Time Display */}
				<View className="flex-row items-center space-x-2">
					<Animated.View
						style={animatedStyle}
						className="w-[18px] h-[18px] bg-gray-300 rounded-full"
					/>
					<Animated.View style={animatedStyle} className="h-4 bg-gray-300 rounded w-20" />
				</View>
			</View>
		</View>
	);
};

export default LoadingSkeleton;
