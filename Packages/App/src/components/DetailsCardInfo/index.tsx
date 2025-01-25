import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../Icon';
import TimeI from '@/src/assets/svg/icons/TimeIcon.svg';
import VideoTimeI from '@/src/assets/svg/icons/VideoTimeIcon.svg';
import Intensity from '../Intensity';
import InfoI from '@/src/assets/svg/icons/InfoIcon.svg';
import Button from '../Button';
import Accordion from '../Accordion';

type Props = {
	type: 'recipe' | 'activity' | 'store';
	data: any;
};

const DetailsCardInfo: React.FC<Props> = ({ type, data }): React.JSX.Element => {
	return (
		<View
			className={`flex-col justify-between items-center w-full bg-primary-50 ${
				!data?.isPremium || data?.price ? 'rounded-t-[30px]' : ''
			} ${data?.video ? 'mt-[208px] sm:mt-[230px] md:mt-[250px] lg:mt-[270px]' : 'mt-[235px] sm:mt-[230px] md:mt-[250px] lg:mt-[270px]'} `}
		>
			<View
				className="
					justify-center items-center w-full p-4 sm:p-6 md:p-8 
				"
			>
				{/* Title */}
				<Text
					className="font-merriweather-bold text-secondary-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl
					tracking-[0.5px] leading-8 sm:leading-10 md:leading-12 lg:leading-14  w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
				"
				>
					{data?.title}
				</Text>

				{/* Second Line */}
				<View className="flex-row items-center justify-between w-full p-4 sm:p-6 md:p-8 lg:p-10">
					<View className="flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
						<View className="border-[1.5px] border-secondary-700 rounded-full px-4 py-1 bg-primary-50">
							<Text
								className="font-quicksand-bold text-secondary-700
						tracking-[0.5px] leading-4 sm:leading-5 md:leading-6 lg:leading-7
						text-sm sm:text-base md:text-lg lg:text-xl
					"
							>
								{type === 'recipe' ? data?.diet?.name : data?.category?.name}
							</Text>
						</View>
						<View className="border-[1.5px] border-accent-500  rounded-full px-4 py-1 bg-accent-500">
							<Text
								className="
							font-quicksand-bold text-secondary-700
						tracking-[0.5px] leading-4 sm:leading-5 md:leading-6 lg:leading-7
						text-sm sm:text-base md:text-lg lg:text-xl
						"
							>
								{type === 'recipe' ? data?.category?.name : data?.tag}
							</Text>
						</View>
					</View>

					<View className="flex-row justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
						<Icon
							icon={data?.isPremium || type === 'store' ? VideoTimeI : TimeI}
							className="w-[18px] h-[18px] md:w-[16px] lg:w-[18px] md:h-[16px] lg:h-[18px]"
						/>
						<Text
							className="font-quicksand-bold text-secondary-700 text-sm sm:text-base md:text-lg lg:text-xl
						tracking-[0.5px] leading-2 sm:leading-3 md:leading-4 lg:leading-5
							"
						>
							{data?.isPremium || type === 'store' ? data?.videoTime : data?.durationConf}{' '}
							minutes
						</Text>
					</View>
				</View>
			</View>

			{/* third Line */}
			{type === 'activity' ? (
				<View>
					<Intensity
						typeBullet="blue"
						intensityVal={
							data?.intensity === 'Light'
								? 1
								: data?.intensity === 'Moderate I'
									? 2
									: data?.intensity === 'Moderate II'
										? 3
										: data?.intensity === 'Moderate III'
											? 4
											: 5
						}
						iconStyles="w-[28px] h-[28px] md:w-[24px] lg:w-[28px] md:h-[24px] lg:h-[28px]"
						bulletSizes="w-[11px] h-[11px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] lg:w-[12px] lg:h-[12px]"
					/>
				</View>
			) : null}

			{/* third Line or fourth Line*/}

			{type === 'store' || data?.price ? (
				<View>
					<Text>{data?.price}</Text>
				</View>
			) : null}

			{data?.video ? (
				<View
					className="flex-row justify-center items-center w-full p-4 sm:p-6 md:p-8 lg:p-10 space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8
				"
				>
					<Icon
						icon={InfoI}
						className="w-[18px] h-[18px] md:w-[16px] lg:w-[18px] md:h-[16px] lg:h-[18px]"
					/>
					<Text className="font-quicksand-bold text-secondary-700 text-xs sm:text-sm md:text-base lg:text-lg">
						{type === 'recipe'
							? 'learn how to made this recipe by follow up the video'
							: 'follow up the exercise with the practice video'}
					</Text>
				</View>
			) : null}

			{/* Description */}
			{data?.description ? (
				<View className="flex-col justify-center items-center w-full pb-4">
					<Text
						className="font-quicksand-medium text-secondary-700 text-sm sm:text-sm md:text-base lg:text-base
						tracking-[0.5px] leading-5 sm:leading-6 md:leading-7 lg:leading-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
						"
					>
						{data?.description}
					</Text>
				</View>
			) : data?.workouts ? (
				Array.from({ length: data?.workouts?.length }).map((_, index) => (
					<View key={index}>
						<Text>{data?.workouts[index]?.workout}</Text>
					</View>
				))
			) : null}

			{/* Button or Accordions (Ingredients and Instructions) */}
			{type === 'store' || type === 'activity' ? (
				<View className="flex flex-row justify-between items-center pt-10 sm:pt-12 md:pt-14 lg:pt-16 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
					<Button
						onPress={() => {
							type === 'store' ? console.log('Buy Now') : console.log('Start Activity');
						}}
						styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
					>
						<Text className="font-quicksand-bold text-secondary-700 text-base">
							{type === 'store' ? 'Buy Now' : 'Start Activity'}
						</Text>
					</Button>
				</View>
			) : type === 'recipe' && !data?.isPremium && data != null ? (
				<View>
					<Accordion type="Ingredients" data={data} />
					<Accordion type="Instructions" data={data} />
				</View>
			) : null}
		</View>
	);
};

export default DetailsCardInfo;
