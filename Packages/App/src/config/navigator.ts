interface Theme {
	dark: boolean;
	colors: {
		primary: string;
		background: string;
		card: string;
		text: string;
		border: string;
		notification: string;
	};
}

interface ScreenOptions {
	headerShown: boolean;
	tabBarActiveBackgroundColor: string;
	tabBarActiveTintColor: string;
	tabBarHideOnKeyboard: boolean;
}

interface TabItemStyle {
	paddingBottom: number;
	paddingTop: number;
}

interface Options {
	theme: Theme;
	screenOptions: ScreenOptions;
	tabItemStyle: TabItemStyle;
}

const options: Options = {
	theme: {
		dark: false,
		colors: {
			primary: '#F8F5FF',
			background: '#F8F5FF',
			card: '#F8F5FF',
			text: '#0C2C7E',
			border: '#F8F5FF',
			notification: '#F8F5FF',
		},
	},
	screenOptions: {
		headerShown: false,
		tabBarActiveBackgroundColor: '#EFF6FF',
		tabBarActiveTintColor: '#0C2C7E',
		tabBarHideOnKeyboard: true,
	},
	tabItemStyle: {
		paddingBottom: 7,
		paddingTop: 7,
	},
	// Todo: Add Options for TopBar Navigation (Store)
};

/**
 * @description List of screens that should hide the tab bar.
 */
const hiddenScreens: string[] = [
	'FitnessFeed',
	'NutritionFeed',
	'Activity',
	'Recipe',
	'Leaderboard',
	'HealthList',
	'GetMoving',
	'QuitSmoking',
	'SelectFeed',
	'IntensityFilter',
	'PracticeActivity',
];

export default {
	options,
	hiddenScreens,
};
