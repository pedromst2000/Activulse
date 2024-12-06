import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LeaderboardI from '../../assets/svg/icons/LeaderboardIcon.svg';
import Icon from '../Icon';

type Props = {
	onPress: () => void | Promise<void>;
};

const LeaderboardBtn: React.FC<Props> = ({ onPress }): React.JSX.Element => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.95}
			className="fixed flex flex-row items-center justify-center 
            w-[54px] h-[54px] rounded-full bg-accent-700 absolute bottom-[-15px] right-[-2px] mb-2 shadow-2xl
            sm:w-[48px] sm:h-[48px] sm:bottom-[-10px] sm:right-[-1px]
            md:w-[60px] md:h-[60px] md:bottom-[-20px] md:right-[-3px]"
			style={{
				shadowColor: '#000',
				shadowOpacity: 0.25,
				shadowRadius: 4.84,
			}}
		>
			<Icon icon={LeaderboardI} width={40} height={40} />
		</TouchableOpacity>
	);
};

export default LeaderboardBtn;
