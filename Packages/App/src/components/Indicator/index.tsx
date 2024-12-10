import React from 'react';
import { View, Text } from 'react-native';

type Props = {
	type: 'Risk' | 'Graph';
	bulletColor: string;
	label: string;
	value?: string | undefined;
	styleClass?: string | undefined;
};

const Indicator: React.FC<Props> = ({
	type,
	bulletColor,
	label,
	value,
	styleClass,
}): React.JSX.Element => {
	return (
		<View className={`items-center ${styleClass}`}>
			<View className="flex-1 flex-row justify-center items-center gap-2">
				<View
					className={`w-3 h-3 ${bulletColor} rounded-full mt-2 md:w-4 md:h-4 lg:w-5 lg:h-5`}
				/>
				<Text className="font-quicksand-bold tracking-wide text-sm text-secondary-700 md:text-base lg:text-lg">
					{label}
				</Text>
			</View>
			{type === 'Risk' ? (
				<Text className="font-quicksand-medium text-sm text-secondary-700 ml-2 md:text-base lg:text-lg">
					{value}
				</Text>
			) : null}
		</View>
	);
};

export default Indicator;
