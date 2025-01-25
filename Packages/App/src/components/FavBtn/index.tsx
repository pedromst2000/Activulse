import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FavNotSelectedI from '../../assets/svg/icons/FavIconNotSelected.svg';
import FavSelectedI from '../../assets/svg/icons/FavIconSelected.svg';
import Icon from '../Icon';

type Props = {
	onPress?: () => void | Promise<void>;
	isRounded?: boolean;
	isToogleFav?: boolean;
	isMyFav?: boolean;
	disable?: boolean;
};

const FavBtn: React.FC<Props> = ({
	onPress,
	isRounded,
	isToogleFav,
	isMyFav,
	disable,
}): React.JSX.Element => {

	useEffect(() => {
		console.log('isMyFav', isMyFav);
	}, [isMyFav]);

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			disabled={disable}
			className={`flex flex-row items-center justify-center 
                w-[44px] h-[44px] ${isRounded ? 'rounded-full bg-accent-500' : null} `}
		>
			<Icon
				icon={isMyFav ? FavSelectedI : isToogleFav ? FavSelectedI : FavNotSelectedI}
				width={28}
				height={28}
			/>
		</TouchableOpacity>
	);
};

export default FavBtn;
