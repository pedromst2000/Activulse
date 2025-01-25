import React from 'react';
import { View } from 'react-native';
import GoBackBtn from '../GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import FavBtn from '../FavBtn';

type Props = {
	className?: string;
	onToggleFav?: () => void | Promise<void>;
	isToogleFav?: boolean;
	isMyFav?: boolean;
};

const DetailsHeader: React.FC<Props> = ({
	className,
	onToggleFav,
	isToogleFav,
	isMyFav,
}): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<View
			className={`flex-row justify-between items-center mt-10 ml-4 mr-4 z-10 
					sm:mt-12 sm:ml-6 sm:mr-6 sm:z-20 sm:mb-4
				${className}`}
		>
			<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
			<FavBtn
				onPress={onToggleFav}
				isToogleFav={isToogleFav}
				isMyFav={isMyFav}
				isRounded={true}
			/>
		</View>
	);
};

export default DetailsHeader;
