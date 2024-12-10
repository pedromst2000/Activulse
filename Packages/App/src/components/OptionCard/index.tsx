import React from 'react';
import { Text, TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native';

type OptionCardProps = {
	label: string;
	description: string;
	sourceImg: ImageSourcePropType;
	onPress: () => void;
	styleClass?: string;
};

const OptionCard: React.FC<OptionCardProps> = ({
	label,
	description,
	sourceImg,
	onPress,
	styleClass,
}: OptionCardProps): React.JSX.Element => {
	return (
		<TouchableOpacity
			className={`mb-[30px] ${styleClass}`}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<View
				className="relative rounded-[16px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden 
                w-[310px] sm:w-[300px] md:w-[320px] h-[230px] sm:h-[210px] md:h-[220px]"
			>
				<Image className="w-full h-full" source={sourceImg} />
				{/* Overlay */}
				<View className="absolute top-0 left-0 w-full h-full bg-black opacity-20" />
				{/* Label */}
				<View className="absolute top-4 left-4 bg-accent-500 px-2 sm:px-3 py-1 rounded-full">
					<Text className="font-quicksand-bold text-secondary-700 text-[14px] sm:text-[13px] md:text-[14px] leading-[22px] tracking-[0.4px]">
						{label}
					</Text>
				</View>
				{/* Description */}
				<View className="absolute bottom-0 left-0 w-full">
					<Text
						className="text-neutral-50 text-[12.5px] sm:text-[13px] md:text-[13px] font-quicksand-medium leading-[18px] text-center
                      bg-black/60 p-2 sm:p-3 w-full"
					>
						{description}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default OptionCard;
