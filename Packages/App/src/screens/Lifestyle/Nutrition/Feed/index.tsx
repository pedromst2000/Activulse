import { Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import AnimatedComponent from '../../../../components/Animated';
import GoBackBtn from '@/src/components/GoBackBtn';
import { useEffect } from 'react';

type NutritionFeedRouteProp = RouteProp<LifestyleStackParamList, 'NutritionFeed'>;

const NutritionFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<NutritionFeedRouteProp>();

	useEffect(() => {
		console.log(`Feed Diet: ${route.params.diet}`);
	}, []);

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
				<Text>Nutrition Feed Screen</Text>
			</View>
		</AnimatedComponent>
	);
};

export default NutritionFeed;
