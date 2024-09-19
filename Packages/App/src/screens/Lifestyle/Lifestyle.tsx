import { Text, View } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import TopBar from '@/src/components/TopBar';


const Lifestyle: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View>
				<TopBar />
			</View>
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<Text className="font-quicksand-bold text-secondary-700 text-base">Lifestyle Screen</Text>
			</View>
		</AnimatedComponent>
	);
};

export default Lifestyle;
