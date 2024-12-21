import React from 'react';
import { View } from 'react-native';
import Icon from '../Icon';
import IntensityBlueI from '@/src/assets/svg/icons/FrequencyIconBlue.svg';
import IntensityOrangeI from '@/src/assets/svg/icons/FrequencyIconOrange.svg';

type Props = {
	typeBullet: 'blue' | 'orange';
	intensityVal: number;
	iconStyles?: string | undefined;
	bulletSizes?: string | undefined;
};

const Intensity: React.FC<Props> = ({
	typeBullet,
	intensityVal,
	iconStyles,
	bulletSizes,
}): React.JSX.Element => {
	return (
		<View className="flex-row items-center">
			<Icon
				icon={typeBullet === 'blue' ? IntensityBlueI : IntensityOrangeI}
				className={iconStyles}
			/>
			<View className="flex-row ml-2">
				{[...Array(5)].map((_, index) => (
					<View
						key={index}
						className={`${bulletSizes} rounded-full mx-1 ${
							index < intensityVal
								? typeBullet === 'blue'
									? 'bg-secondary-700'
									: 'bg-accent-700'
								: typeBullet === 'blue'
									? 'bg-secondary-50'
									: 'bg-accent-100'
						}`}
					/>
				))}
			</View>
		</View>
	);
};

export default Intensity;
