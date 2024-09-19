import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitBonusAssessment from '@/src/screens/BonusAssessment';
import BonusAssessment from '@/src/screens/BonusAssessment/Assessment';
import BonusOnboarding from '@/src/screens/BonusAssessment/BonusOnboarding';

export type BonusAssessmentRiskStackParamList = {
	InitBonusAssessment: undefined;
	BonusAssessment: undefined;
	BonusOnboarding: {
		isFastFood?: boolean;
	};
};

const Stack = createStackNavigator<BonusAssessmentRiskStackParamList>();

const BonusAssessmentRiskStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="InitBonusAssessment" component={InitBonusAssessment} />
			<Stack.Screen name="BonusAssessment" component={BonusAssessment} />
			<Stack.Screen name="BonusOnboarding" component={BonusOnboarding} />
		</Stack.Navigator>
	);
};

export default BonusAssessmentRiskStack;
