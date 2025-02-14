import AnimatedComponent from '@/src/components/Animated';
import { View, Text } from 'react-native';

const Banners: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View>
				<Text>Banners Feed</Text>
			</View>
		</AnimatedComponent>
	);
};

export default Banners;
