import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import SignIn from '../../screens/Auth/SignIn';
import JoinNow from '../../screens/Auth/JoinNow';

export type AuthStackParamList = {
	SignIn: undefined;
	JoinNow: undefined;
	ForgotPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="JoinNow" component={JoinNow} />
			<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
			{/* <Stack.Screen name="VerifyOTP" component={VerifyOTP} /> */}
			{/* <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
		</Stack.Navigator>
	);
};

export default AuthStack;