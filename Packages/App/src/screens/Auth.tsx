import { Text, View } from 'react-native';
import AnimatedComponent from '../components/Animated';

const Auth: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center">
				<Text className="font-quicksand-bold text-secondary-700 text-base pl-72">
					Auth Screen
				</Text>
			</View>
		</AnimatedComponent>
	);
};

export default Auth;
