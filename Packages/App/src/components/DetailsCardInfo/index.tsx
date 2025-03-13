import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../Icon';
import Button from '../Button';
import Accordion from '../Accordion';
import Intensity from '../Intensity';
import InfoI from '@/src/assets/svg/icons/InfoIcon.svg';
import TimeI from '@/src/assets/svg/icons/TimeIcon.svg';
import VideoTimeI from '@/src/assets/svg/icons/VideoTimeIcon.svg';
import WorkoutI from '@/src/assets/svg/icons/WorkoutIcon.svg';
import PointsPriceI from '@/src/assets/svg/icons/PointsPrice.svg';

type Props = {
	type: 'recipe' | 'activity' | 'store';
	data: any;
	navigateTo?: any;
	onPressBuy?: any;
};

const DetailsCardInfo: React.FC<Props> = ({
	type,
	data,
	navigateTo,
	onPressBuy,
}): React.JSX.Element => {
	return (
		<View
			className={`flex-col justify-between items-center w-full bg-primary-50 ${
				!data?.isPremium || data?.price ? 'rounded-t-[30px]' : ''
			} ${data?.video ? 'mt-[208px] lg:mt-[270px]' : 'mt-[235px] lg:mt-[270px]'}`}
		>
			<View className="p-6 w-full">
				<View
					className={`${data?.price ? 'flex-row justify-between items-center' : 'flex-col items-center'}`}
				>
					<View className={`${data?.price ? 'w-8/12' : 'w-full max-w-lg'}`}>
						{/* Title */}
						<Text className="font-merriweather-bold text-secondary-700  text-xl lg:text-4xl tracking-[0.5px] leading-8 lg:leading-14 w-full max-w-lg text-left">
							{data?.title}
						</Text>
					</View>
					{data?.price && (
						<View className="flex flex-row items-center space-x-2">
							<Icon
								icon={PointsPriceI}
								className="w-[18px] h-[18px] md:w-[16px] lg:w-[18px] md:h-[16px] lg:h-[18px]"
							/>
							<Text className="font-quicksand-bold text-secondary-700 text-[14.5px] sm:text-[13px] md:text-[14px] leading-[20px] tracking-[0.4px]">
								{data?.price} pts
							</Text>
						</View>
					)}
				</View>

				{/* Second Line */}
				<View
					className={`${(data?.category?.name === 'Main Dishes' || data?.category?.name === 'Desserts') && data?.diet?.name === 'Mediterranean' ? 'pt-4 w-full' : 'pt-4 w-full max-w-lg flex-row justify-between items-center'}`}
				>
					{/* Tags */}
					<View className="flex-row items-center gap-2">
						<View className="border-[1.5px] border-accent-500  rounded-full px-4 py-1 bg-accent-500">
							<Text className="font-quicksand-bold text-secondary-700 text-sm lg:text-xl">
								{type === 'recipe' || type === 'store'
									? data?.diet?.name
									: data?.category?.name}
							</Text>
						</View>
						<View className="border-[1.5px] border-secondary-700 rounded-full px-4 py-1 bg-primary-50">
							<Text className="font-quicksand-bold text-secondary-700 text-sm lg:text-xl">
								{type === 'recipe' || type === 'store' ? data?.category?.name : data?.tag}
							</Text>
						</View>
					</View>

					{/* Time */}
					<View
						className={`${(data?.category?.name === 'Main Dishes' || data?.category?.name === 'Desserts') && data?.diet?.name === 'Mediterranean' ? 'w-full pt-4' : ''} flex-row items-center space-x-2`}
					>
						<Icon
							icon={data?.isPremium || type === 'store' ? VideoTimeI : TimeI}
							className="w-[18px] h-[18px]"
						/>
						<Text className="font-quicksand-bold text-secondary-700 text-sm lg:text-xl">
							{data?.isPremium || type === 'store'
								? data?.videoTime
								: type === 'activity'
									? data?.duration
									: data?.durationConf}{' '}
							minutes
						</Text>
					</View>
				</View>

				{/* Intensity */}
				{type === 'activity' && (
					<View className="pt-4">
						<Intensity
							typeBullet="blue"
							intensityVal={
								data?.intensity === 'Low'
									? 1
									: data?.intensity === 'Moderate I'
										? 2
										: data?.intensity === 'Moderate II'
											? 3
											: data?.intensity === 'Moderate III'
												? 4
												: 5
							}
							iconStyles="w-8 h-8"
							bulletSizes="w-3 h-3"
						/>
					</View>
				)}
			</View>

			{data?.video?.url && (
				<View className="w-full max-w-lg px-6">
					{/* info */}
					<View className="flex-row items-center space-x-2">
						<Icon icon={InfoI} className="w-[18px] h-[18px]" />
						<Text className="font-quicksand-bold text-secondary-700 text-[13px]">
							{type === 'recipe'
								? ' learn how to made this recipe by follow up the video'
								: ' follow up the exercise with the practice video'}
						</Text>
					</View>
				</View>
			)}

			{/* Description */}
			{data?.description && (
				<View
					className={`${data?.video?.url ? 'w-full max-w-lg px-6 pb-2 mt-4' : 'w-full max-w-lg px-6 pb-2'}`}
				>
					<Text className="font-quicksand-medium text-secondary-700 text-sm lg:text-base leading-5 lg:leading-8">
						{data?.description}
					</Text>
				</View>
			)}

			{/* Workout Plan */}
			{data?.workouts && (
				<View className="flex-col justify-center items-center space-y-2 w-full max-w-lg">
					<Icon icon={WorkoutI} className="w-16 h-16" />
					{data?.workouts?.map((item: any, index: number) => (
						<View
							className="w-full flex items-center justify-center pt-2"
							key={`${item.id}-${index}`}
						>
							<Text
								className={`${index % 2 !== 0 ? 'font-quicksand-bold' : 'font-quicksand-medium'} text-secondary-700 text-[14.2px]`}
							>
								{item.workout}
							</Text>
						</View>
					))}
				</View>
			)}

			{/* Accordions */}
			{type === 'recipe' && !data?.isPremium && data && (
				<View className="w-full max-w-lg px-4 space-y-4">
					<Accordion type="Ingredients" data={data} />
					<Accordion type="Instructions" data={data} />
				</View>
			)}

			{/* Additional Buttons */}
			{(type === 'store' || type === 'activity') && !data?.video && (
				<View className="flex justify-center items-center w-full max-w-lg px-4 pt-8">
					<Button
						onPress={() => {
							type === 'store' ? onPressBuy() : navigateTo();
						}}
						styleClass="w-full"
					>
						<Text className="font-quicksand-bold text-secondary-700 text-base">
							{type === 'store' ? 'Buy Now' : 'Start Activity'}
						</Text>
					</Button>
				</View>
			)}
		</View>
	);
};

export default DetailsCardInfo;
