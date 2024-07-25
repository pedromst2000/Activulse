import { Dimensions } from 'react-native';

/**
 * Checks if the device screen is in horizontal orientation.
 * @returns {boolean} True if the screen is horizontal, false otherwise.
 */
const isHorizontal = (): boolean => {
	const dim = Dimensions.get('screen');
	return dim.width >= dim.height;
};

export default { isHorizontal };
