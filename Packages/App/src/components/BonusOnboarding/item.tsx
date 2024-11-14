import React, { useMemo } from 'react';
import {
	View,
	Text,
	Image,
	useWindowDimensions,
	ImageSourcePropType,
	StyleSheet,
} from 'react-native';

const imageMapping: { [key: string]: any } = {
	CareStress: require('../../assets/images/BonusOnboarding/CareStress.webp'),
	CareDiet: require('../../assets/images/BonusOnboarding/CareDiet.webp'),
	Icon: require('../../assets/images/BonusOnboarding/Icon.webp'),
};

type SlideProps = {
	id: number;
	title: string;
	description: string;
	imageKey: string;
};

const BonusOnboardingItem: React.FC<SlideProps> = React.memo(
	({ id, title, description, imageKey }) => {
		const { width } = useWindowDimensions();

		// Memoize the image source to avoid re-calculating on every render
		const illustrationSource: ImageSourcePropType = useMemo(() => {
			return imageMapping[imageKey];
		}, [imageKey]);

		return (
			<View style={[styles.container, { width }]}>
				{/* Illustration */}
				<View style={styles.imageContainer}>
					<Image
						source={illustrationSource}
						resizeMode="contain"
						style={[styles.image, { width: width * 0.8, height: width * 0.5 }]}
					/>
				</View>
				{/* Title & Description Container */}
				<View style={styles.textContainer}>
					<View>
						<Text className="font-merriweather-bold text-secondary-700 text-[22px] text-center w-[300px]">
							{title}
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-secondary-700 text-[14.22px] text-center w-[315px]">
							{description}
						</Text>
					</View>
				</View>
			</View>
		);
	},
);

export default BonusOnboardingItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		marginTop: 8,
	},
	textContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 36,
		gap: 20,
	},
});
