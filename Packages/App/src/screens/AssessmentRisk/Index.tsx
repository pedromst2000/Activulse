import AnimatedComponent from '@/src/components/Animated';
import React from 'react';
import { View, Text } from 'react-native';

const InitAssessment: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 justify-center items-center">
				<Text>Start Screen Assessment</Text>
			</View>
		</AnimatedComponent>
	);
};

export default InitAssessment;
