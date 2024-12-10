import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

type Props = {
	current: number;
	total: number;
};

const ProgressBar = ({ current, total }: Props): React.JSX.Element => {
	const progress = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const newProgress = (current / total) * 100;
		Animated.timing(progress, {
			toValue: newProgress,
			duration: 500,
			easing: Easing.ease,
			useNativeDriver: false,
		}).start();
	}, [current, total]);

	const width = progress.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
	});

	return (
		<View className="flex flex-row items-center justify-center w-full px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
			<View className="w-[120px] h-[8px] sm:w-[150px] sm:h-[10px] md:w-[180px] md:h-[12px] lg:w-[200px] lg:h-[14px] bg-secondary-50 rounded-full">
				<Animated.View
					className="h-[8px] sm:h-[10px] md:h-[12px] lg:h-[14px] bg-secondary-700 rounded-full"
					style={{ width }}
				/>
			</View>
		</View>
	);
};

export default ProgressBar;
