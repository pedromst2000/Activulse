import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from '../../Icon';
import Intensity from '../../Intensity';
import TimeI from '@/src/assets/svg/icons/TimeIconV2.svg';
import VideoTimeI from '@/src/assets/svg/icons/VideoTimeIconV2.svg';
import PointsPriceI from '@/src/assets/svg/icons/PointsPrice.svg';

type Props = {
	type?: 'Recipe' | 'Activity' | 'StoreBanner';
	_item_: any;
	onPressCard?: (id: number) => void;
};

const Card: React.FC<Props> = ({ type, _item_, onPressCard }): React.JSX.Element => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => onPressCard && onPressCard(_item_.id)}
		>
			<View
				className="relative rounded-[30px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden
			w-[350px] sm:w-[300px] md:w-[320px] h-[255px] sm:h-[210px] md:h-[220px]
			"
			>
				{/* Background Image */}

				<Image className="w-full h-full" source={{ uri: _item_.imageUrl }} />

				{/* Dark Overlay */}
				<View
					className={`absolute top-0 left-0 w-full h-full bg-black ${type === 'Recipe' ? 'opacity-[0.32]' : 'opacity-[0.28]'}`}
				/>

				{/* Content Container */}
				<View className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-4 py-4">
					{/* Title */}

					<View className="mb-2">
						<Text
							className="font-quicksand-bold text-primary-50  leading-[20px] tracking-[0.3px]
							text-[15.5px] sm:text-[16px] md:text-[18px] lg:text-[20px]
						"
						>
							{_item_.title}
						</Text>
					</View>

					{/* Labels */}
					{type !== 'StoreBanner' && (
						<View className="flex flex-row flex-wrap items-center space-x-2 mb-[130px]">
							{_item_?.isPremium && (
								<View className="bg-primary-50 px-3 py-1 rounded-full">
									<Text className="font-quicksand-bold text-secondary-700 text-[14px] sm:text-[13px] md:text-[14px] tracking-[0.4px]">
										Premium
									</Text>
								</View>
							)}
							<View
								className="
							flex flex-row items-center space-x-2
							"
							>
								<View className="bg-accent-500 px-3 py-1 rounded-full justify-center items-center">
									<Text className="font-quicksand-bold text-secondary-700 text-[14px] sm:text-[13px] md:text-[14px] tracking-[0.4px]">
										{_item_.category}
									</Text>
								</View>
								{_item_.tag && !_item_.isPremium && (
									<View className="bg-primary-50 px-3 py-1 rounded-full justify-center items-center">
										<Text className="font-quicksand-bold text-secondary-700 text-[14px] sm:text-[13px] md:text-[14px] tracking-[0.4px]">
											{_item_.tag}
										</Text>
									</View>
								)}
							</View>
						</View>
					)}

					{/* Time Display && Intensity */}
					<View className="flex flex-row justify-between items-center">
						{/* Store Banner Price Label */}
						{_item_?.price && (
							<View className="flex flex-row items-center space-x-2">
								<Icon
									icon={PointsPriceI}
									className="w-[18px] h-[18px] md:w-[16px] lg:w-[18px] md:h-[16px] lg:h-[18px]"
								/>
								<Text className="font-quicksand-bold text-primary-50 text-[14px] sm:text-[13px] md:text-[14px] leading-[20px] tracking-[0.4px]">
									{_item_.price} pts
								</Text>
							</View>
						)}

						{/* Time Display */}
						{!((type === 'Activity' || type === 'StoreBanner') && _item_.price) && (
							<View className="flex-row items-center space-x-2">
								{_item_?.isPremium || _item_?.price ? (
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
									{_item_?.price || _item_?.isPremium
										? _item_?.videoTime
										: type === 'Recipe'
											? _item_.confTime
											: _item_.duration}{' '}
									minutes
								</Text>
							</View>
						)}

						{type === 'Activity' && (
							<Intensity
								typeBullet="orange"
								intensityVal={
									_item_.intensity === 'Light'
										? 1
										: _item_.intensity === 'Moderate I'
											? 2
											: _item_.intensity === 'Moderate II'
												? 3
												: _item_.intensity === 'Moderate III'
													? 4
													: 5
								}
								iconStyles="w-[28px] h-[28px] md:w-[24px] lg:w-[28px] md:h-[24px] lg:h-[28px]"
								bulletSizes="w-[11px] h-[11px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] lg:w-[12px] lg:h-[12px]"
							/>
						)}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Card;
