import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from '../../Icon';
import PremiumI from '@/src/assets/svg/icons/PremiumIcon_.svg';
import BannersI from '@/src/assets/svg/icons/BannersIcon.svg';

type Props = {
	label: string;
	selectedLabel?: string;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const LabelTop: React.FC<Props> = ({ label, selectedLabel, onPress }): React.JSX.Element => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			className={`flex-1 bg-primary-50 p-4  ${selectedLabel === label ? ' border-b-[5px] border-secondary-700' : ''}`}
		>
			<View className="flex-row items-center justify-center space-x-2">
				<Icon icon={label === 'Premium' ? PremiumI : BannersI} width={20} height={20} />

				<Text className="text-center text-secondary-700 font-quicksand-bold text-[14.2px]">
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default LabelTop;
