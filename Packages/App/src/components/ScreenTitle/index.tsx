import React from 'react';
import { Text, View } from 'react-native';
import GoBackBtn from '../GoBackBtn';

type ScreenTitleProps = {
	label: string | undefined;
	onPress: () => void;
};

const ScreenTitle: React.FC<ScreenTitleProps> = ({ label, onPress }): React.JSX.Element => {
	return (
		<View
			className="
		flex-row items-center mt-10 ml-4 z-10
		sm:mt-12 sm:ml-6 md:mt-14 md:ml-8 lg:mt-16 lg:ml-10 xl:mt-18 xl:ml-12
		sm:flex-row sm:items-center sm:mt-14 sm:ml-8 md:flex-row md:items-center md:mt-16 md:ml-10
		lg:flex-row lg:items-center lg:mt-18 lg:ml-12 xl:flex-row xl:items-center xl:mt-20 xl:ml-14
		
		"
		>
			<GoBackBtn onPress={onPress} isRounded={true} />
			<Text
				className={`font-merriweather-bold text-[22px] text-secondary-700 ${
					['DASH', 'Vegan'].some((diet) => label?.includes(diet))
						? 'ml-[80px] sm:ml-[60px] md:ml-[70px] lg:ml-[80px] xl:ml-[90px]'
						: label === 'Mediterranean'
							? 'ml-[55px] sm:ml-[35px] md:ml-[45px] lg:ml-[55px] xl:ml-[65px]'
							: 'ml-14 sm:ml-10 md:ml-12 lg:ml-14 xl:ml-16'
				}`}
			>
				{label}
			</Text>
		</View>
	);
};

export default ScreenTitle;
