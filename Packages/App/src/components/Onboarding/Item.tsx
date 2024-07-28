import React from 'react';
import { View, Text, Image, ImageSourcePropType, useWindowDimensions } from 'react-native';

type SlideProps = {
	id: number;
	title: string;
	description: string;
};

const OnboardingItem: React.FC<SlideProps> = ({ ...SlideProps }): React.JSX.Element => {
	const { width } = useWindowDimensions();

	const getIllustrationSource = (index: number): ImageSourcePropType => {
		switch (index) {
			case 0:
				return require('../../assets/images/Onboarding/Onboarding01.png');
			case 1:
				return require('../../assets/images/Onboarding/Onboarding02.png');
			case 2:
				return require('../../assets/images/Onboarding/Onboarding03.png');
			case 3:
				return require('../../assets/images/Onboarding/Onboarding04.png');
			case 4:
				return require('../../assets/images/Onboarding/Onboarding05.png');
			case 5:
				return require('../../assets/images/Onboarding/Onboarding06.png');
			case 6:
				return require('../../assets/images/Onboarding/OnboardingLast.png');
			default:
				return require('../../assets/images/Onboarding/Onboarding01.png');
		}
	};

	return (
		<View className="flex-1 justify-center items-center" style={{ width }}>
			{/* Ilustration */}
			<View
				className='flex justify-center items-center'
			>
				<Image
					className='mt-2'
				source={getIllustrationSource(SlideProps.id)} />
			</View>
			{/* title & Description Container */}
			<View className="flex justify-center align-center gap-[20px] mt-9">
				{/* Title */}
				<View className="flex-row justify-center items-center">
					<Text
						className="
						font-merriweather-bold text-secondary-700 text-[25.6px] text-center
					"
					>
						{SlideProps.title}
					</Text>
				</View>
				{/* description */}
				<View>
					<Text
						className="font-quicksand-medium text-secondary-700 text-[14.22px] text-center
					w-[315px]
					"
					>
						{SlideProps.description}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default OnboardingItem;
