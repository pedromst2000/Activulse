import React from 'react';
import { Text, View } from 'react-native';
import GoBackBtn from '../GoBackBtn';
import FilterI from '@/src/assets/svg/icons/FilterIcon.svg';

type ScreenTitleProps = {
	type?: 'Filter';
	label?: string;
	onPress?: () => void | undefined;
	onFilterBtnPress?: () => void | undefined;
};

const ScreenTitle: React.FC<ScreenTitleProps> = ({
	type,
	label,
	onPress,
	onFilterBtnPress,
}): React.JSX.Element => {
	return (
		<View
			className={
				type === 'Filter'
					? 'flex-row justify-between items-center mt-10 ml-4 mr-4 z-10 sm:mt-12 sm:ml-6 md:mt-14 md:ml-8 lg:mt-16 lg:ml-10 xl:mt-18 xl:ml-12'
					: '	flex-row items-center  mt-10 ml-4 z-10 sm:mt-12 sm:ml-6 md:mt-14 md:ml-8 lg:mt-16 lg:ml-10 xl:mt-18 xl:ml-12 sm:flex-row sm:items-center sm:mt-14 sm:ml-8 md:flex-row md:items-center md:mt-16 md:ml-10	lg:flex-row lg:items-center lg:mt-18 lg:ml-12 xl:flex-row xl:items-center xl:mt-20 xl:ml-14				'
			}
		>
			<GoBackBtn onPress={onPress} isRounded={true} />
			<Text
				className={`font-merriweather-bold text-[22px] text-secondary-700 ${
					['DASH', 'Vegan'].some((diet) => label?.includes(diet))
						? 'ml-[100px]'
						: label === 'Mediterranean'
							? 'ml-[55px] sm:ml-[35px] md:ml-[45px] lg:ml-[55px] xl:ml-[65px]'
							: label === 'Fitness'
								? ''
								: 'ml-20'
				}`}
			>
				{label}
			</Text>

			{type === 'Filter' && <FilterI onPress={onFilterBtnPress} />}
		</View>
	);
};

export default ScreenTitle;
