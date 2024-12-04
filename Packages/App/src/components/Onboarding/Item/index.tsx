import React, { useMemo } from 'react';
import {
	View,
	Text,
	Image,
	useWindowDimensions,
	ImageSourcePropType,
	StyleSheet,
} from 'react-native';

type SlideProps = {
	id: number;
	title: string;
	description: string;
};

const OnboardingItem: React.FC<SlideProps> = React.memo(({ id, title, description }) => {
	const { width } = useWindowDimensions();

	// Memoize the image source to avoid re-calculating on every render
	const illustrationSource: ImageSourcePropType = useMemo(() => {
		const sources: ImageSourcePropType[] = [
			require('../../../assets/images/Onboarding/Onboarding01.webp'),
			require('../../../assets/images/Onboarding/Onboarding02.webp'),
			require('../../../assets/images/Onboarding/Onboarding03.webp'),
			require('../../../assets/images/Onboarding/Onboarding04.webp'),
			require('../../../assets/images/Onboarding/Onboarding05.webp'),
			require('../../../assets/images/Onboarding/Onboarding06.webp'),
			require('../../../assets/images/Onboarding/OnboardingLast.webp'),
		];
		return sources[id] || sources[0];
	}, [id]);

	return (
		<View style={[styles.container, { width }]}>
			{/* Illustration */}
			<View style={styles.imageContainer}>
				<Image
					source={illustrationSource}
					resizeMode="contain"
					style={[styles.image, { width: width * 0.8, height: width * 0.6 }]}
				/>
			</View>
			{/* Title & Description Container */}
			<View style={styles.textContainer}>
				{/* Title */}
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
				</View>
				{/* Description */}
				<View>
					<Text style={styles.description}>{description}</Text>
				</View>
			</View>
		</View>
	);
});

export default OnboardingItem;

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
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontFamily: 'Merriweather-Bold',
		color: '#0C2C7E',
		fontSize: 25.6,
		textAlign: 'center',
	},
	description: {
		fontFamily: 'Quicksand-Medium',
		color: '#0C2C7E',
		fontSize: 14.22,
		textAlign: 'center',
		width: 315,
	},
});
