import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import TimeI from '@/src/assets/svg/icons/TimeIcon.svg';
import VideoTimeI from '@/src/assets/svg/icons/VideoTimeIcon.svg';
import Icon from '../../Icon';

type Props = {
	type?: 'Recipe' | 'Workout' | 'StoreRecipe' | 'StoreWorkout';
	_item_: any;
};

const Card: React.FC<Props> = ({ type, _item_ }): React.JSX.Element => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => {
				console.log(`Card-ID: ${_item_.id}`);
			}}
		>
			<View
				className="relative rounded-[30px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden
			w-[320px] sm:w-[300px] md:w-[320px] h-[255px] sm:h-[210px] md:h-[220px]"
			>
				{/* Background Image */}
				{/* TODO - Implement Lazy Loading Fast Image for Better performance */}

				<Image className="w-full h-full" source={{ uri: _item_.imageUrl }} />

				{/* Dark Overlay */}
				<View className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />

				{/* Content Container */}
				<View className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-4 py-4">
					{/* Title */}
					<View className="mb-2">
						<Text
							className="font-quicksand-bold text-primary-50  leading-[20px] tracking-[0.3px]
							text-[14.22px] sm:text-[16px] md:text-[18px] lg:text-[20px]
						"
						>
							{_item_.title}
						</Text>
					</View>

					{/* Labels */}
					<View className="flex flex-row flex-wrap items-center space-x-2 mb-[130px]">
						{_item_?.isPremium && (
							<View className="bg-primary-50 px-3 py-1 rounded-full">
								<Text className="font-quicksand-bold text-secondary-700 text-[14px] sm:text-[13px] md:text-[14px] tracking-[0.4px]">
									Premium
								</Text>
							</View>
						)}
						<View className="bg-accent-500 px-3 py-1 rounded-full">
							<Text className="font-quicksand-bold text-secondary-700 text-[14px] sm:text-[13px] md:text-[14px] tracking-[0.4px]">
								{_item_.category}
							</Text>
						</View>
					</View>

					{/* Time Display */}
					<View className="flex-row items-center space-x-2">
						{_item_?.isPremium ? (
							<Icon
								icon={VideoTimeI}
								className="w-[18px] h-[18px] md:w-[16px] lg:w-[18px] md:h-[16px] lg:h-[18px]"
							/>
						) : (
							<Icon
								icon={TimeI}
								className="w-[18px] h-[18px] md:w-[16px] lg:w-[18px] md:h-[16px] lg:h-[18px]"
							/>
						)}

						<Text className="font-quicksand-bold text-primary-50 text-[14px] sm:text-[13px] md:text-[14px] leading-[20px] tracking-[0.4px]">
							{_item_?.isPremium ? _item_?.videoTime : _item_?.confTime} minutes
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Card;
