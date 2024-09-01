import { Text, View } from 'react-native';
import AnimatedComponent from '../components/Animated';
import { useEffect, useState } from 'react';

const Home: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<Text className="font-quicksand-bold text-secondary-700 text-base">Home Screen</Text>
			</View>
		</AnimatedComponent>
	);
};

export default Home;
