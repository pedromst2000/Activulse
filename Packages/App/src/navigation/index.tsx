import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserContext } from '../context/user';
import AuthStack, { AuthStackParamList } from './Auth';
import AssessmentRiskStack, { AssessmentRiskStackParamList } from './AssessmentRisk';
import BonusAssessmentStack, { BonusAssessmentStackParamList } from './BonusAssessment';
import HomeStack, { HomeStackParamList } from './Home';
import LifestyleStack, { LifestyleStackParamList } from './Lifestyle';
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import Store from '../screens/Store';
import config from '../config/navigator';
import shouldHideTabBar from '../utils/navigation';
import Icon from '../components/Icon';
import HomeIS from '../assets/svg/icons/BottomTab/HomeIcon_Selected.svg';
import HomeINS from '../assets/svg/icons/BottomTab/HomeIcon_N_Selected.svg';
import LifestyleIS from '../assets/svg/icons/BottomTab/LifestyleIcon_Selected.svg';
import LifestyleINS from '../assets/svg/icons/BottomTab/LifestyleIcon_N_Selected.svg';
import StoreIS from '../assets/svg/icons/BottomTab/StoreIcon_Selected.svg';
import StoreINS from '../assets/svg/icons/BottomTab/StoreIcon_N_Selected.svg';
import ProfileIS from '../assets/svg/icons/BottomTab/ProfileIcon_Selected.svg';
import ProfileINS from '../assets/svg/icons/BottomTab/ProfileIcon_N_Selected.svg';

export type MainTabParamList = {
	Home: undefined;
	Lifestyle: undefined;
	Store: undefined; // to convert to StoreStack later
	Profile: undefined; // to convert to ProfileStack later
};

export type RootStackParamList = {
	Onboarding: undefined;
	MainTabs: undefined;
	AuthStack: {
		screen: keyof AuthStackParamList; // 'SignIn' | 'JoinNow' | 'ForgotPassword';
	};
	AssessmentRiskStack: {
		screen: keyof AssessmentRiskStackParamList; // 'Assessment' | 'Result' | 'HowItWorks';
	};
	BonusAssessmentStack: {
		screen: keyof BonusAssessmentStackParamList; // 'InitBonusAssessment' | 'BonusAssessment' | 'BonusOnboarding';
	};
	HomeStack: {
		screen: keyof HomeStackParamList; // 'HomeScreen' | 'HealthList' | 'GetMoving' | 'QuitSmoking' | 'Leaderboard';
	};
	LifestyleStack: {
		screen: keyof LifestyleStackParamList; // 'FitnessFeed' | 'NutritionFeed' | 'Leaderboard' | 'Activity' | 'Recipe' | 'SelectFeed';
	};
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = (): React.JSX.Element => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				...config.options.screenOptions,
				tabBarStyle: shouldHideTabBar(route)
					? { display: 'none' }
					: {
							backgroundColor: '#EFF6FF',
							height: 64,
						},
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon icon={focused ? HomeIS : HomeINS} width={30} height={30} />
					),
				}}
			/>
			<Tab.Screen
				name="Lifestyle"
				component={LifestyleStack}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon icon={focused ? LifestyleIS : LifestyleINS} width={35} height={35} />
					),
				}}
			/>
			<Tab.Screen
				name="Store"
				component={Store}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon icon={focused ? StoreIS : StoreINS} width={30} height={30} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon icon={focused ? ProfileIS : ProfileINS} width={30} height={30} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const AppNavigator: React.FC = (): React.JSX.Element => {
	const { loggedUser } = useUserContext();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!loggedUser ? (
				<>
					<Stack.Screen name="Onboarding" component={Onboarding} />
					<Stack.Screen name="AuthStack" component={AuthStack} />
				</>
			) : loggedUser && loggedUser?.isNewUser === true ? (
				<>
					<Stack.Screen name="AssessmentRiskStack" component={AssessmentRiskStack} />
				</>
			) : loggedUser &&
			  loggedUser?.isNewUser === false &&
			  loggedUser?.isAssessmentDone === false ? (
				<>
					<Stack.Screen name="BonusAssessmentStack" component={BonusAssessmentStack} />
				</>
			) : (
				<Stack.Screen name="MainTabs" component={MainTabNavigator} />
			)}
		</Stack.Navigator>
	);
};

export default AppNavigator;
