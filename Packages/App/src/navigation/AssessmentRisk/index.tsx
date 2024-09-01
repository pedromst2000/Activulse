import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitAssessment from '@/src/screens/AssessmentRisk/Index';
import Assessment from '@/src/screens/AssessmentRisk/Assessment';
import Result from '@/src/screens/AssessmentRisk/Result';
import HowItWorks from '@/src/screens/AssessmentRisk/HowItWorks';

export type AssessmentRiskStackParamList = {
	InitAssessment: undefined;
	AssessmentRisk: undefined;
	AssessmentRiskResult: undefined;
	HowItWorks: undefined;
};

const Stack = createStackNavigator<AssessmentRiskStackParamList>();

const AssessmentRiskStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="InitAssessment" component={InitAssessment} />
			<Stack.Screen name="AssessmentRisk" component={Assessment} />
			<Stack.Screen name="AssessmentRiskResult" component={Result} />
			<Stack.Screen name="HowItWorks" component={HowItWorks} />
		</Stack.Navigator>
	);
};

export default AssessmentRiskStack;
