import { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import AppIcon from '../../assets/images/Icon.svg';

const Loading: React.FC = (): React.JSX.Element => {
	const scaleAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(scaleAnim, {
					toValue: 1.2,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			]),
		).start();
	}, [scaleAnim]);

	return (
		<View className="flex-1 items-center justify-center p-4 sm:p-6 md:p-8 bg-primary-50">
			<Animated.View
				style={{ transform: [{ scale: scaleAnim }] }}
				className="items-center justify-center"
			>
				<AppIcon className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
			</Animated.View>
			<Text className="mt-8 text-lg sm:text-xl md:text-2xl text-secondary-700 font-quicksand-bold">
				Loading...
			</Text>
		</View>
	);
};

export default Loading;
