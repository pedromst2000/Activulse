import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const JoinNowForm: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<View className="items-center justify-center flex-1 p-8 bg-primary-50">
			<Button text="Go Back" onPress={(): void => navigation.goBack()} />
			<View>
				<Text className="font-merriweather-bold text-xl text-secondary-700">
					Join Now Form - Get Started
				</Text>
			</View>
			<View>
				<Button text="Join Now" onPress={(): void => console.log('Join Now')} />
			</View>
		</View>
	);
};

export default JoinNowForm;
