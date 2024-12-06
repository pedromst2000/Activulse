import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FitnessFeed from '@/src/screens/Lifestyle/Fitness/Feed';
import NutritionFeed from '@/src/screens/Lifestyle/Nutrition/Feed';
import Lifestyle from '@/src/screens/Lifestyle';
import Leaderboard from '@/src/screens/Leaderboard';
import Activity from '@/src/screens/Lifestyle/Fitness/Activity';
import Recipe from '@/src/screens/Lifestyle/Nutrition/Recipe';
import SelectFeed from '@/src/screens/Lifestyle/Nutrition/SelectFeed';

export type LifestyleStackParamList = {
	LifestyleScreen: undefined; // main screen
	FitnessFeed: undefined;
	NutritionFeed: { diet?: string | undefined };
	Leaderboard: undefined;
	Activity: undefined;
	Recipe: undefined;
	SelectFeed: undefined;
};

const Stack = createStackNavigator<LifestyleStackParamList>();

const LifestyleStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="LifestyleScreen" component={Lifestyle} />
			<Stack.Screen name="FitnessFeed" component={FitnessFeed} />
			<Stack.Screen name="NutritionFeed" component={NutritionFeed} />
			<Stack.Screen name="Activity" component={Activity} />
			<Stack.Screen name="Recipe" component={Recipe} />
			<Stack.Screen name="SelectFeed" component={SelectFeed} />
			<Stack.Screen name="Leaderboard" component={Leaderboard} />
		</Stack.Navigator>
	);
};

export default LifestyleStack;
