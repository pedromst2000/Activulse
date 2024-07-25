import React, { PropsWithChildren, createContext, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const FontsContext = createContext<undefined>(undefined);

const FontsProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [loaded, error] = useFonts({
		'Merriweather-Black': require('../assets/fonts/Merriweather-Black.ttf'),
		'Merriweather-Bold': require('../assets/fonts/Merriweather-Bold.ttf'),
		'Merriweather-BoldItalic': require('../assets/fonts/Merriweather-BoldItalic.ttf'),
		'Merriweather-Italic': require('../assets/fonts/Merriweather-Italic.ttf'),
		'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
		'Merriweather-LightItalic': require('../assets/fonts/Merriweather-LightItalic.ttf'),
		'Merriweather-Regular': require('../assets/fonts/Merriweather-Regular.ttf'),
		'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
		'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
		'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
		'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
		'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return <FontsContext.Provider value={undefined}>{children}</FontsContext.Provider>;
};

export default FontsProvider;
