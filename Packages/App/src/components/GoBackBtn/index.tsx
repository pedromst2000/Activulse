import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLeftI from '../../assets/svg/icons/ArrowLeftIcon.svg';
import Icon from '../Icon';
import { View } from 'react-native';

type Props = {
	onPress?: () => void | Promise<void>;
	isRounded?: boolean;
	disable?: boolean;
};

const GoBackBtn: React.FC<Props> = ({ onPress, isRounded, disable }): React.JSX.Element => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disable}
			className={`flex flex-row items-center justify-center 
                w-[44px] h-[44px] ${isRounded ? 'rounded-full bg-accent-500' : null} `}
		>
			<Icon icon={ArrowLeftI} width={28} height={28} />
		</TouchableOpacity>
	);
};

export default GoBackBtn;
