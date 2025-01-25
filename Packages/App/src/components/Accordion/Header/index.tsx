import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Icon from '../../Icon';
import Button from '../../Button';

type Props = {
	title: string;
	icon: any;
	toogleIcon: any;
	onPress: () => void;
	isToogle: boolean;
};

const AccordionHeader: React.FC<Props> = ({
	title,
	icon,
	toogleIcon,
	onPress,
	isToogle,
}): React.JSX.Element => {
	const rotateAnim = useRef(new Animated.Value(isToogle ? 0 : 1)).current;

	useEffect(() => {
		Animated.timing(rotateAnim, {
			toValue: isToogle ? 1 : 0,
			duration: 350,
			useNativeDriver: true,
			easing: Easing.inOut(Easing.ease),
		}).start();
	}, [isToogle, rotateAnim]);

	const rotate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['90deg', '-90deg'],
	});

	return (
		<View>
			<Button
				className="flex-row justify-between items-center  bg-accent-700
				p-[12px] rounded-t-[30px] w-11/12 md:w-10/12 lg:w-11/12 
			"
				onPress={onPress}
			>
				<Animated.View
					style={{
						transform: [{ rotate }],
					}}
				>
					<Icon
						icon={toogleIcon}
						className="w-[22px] h-[22px]  md:w-[20px] lg:w-[22px] md:h-[20px] lg:h-[22px]
							rotate-[0deg]
						"
					/>
				</Animated.View>

				<Text className="font-quicksand-bold text-secondary-700 text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.5px] leading-6 sm:leading-8 md:leading-10 lg:leading-12">
					{' '}
					{title}{' '}
				</Text>
				<Icon
					icon={icon}
					className="w-[22px] h-[22px]  md:w-[20px] lg:w-[22px] md:h-[20px] lg:h-[22px] "
				/>
			</Button>
		</View>
	);
};

export default AccordionHeader;
