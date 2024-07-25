import { NavigationProp } from '@react-navigation/native';

/**
 * Retrieves the name of the current screen from the navigation state.
 * @param navigation - The navigation prop object.
 * @returns The name of the current screen.
 */
const getCurrentScreen = (navigation: NavigationProp<any>): string => {
	return navigation.getState()?.routes[navigation.getState().index].name;
};

export default { getCurrentScreen };
