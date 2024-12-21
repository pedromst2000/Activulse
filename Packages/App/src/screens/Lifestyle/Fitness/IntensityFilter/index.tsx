import { Text, View } from 'react-native';
import AnimatedComponent from '../../../../components/Animated';
import GoBackBtn from '@/src/components/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';

type IntensityFilterNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'IntensityFilter'
>;

const IntensityFilter: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<IntensityFilterNavigationProp>();

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
				<Text>Intensity Filter Screen</Text>
			</View>
		</AnimatedComponent>
	);
};

export default IntensityFilter;
