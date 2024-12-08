import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import AnimatedComponent from '../../../../components/Animated';
import { useEffect } from 'react';
import ScreenTitle from '@/src/components/ScreenTitle';

type NutritionFeedRouteProp = RouteProp<LifestyleStackParamList, 'NutritionFeed'>;

const NutritionFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<NutritionFeedRouteProp>();

	useEffect(() => {
		console.log(`Feed Diet: ${route.params.diet}`);
	}, []);

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-primary-50">
				<ScreenTitle label={route.params.diet} onPress={() => navigation.goBack()} />
			</ScrollView>
		</AnimatedComponent>
	);
};

export default NutritionFeed;
