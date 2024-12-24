import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Ilustration from '../Ilustration';
import Intensity from '../Intensity';

type Props = {
	type: 'Status' | 'Filter';
	ilustration: React.FC<SvgProps>;
	onPress?: () => void;
	isSelected: boolean;
	label: string;
	ilustrationStyle?: string | undefined;
	CardDimensionsStyle?: string | undefined;
	labelStyle?: string | undefined;
	labelSize?: string | undefined;
	intensity?: number | undefined;
};

const SelectCard: React.FC<Props> = ({
	type,
	ilustration,
	onPress,
	isSelected,
	label,
	ilustrationStyle,
	CardDimensionsStyle,
	labelStyle,
	labelSize,
	intensity,
}): React.JSX.Element => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
			<View
				className={`bg-accent-100 rounded-2xl ${CardDimensionsStyle || 'w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-56'} ${type === 'Filter' ? 'flex items-center justify-between py-4 mx-2' : 'flex items-center justify-center mx-1'} ${isSelected && 'border-2 border-accent-700 bg-primary-50'} `}
			>
				{type === 'Filter' && (
					<Intensity
						typeBullet={'blue'}
						intensityVal={isSelected ? (intensity ?? 0) : 0}
						iconStyles="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
						bulletSizes="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4"
					/>
				)}

				{type === 'Filter' && label === 'Moderate' && (
					<View>
						<Intensity
							typeBullet={'blue'}
							intensityVal={isSelected ? 4 : 0}
							iconStyles="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
							bulletSizes="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4"
						/>
					</View>
				)}
				<View>
					<Ilustration
						ilustration={ilustration}
						styleClass={ilustrationStyle || 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24'}
					/>
				</View>

				<View
					className={`flex flex-col items-center justify-center bg-accent-500 rounded-2xl ${labelStyle || 'px-2 py-1 mt-3'}`}
				>
					<Text
						className={`font-quicksand-bold ${labelSize || 'text-[12.5px] md:text-sm lg:text-base'}  text-secondary-700`}
					>
						{label}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default SelectCard;
