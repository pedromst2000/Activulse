import React, { useState } from 'react';
import { View } from 'react-native';
import Error from './src/components/Error';
import SplashScreen from './src/components/splashScreen';
import AppNavigator from './src/navigation';

const MainApp: React.FC = (): React.JSX.Element => {
	const [animationComplete, setAnimationComplete] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	return (
		<View className="w-full h-full">
			{!animationComplete && (
				<SplashScreen onAnimationFinish={(): void => setAnimationComplete(true)} />
			)}

			{animationComplete && anErrorOccurred && <Error />}

			{animationComplete && !anErrorOccurred && <AppNavigator />}
		</View>
	);
};

export default MainApp;
