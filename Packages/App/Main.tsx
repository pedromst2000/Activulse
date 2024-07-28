import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './src/components/splashScreen';
import Onboarding from './src/screens/Onboarding';
import { StatusBar } from 'react-native';

const MainApp: React.FC = (): React.JSX.Element => {
	const [animationComplete, setAnimationComplete] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	return (
		<View
			className="flex-1 justify-center
			items-center bg-primary-50
		"
		>
			<StatusBar backgroundColor="#EFF6FF" barStyle="dark-content" animated={true} />
			{!animationComplete && !anErrorOccurred && (
				<SplashScreen onAnimationFinish={() => setAnimationComplete(true)} />
			)}
			{animationComplete && !anErrorOccurred && (
				<>
					{animationComplete}
					<Onboarding />
				</>
			)}
		</View>
	);
};

export default MainApp;
