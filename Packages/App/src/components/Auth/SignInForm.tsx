import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const SignInForm: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<View className="items-center justify-center flex-1 p-8 bg-primary-50">
			<Button text="Go Back" onPress={(): void => navigation.goBack()} />

			<Text className="font-merriweather-bold text-xl text-secondary-700">
				Sign In Form - Welcome Back
			</Text>
			<Button text="Sign In" onPress={(): void => console.log('Sign In')} />
		</View>
	);
};

export default SignInForm;
