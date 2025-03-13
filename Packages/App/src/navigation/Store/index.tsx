import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Store from '@/src/screens/Store';
import FitnessStoreFeed from '@/src/screens/Store/FitnessPremium/Feed';
import NutritionStoreFeed from '@/src/screens/Store/NutritionPremium/Feed';
import Leaderboard from '@/src/screens/Leaderboard';
import RecipeStoreDetails from '@/src/screens/Store/NutritionPremium/RecipeDetails';

export type StoreStackParamList = {
	StoreScreen: undefined; // main screen
	FitnessStoreFeed: undefined;
	NutritionStoreFeed: { recipeBoughtId: number };
	RecipeStore: { recipeId: number };
	Leaderboard: undefined;
};

const Stack = createStackNavigator<StoreStackParamList>();

const StoreStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="StoreScreen" component={Store} />
			<Stack.Screen name="FitnessStoreFeed" component={FitnessStoreFeed} />
			<Stack.Screen name="NutritionStoreFeed" component={NutritionStoreFeed} />
			<Stack.Screen name="RecipeStore" component={RecipeStoreDetails} />
			<Stack.Screen name="Leaderboard" component={Leaderboard} />
		</Stack.Navigator>
	);
};

export default StoreStack;
