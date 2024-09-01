import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from '../components/Icon';
import HomeIS from '../assets/svg/icons/BottomTab/HomeIcon_Selected.svg';
import HomeINS from '../assets/svg/icons/BottomTab/HomeIcon_N_Selected.svg';
import LifestyleIS from '../assets/svg/icons/BottomTab/LifestyleIcon_Selected.svg';
import LifestyleINS from '../assets/svg/icons/BottomTab/LifestyleIcon_N_Selected.svg';
import StoreIS from '../assets/svg/icons/BottomTab/StoreIcon_Selected.svg';
import StoreINS from '../assets/svg/icons/BottomTab/StoreIcon_N_Selected.svg';
import ProfileIS from '../assets/svg/icons/BottomTab/ProfileIcon_Selected.svg';
import ProfileINS from '../assets/svg/icons/BottomTab/ProfileIcon_N_Selected.svg';
import Home from '../screens/Home';
import Lifestyle from '../screens/Lifestyle/Lifestyle';
import Profile from '../screens/Profile/Profile';
import Store from '../screens/Store/Store';
import AuthStack, { AuthStackParamList } from './Auth/index';
import OnBoarding from '../screens/Onboarding';
import { useUserContext } from '../context/user';
import AssessmentRiskStack, { AssessmentRiskStackParamList } from './AssessmentRisk';
import config from '../config';
import BonusAssessmentStack, { BonusAssessmentStackParamList } from './BonusAssessment';

export type MainTabParamList = {
	Home: undefined;
	Lifestyle: undefined;
	Store: undefined;
	Profile: undefined;
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
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = (): React.JSX.Element => {
	const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>('PORTRAIT');

	const HomeIconSelected = useCallback(
		() => <Icon icon={HomeIS} width={30} height={30} />,
		[],
	);
	const LifestyleIconSelected = useCallback(
		() => <Icon icon={LifestyleIS} width={35} height={35} />,
		[],
	);
	const StoreIconSelected = useCallback(
		() => <Icon icon={StoreIS} width={30} height={30} />,
		[],
	);
	const ProfileIconSelected = useCallback(
		() => <Icon icon={ProfileIS} width={30} height={30} />,
		[],
	);
	const HomeIconNotSelected = useCallback(
		() => <Icon icon={HomeINS} width={30} height={30} />,
		[],
	);
	const LifestyleIconNotSelected = useCallback(
		() => <Icon icon={LifestyleINS} width={35} height={35} />,
		[],
	);
	const StoreIconNotSelected = useCallback(
		() => <Icon icon={StoreINS} width={30} height={30} />,
		[],
	);
	const ProfileIconNotSelected = useCallback(
		() => <Icon icon={ProfileINS} width={30} height={30} />,
		[],
	);

	useEffect(() => {
		Dimensions.addEventListener('change', ({ window: { width, height } }) => {
			setOrientation(width < height ? 'PORTRAIT' : 'LANDSCAPE');
		});
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				...config.navigator.screenOptions,
				tabBarItemStyle: config.navigator.tabItemStyle,
				tabBarActiveTintColor: config.navigator.screenOptions.tabBarActiveTintColor,
				tabBarLabelPosition: orientation === 'PORTRAIT' ? 'below-icon' : 'beside-icon',
				tabBarStyle: {
					backgroundColor: '#EFF6FF',
					height: orientation === 'PORTRAIT' ? 64 : 50,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => (focused ? HomeIconSelected() : HomeIconNotSelected()),
					tabBarItemStyle: config.navigator.tabItemStyle,
				}}
			/>

			<Tab.Screen
				name="Lifestyle"
				component={Lifestyle}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? LifestyleIconSelected() : LifestyleIconNotSelected(),
				}}
			/>

			<Tab.Screen
				name="Store"
				component={Store}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? StoreIconSelected() : StoreIconNotSelected(),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? ProfileIconSelected() : ProfileIconNotSelected(),
				}}
			/>
		</Tab.Navigator>
	);
};

const AppNavigator: React.FC = (): React.JSX.Element => {
	const { loggedUser } = useUserContext();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* Guard Clause routes */}
			{!loggedUser ? (
				<>
					<Stack.Screen name="Onboarding" component={OnBoarding} />
					<Stack.Screen name="AuthStack" component={AuthStack} />
				</>
			) : loggedUser && loggedUser?.isNewUser === true ? (
				<Stack.Screen name="AssessmentRiskStack" component={AssessmentRiskStack} />
			) : loggedUser &&
			  loggedUser?.isNewUser === false &&
			  loggedUser?.isAssessmentDone === false ? (
				<Stack.Screen name="BonusAssessmentStack" component={BonusAssessmentStack} />
			) : null}
		</Stack.Navigator>
	);
};

export default AppNavigator;
