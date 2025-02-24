import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../Icon';
import AppI from '../../assets/svg/ilustrations/Icon.svg';

type Props = {
	points: number | undefined;
};

const HeartPoints: React.FC<Props> = ({ points }): React.JSX.Element => {
	return (
		<View className="flex flex-row items-center space-x-2 border-2 border-secondary-700 rounded-full px-2 py-1 sm:px-3 sm:py-1">
			{/* Heart Icon */}
			<View className="flex items-center">
				<Icon
					icon={AppI}
					className="w-[24px] h-[24px]
							sm:w-[24px] sm:h-[24px]
							md:w-[28px] md:h-[28px]
							lg:w-[32px] lg:h-[32px]
						"
				/>
			</View>

			{/* Points */}
			<View>
				<Text className="text-[14px] sm:text-[16px] font-quicksand-semi-bold text-secondary-700">
					{points ?? '0'}
				</Text>
			</View>
		</View>
	);
};

export default HeartPoints;
