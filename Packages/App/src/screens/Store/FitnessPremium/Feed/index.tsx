import AnimatedComponent from '@/src/components/Animated';
import { View, Text } from 'react-native';

const FitnessStoreFeed: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View>
				<Text>Fitness Store Feed</Text>
			</View>
		</AnimatedComponent>
	);
};

export default FitnessStoreFeed;
