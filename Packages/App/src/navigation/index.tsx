import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import config from '../config';
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
import Auth from '../screens/Auth';
import OnBoarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import Store from '../screens/Store';
import { useUserContext } from '../context/user';
import utils from '../navigation/utils';

type RootStackParamList = {
	OnBoarding: undefined;
	Auth: undefined;
	Home: undefined;
	Lifestyle: undefined;
	Store: undefined;
	// Profile: { id: number | 'me' }; // User ID'
	Profile: undefined;
	// OwnProfile: undefined;
	// EditGoals: undefined;
	// Leaderboard: undefined;
	// Education: undefined;
	// ChallengesFeed: undefined;
	// ChallengeDetails: { id: number }; // Challenge ID
	// FilterChallenges: undefined;
	// FitnessFeed: undefined;
	// FitnessDetails: { id: number }; // Fitness ID
	// FilterFitness: undefined;
	// NutritionFeed: {diet: string}; // type of diet for the feed
	// NutritionDetails: { id: number }; // Nutrition ID
	// Dashboard: undefined;
	// Achievments: undefined;
	// EditProfile: undefined;
	// Favorites: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { loggedUser } = useUserContext();

	const [currentScreen, setCurrentScreen] = useState<string>('');
	const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>('PORTRAIT');

	// Navbar icons - selected and not selected
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
		return navigation.addListener('state', (e) => {
			// Set the current route name
			setCurrentScreen(e.data.state.routes[e.data.state.index].name);
		});
	});

	useEffect(() => {
		Dimensions.addEventListener('change', ({ window: { width, height } }) => {
			setOrientation(width < height ? 'PORTRAIT' : 'LANDSCAPE');
		});
	}, []);

	// if (!loggedUser) {
	// 	return (
	// 		<Tab.Navigator
	// 			initialRouteName="OnBoarding"
	// 			screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
	// 		>
	// 			<Tab.Screen
	// 				name="OnBoarding"
	// 				component={utils.guardClause(false, OnBoarding, loggedUser)}
	// 			/>
	// 			<Tab.Screen name="Auth" component={utils.guardClause(false, Auth, loggedUser)} />
	// 		</Tab.Navigator>
	// 	);
	// }

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
			{/* _________________________________________________________________________________ */}

			{/* OnBoarding */}
			{/* <Tab.Screen
				name="OnBoarding"
				component={OnBoarding}
			/> */}

			{/* Home */}
			<Tab.Screen
				name="Home"
				// component={utils.guardClause(true, Home, loggedUser)}
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => {
						return focused ? HomeIconSelected() : HomeIconNotSelected();
					},
					tabBarItemStyle: config.navigator.tabItemStyle,
				}}
			/>

			{/* Lifestyle */}
			<Tab.Screen
				name="Lifestyle"
				// component={utils.guardClause(true, Lifestyle, loggedUser)}
				component={Lifestyle}
					options={{
					tabBarIcon: ({ focused }) => {
						return focused ? LifestyleIconSelected() : LifestyleIconNotSelected();
					},
				}}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Store */}
			<Tab.Screen
				name="Store"
				// component={utils.guardClause(true, Store, loggedUser)}
				component={Store}				
				options={{
					tabBarIcon: ({ focused }) => {
						return focused ? StoreIconSelected() : StoreIconNotSelected();
					},
				}}
			/>

			{/* _________________________________________________________________________________ */}

			{/* Profile */}
			<Tab.Screen
				name="Profile"
				// component={utils.guardClause(true, Profile, loggedUser)}
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => {
						return focused ? ProfileIconSelected() : ProfileIconNotSelected();
					},
				}}
			/>

			{/* _________________________________________________________________________________ */}
		</Tab.Navigator>
	);
};

export default Navigation;
