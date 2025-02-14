import AnimatedComponent from '@/src/components/Animated';
import { View, Text } from 'react-native';

const NutritionStoreFeed: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View>
				<Text>Nutrition Store Feed</Text>
			</View>
		</AnimatedComponent>
	);
};

export default NutritionStoreFeed;
