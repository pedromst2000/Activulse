import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitAssessment from '@/src/screens/AssessmentRisk/Index';
import Assessment from '@/src/screens/AssessmentRisk/Assessment';
import Result from '@/src/screens/AssessmentRisk/Result';
import HowItWorks from '@/src/screens/AssessmentRisk/HowItWorks';
import InitBonusAssessment from '@/src/screens/BonusAssessment';

export type AssessmentRiskStackParamList = {
	InitAssessment: undefined;
	AssessmentRisk: undefined;
	AssessmentRiskResult: {
		riskScore: number;
		typeRisk: string;
		health_data: {
			gender: string;
			age: number;
			smoker: 'Yes' | 'No';
			diabetes: 'Yes' | 'No';
			treatment_for_hypertension: 'Yes' | 'No';
			systolic_blood_pressure: number;
			HDL_cholesterol: number;
			total_cholesterol: number;
		};
	};
	HowItWorks: undefined;
	InitBonusAssessment: undefined;
};

const Stack = createStackNavigator<AssessmentRiskStackParamList>();

const AssessmentRiskStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="InitAssessment" component={InitAssessment} />
			<Stack.Screen name="AssessmentRisk" component={Assessment} />
			<Stack.Screen name="AssessmentRiskResult" component={Result} />
			<Stack.Screen name="HowItWorks" component={HowItWorks} />
			<Stack.Screen name="InitBonusAssessment" component={InitBonusAssessment} />
		</Stack.Navigator>
	);
};

export default AssessmentRiskStack;
