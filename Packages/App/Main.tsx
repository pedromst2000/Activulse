import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import utils from './src/utils';
import AppNavigator from './src/navigation';
import { useUserContext } from './src/context/user';
import EmptyState from './src/components/EmptyState';
import Loading from './src/components/Loading';
import SplashScreen from './src/components/splashScreen';
import ErrorIlus from './src/assets/svg/ilustrations/EmptyStates/ErrorServer.svg';

const MainApp: React.FC = (): React.JSX.Element => {
	const [animationComplete, setAnimationComplete] = useState<boolean>(false);
	const [loadingUser, setLoadingUser] = useState<boolean>(true); // Add a loading state for user loading
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);
	const { setLoggedUser } = useUserContext();

	// Fetch the logged user from storage
	useEffect(() => {
		const loadUserFromStorage = async () => {
			try {
				const storedUser = await utils.storage.getItem('loggedUser');
				if (storedUser) {
					setLoggedUser(JSON.parse(storedUser));
				}
			} catch (error: any) {
				console.error('Error loading user from storage:', error);
				if (error.message === 'Network Error') {
					console.error('Network error occurred while loading user from storage');
				}
				setAnErrorOccurred(true); // Set error state if there's an issue
			} finally {
				setLoadingUser(false); // Once user is loaded or error occurs, stop loading
			}
		};

		loadUserFromStorage();
	}, [setLoggedUser]);

	// Display the SplashScreen until the animation is done
	if (!animationComplete) {
		return <SplashScreen onAnimationFinish={(): void => setAnimationComplete(true)} />;
	}

	// // Display error screen if any error occurred
	if (anErrorOccurred) {
		console.log('An error occurred while loading the user from storage');

		return (
			<EmptyState
				type="Error"
				_ilustration_={ErrorIlus}
				message="Oops! Internal Server Error"
				description="Uh-oh! It looks like something went wrong on our end. Our tech team is already working hard to fix it. Please try again later. Thanks for your patience and understanding!"
			/>
		);
	}

	// // Show a loading screen while fetching the user from storage
	if (loadingUser) {
		return <Loading />;
	}

	// Once everything is ready, show the AppNavigator
	return (
		<View className="w-full h-full">
			<AppNavigator />
		</View>
	);
};

export default MainApp;
