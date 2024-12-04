import React from 'react';
import { View, Animated, useWindowDimensions } from 'react-native';

type Props = {
	data: any;
	ScrollX: any;
};

const Paginator: React.FC<Props> = ({ data, ScrollX }): React.JSX.Element => {
	const { width } = useWindowDimensions();

	return (
		<View className="flex-row h-[64px] py-4">
			{data.map((_: any, index: any) => {
				const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

				const dotWidth = ScrollX.interpolate({
					inputRange,
					outputRange: [10, 40, 10],
					extrapolate: 'clamp',
				});

				const opacity = ScrollX.interpolate({
					inputRange,
					outputRange: [0.5, 1, 0.5],
					extrapolate: 'clamp',
				});

				return (
					<Animated.View
						key={index}
						className={`h-[11px] bg-accent-500 rounded-full m-2`}
						style={{ width: dotWidth, opacity }}
					/>
				);
			})}
		</View>
	);
};

export default Paginator;
