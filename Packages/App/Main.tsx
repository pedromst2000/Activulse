import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './src/components/splashScreen';
import Default from './src/components/default';

const MainApp: React.FC = (): React.JSX.Element => {
	const [animationComplete, setAnimationComplete] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	return (
		<View
			className="flex-1 justify-center
			items-center
		"
		>
			{!animationComplete && !anErrorOccurred && (
				<SplashScreen onAnimationFinish={() => setAnimationComplete(true)} />
			)}
			{animationComplete && !anErrorOccurred && (
				<>
					{animationComplete}
					<Default />
				</>
			)}
		</View>
	);
};

export default MainApp;
