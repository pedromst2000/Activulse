import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
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
	const animationRef = useRef<LottieView>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (animationRef.current) {
				animationRef.current.reset();
			}
			onAnimationFinish();
		}, 4800);

		return () => clearTimeout(timer);
	}, [onAnimationFinish]);

	return (
		<View className="flex-1 items-center justify-center bg-primary-50">
			<LottieView
				ref={animationRef}
				source={require('../../assets/gif/SplashScreen.json')}
				autoPlay={true}
				loop={false}
				speed={1}
				style={{ width: '100%', height: '100%' }}
				onAnimationFinish={onAnimationFinish}
			/>
		</View>
	);
};

export default SplashScreen;
