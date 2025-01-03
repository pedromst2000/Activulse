import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/src/screens/Home';
import InitBonusAssessment from '@/src/screens/BonusAssessment';
import BonusAssessment from '@/src/screens/BonusAssessment/Assessment';
import BonusOnboarding from '@/src/screens/BonusAssessment/BonusOnboarding';

export type BonusAssessmentStackParamList = {
	InitBonusAssessment: undefined;
	BonusAssessment: undefined;
	BonusOnboarding: {
		isFastFood?: boolean;
		fastFoodState?: 'Rare' | 'Sometimes' | 'Frequently' | null;
		stressState?: 'Rare' | 'Sometimes' | 'Frequently' | null;
	};
	Home: undefined;
};

const Stack = createStackNavigator<BonusAssessmentStackParamList>();

const BonusAssessmentStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="InitBonusAssessment" component={InitBonusAssessment} />
			<Stack.Screen name="BonusAssessment" component={BonusAssessment} />
			<Stack.Screen name="BonusOnboarding" component={BonusOnboarding} />
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
};

export default BonusAssessmentStack;
