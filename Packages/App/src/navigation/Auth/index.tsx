import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import SignIn from '../../screens/Auth/SignIn';
import JoinNow from '../../screens/Auth/JoinNow';
import VerifyOTP from '../../screens/Auth/verifyOTP';
import ChangePassword from '../../screens/Auth/ChangePassword';
import VerifyEmail from '@/src/screens/Auth/VerifyEmail';
import { AssessmentRiskStackParamList } from '../AssessmentRisk';

export type AuthStackParamList = {
	SignIn: undefined;
	JoinNow: undefined;
	ForgotPassword: undefined;
	VerifyOTP: { email: string };
	ChangePassword: { email: string };
	VerifyEmail: { email: string };
	AssessmentRiskStack: {
		screen: keyof AssessmentRiskStackParamList; // 'Assessment' | 'Result' | 'HowItWorks';
	};
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="JoinNow" component={JoinNow} />
			<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
			<Stack.Screen name="VerifyOTP" component={VerifyOTP} />
			<Stack.Screen name="ChangePassword" component={ChangePassword} />
			<Stack.Screen name="VerifyEmail" component={VerifyEmail} />
		</Stack.Navigator>
	);
};

export default AuthStack;
