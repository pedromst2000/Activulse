import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import config from '../config/navigator';

/**
 * Determines whether the tab bar should be hidden on the current screen.
 * @param route - The route object.
 * @returns A boolean indicating whether the tab bar should be hidden.
 */

const shouldHideTabBar = (route: any): boolean => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? '';

	return config.hiddenScreens.includes(routeName);
};

export default shouldHideTabBar;
