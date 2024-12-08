import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import config from '../config/navigator';

/**
 * @function getCurrentRouteName
 * @description Gets the current route name.
 * @param route - The route object.
 * @returns The current route name.
 */

const getCurrentRouteName = (route: any): string => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? '';

	return routeName;
};

/**
 * @function shouldHideTabBar
 * @description Determines whether the tab bar should be hidden on the current screen.
 * @param route - The route object.
 * @returns A boolean indicating whether the tab bar should be hidden.
 */

const shouldHideTabBar = (route: any): boolean => {
	const routeName = getCurrentRouteName(route);

	return config.hiddenScreens.includes(routeName);
};

export default {
	getCurrentRouteName,
	shouldHideTabBar,
};
