import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
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
import Lifestyle from '../screens/Lifestyle';
import Profile from '../screens/Profile';
import Store from '../screens/Store';
import { AuthStackParamList } from './Auth/index';
import OnBoarding from '../screens/Onboarding';
import { useUserContext } from '../context/user';
import AuthStack from '../navigation/Auth/index';
import utils from '../navigation/utils';
import config from '../config';

export type RootStackParamList = {
	Home: undefined;
	Lifestyle: undefined;
	Store: undefined;
	Profile: undefined;
	Onboarding: undefined;
	AuthStack: {
		screen: keyof AuthStackParamList; // 'SignIn' | 'JoinNow' | 'ForgotPassword';
	};
	MainTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const MainTabNavigator: React.FC = () => {
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
				component={utils.guardClause(true, Home, useUserContext().loggedUser)}
				options={{
					tabBarIcon: ({ focused }) => (focused ? HomeIconSelected() : HomeIconNotSelected()),
					tabBarItemStyle: config.navigator.tabItemStyle,
				}}
			/>

			<Tab.Screen
				name="Lifestyle"
				component={utils.guardClause(true, Lifestyle, useUserContext().loggedUser)}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? LifestyleIconSelected() : LifestyleIconNotSelected(),
				}}
			/>

			<Tab.Screen
				name="Store"
				component={utils.guardClause(true, Store, useUserContext().loggedUser)}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? StoreIconSelected() : StoreIconNotSelected(),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={utils.guardClause(true, Profile, useUserContext().loggedUser)}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? ProfileIconSelected() : ProfileIconNotSelected(),
				}}
			/>
		</Tab.Navigator>
	);
};

const AppNavigator: React.FC = () => {
	const { loggedUser } = useUserContext();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!loggedUser ? (
				<>
					<Stack.Screen name="Onboarding" component={OnBoarding} />
					<Stack.Screen name="AuthStack" component={AuthStack} />
				</>
			) : (
				<Stack.Screen name="MainTabs" component={MainTabNavigator} />
			)}
		</Stack.Navigator>
	);
};

export default AppNavigator;
