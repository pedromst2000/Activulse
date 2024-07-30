import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

type SplashScreenProps = {
	onAnimationFinish: () => void;
};

const styles = StyleSheet.create({
	SplashScreen: {
		width: 600,
		height: 400,
	},
});

const SplashScreen: React.FC<SplashScreenProps> = ({
	onAnimationFinish,
}): React.JSX.Element => {
	useEffect(() => {
		setTimeout(() => {
			onAnimationFinish();
		}, 3800);
	}, [onAnimationFinish]);

	return (
		<View
			className="items-center justify-center flex-1 bg-primary-50
        "
		>
			<LottieView
				source={require('../assets/gif/SplashScreen.json')}
				autoPlay={true}
				loop={false}
				speed={1}
				style={styles.SplashScreen}
				onAnimationFinish={onAnimationFinish}
			/>
		</View>
	);
};

export default SplashScreen;
