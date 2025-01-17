import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '@/src/screens/Auth/ForgotPassword';
import SignIn from '@/src/screens/Auth/SignIn';
import JoinNow from '@/src/screens/Auth/JoinNow';
import VerifyOTP from '@/src/screens/Auth/verifyOTP';
import ChangePassword from '@/src/screens/Auth/ChangePassword';
import VerifyEmail from '@/src/screens/Auth/VerifyEmail';

export type AuthStackParamList = {
	SignIn: undefined;
	JoinNow: undefined;
	ForgotPassword: undefined;
	VerifyOTP: { email: string };
	ChangePassword: { email: string };
	VerifyEmail: { email: string };
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
