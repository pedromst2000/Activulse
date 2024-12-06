import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/src/screens/Home';
import HealthList from '@/src/screens/Education/HealthList';
import GetMoving from '@/src/screens/Education/GetMoving';
import QuitSmoking from '@/src/screens/Education/QuitSmoking';
import Leaderboard from '@/src/screens/Leaderboard';

export type HomeStackParamList = {
	HomeScreen: undefined; // main screen
	HealthList: undefined;
	GetMoving: undefined;
	QuitSmoking: undefined;
	Leaderboard: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = (): React.JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeScreen" component={Home} />
			<Stack.Screen name="HealthList" component={HealthList} />
			<Stack.Screen name="GetMoving" component={GetMoving} />
			<Stack.Screen name="QuitSmoking" component={QuitSmoking} />
			<Stack.Screen name="Leaderboard" component={Leaderboard} />
		</Stack.Navigator>
	);
};

export default HomeStack;
