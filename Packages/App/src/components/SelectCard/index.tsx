import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Ilustration from '../Ilustration';

type Props = {
	type: 'Status' | 'Filter';
	ilustration: React.FC<SvgProps>;
	onPress: () => void;
	isSelected: boolean;
	label: string;
};

const SelectCard: React.FC<Props> = ({
	type,
	ilustration,
	onPress,
	isSelected,
	label,
}): React.JSX.Element => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
			{type === 'Status' ? (
				<View
					className={`bg-accent-100 rounded-2xl w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-56 flex items-center justify-center mx-1 ${
						isSelected ? 'border-4 border-accent-700 bg-primary-50' : ''
					}`}
				>
					<Ilustration
						ilustration={ilustration}
						styleClass="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
					/>
					<View className="flex flex-col items-center justify-center bg-accent-500 rounded-2xl px-2 py-1 mt-3">
						<Text className="font-quicksand-bold text-xs md:text-sm lg:text-base text-secondary-700">
							{label}
						</Text>
					</View>
				</View>
			) : null}
		</TouchableOpacity>
	);
};

export default SelectCard;
