import AnimatedComponent from '@/src/components/Animated';
import React from 'react';
import { View, Text } from 'react-native';

const BonusOnboarding: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 justify-center items-center">
				<Text>Bonus Onboarding Screen</Text>
			</View>
		</AnimatedComponent>
	);
};

export default BonusOnboarding;
