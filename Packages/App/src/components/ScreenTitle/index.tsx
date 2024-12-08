import React from 'react';
import { Text, View } from 'react-native';
import GoBackBtn from '../GoBackBtn';

type ScreenTitleProps = {
	label: string | undefined;
	onPress: () => void;
};

const ScreenTitle: React.FC<ScreenTitleProps> = ({ label, onPress }): React.JSX.Element => {
	return (
		<View className="flex-row items-center mt-10 ml-4 z-10">
			<GoBackBtn onPress={onPress} isRounded={true} />
			{/* ml-14 */}
			<Text
				className={`font-merriweather-bold text-[22px] sm:text-lg md:text-xl lg:text-2xl text-secondary-700 ${['DASH', 'Vegan'].some((diet) => label?.includes(diet)) ? 'ml-[80px]' : label === 'Mediterranean' ? 'ml-[55px]' : 'ml-14'}`}
			>
				{label}
			</Text>
		</View>
	);
};

export default ScreenTitle;
