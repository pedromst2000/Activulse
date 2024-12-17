import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedComponent from '../../components/Animated';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '@/src/components/ScreenTitle';

const Leaderboard: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				className="flex-1 bg-primary-50"
			>
				<ScreenTitle label="Leaderboard" onPress={() => navigation.goBack()} />
			</ScrollView>
		</AnimatedComponent>
	);
};

export default Leaderboard;
