import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
	activeOpacity?: number;
	label: string;
	category?: string;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const LabelItem: React.FC<Props> = ({
	activeOpacity,
	label,
	category,
	onPress,
}): React.JSX.Element => {
	const gradientAnim = useRef(new Animated.Value(0)).current;

	// Start the gradient animation (go-and-back effect)
	useEffect(() => {
		if (label !== 'Premium' || category === label) {
			return;
		}

		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(gradientAnim, {
					toValue: 1,
					duration: 1500, // Forward animation duration
					easing: Easing.inOut(Easing.ease), // Smooth easing
					useNativeDriver: true,
				}),
				Animated.timing(gradientAnim, {
					toValue: 0,
					duration: 1500, // Backward animation duration
					easing: Easing.inOut(Easing.ease), // Smooth easing
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();

		return () => animation.stop();
	}, [gradientAnim, label, category]);

	return (
		<TouchableOpacity
			style={{
				elevation: 5,
			}}
			className={`self-start ${
				category === label ? 'bg-accent-700' : 'bg-primary-50 border-[2px] border-accent-700'
			} px-[18px] py-2 rounded-full mx-1 md:mx-2 lg:mx-3 xl:mx-4`}
			activeOpacity={activeOpacity || 0.75}
			onPress={onPress}
		>
			<View className="flex items-center justify-center relative overflow-hidden rounded-full">
				{label === 'Premium' && category !== label && (
					<Animated.View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							borderRadius: 100,
							zIndex: -1, // Keep the gradient behind the text
							transform: [
								{
									translateX: gradientAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [-50, 50], // Controls back-and-forth motion
									}),
								},
							],
						}}
					>
						<LinearGradient
							colors={['#EFF6FF', '#FFC997', '#FFC997', '#FFA653']}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 0 }}
							style={{
								flex: 1,
								borderRadius: 100,
							}}
						/>
					</Animated.View>
				)}

				{/* Text Content */}
				<Text
					className={`font-quicksand-bold  text-secondary-700 text-[13.2px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]`}
				>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default LabelItem;
