import React, { useMemo } from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type SlideProps = {
	id: number;
	title: string;
	description: string;
};

const OnboardingItem: React.FC<SlideProps> = React.memo(({ id, title, description }) => {
	const { width } = useWindowDimensions();

	const illustrationSource = useMemo(() => {
		const sources = [
			require('../../../assets/images/Onboarding/Onboarding01.webp'),
			require('../../../assets/images/Onboarding/Onboarding02.webp'),
			require('../../../assets/images/Onboarding/Onboarding03.webp'),
			require('../../../assets/images/Onboarding/Onboarding04.webp'),
			require('../../../assets/images/Onboarding/Onboarding05.webp'),
			require('../../../assets/images/Onboarding/Onboarding06.webp'),
			require('../../../assets/images/Onboarding/OnboardingLast.webp'),
		];
		return sources[id] !== undefined
			? sources[id]
			: require('../../../assets/images/Onboarding/Onboarding01.webp'); // Fallback image
	}, [id]);

	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={[styles.container, { width }]}>
				{/* Illustration */}
				<View style={styles.imageContainer}>
					<Image
						source={illustrationSource}
						resizeMode="contain"
						style={[styles.image, { width: width * 0.9, height: width * 0.6 }]}
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
		</ScrollView>
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
		marginTop: 30,
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
		width: 300,
	},
	description: {
		fontFamily: 'Quicksand-Medium',
		color: '#0C2C7E',
		fontSize: 14.22,
		textAlign: 'center',
		width: 290,
	},
});
