import { Text, View } from 'react-native';
import AnimatedComponent from '../../../../components/Animated';
import GoBackBtn from '@/src/components/GoBackBtn';
import { useNavigation } from '@react-navigation/native';

const Activity: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
				<Text>Activity Details Screen</Text>
			</View>
		</AnimatedComponent>
	);
};

export default Activity;
