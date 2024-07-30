import { Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AnimatedComponent from '../components/Animated';
import SignInForm from '../components/Auth/SignInForm';
import JoinNowForm from '../components/Auth/JoinNowForm';
import { RouteProp, useRoute } from '@react-navigation/native';
import Button from '../components/Button';

type RootStackParamList = {
	Auth: {
		screen: string;
	};
};

type AuthRouteProp = RouteProp<RootStackParamList, 'Auth'>;

const Auth: React.FC = (): React.JSX.Element => {
	const route = useRoute<AuthRouteProp>();
	const { screen } = route.params;
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			{screen === 'SignIn' ? <SignInForm /> : <JoinNowForm />}
		</AnimatedComponent>
	);
};

export default Auth;
