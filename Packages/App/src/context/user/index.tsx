import React, { PropsWithChildren, createContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoggedUser, UserContextProps } from './types';
import SplashScreen from '@/src/components/splashScreen';

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<PropsWithChildren> = ({ children }): React.JSX.Element => {
	const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [animationComplete, setAnimationComplete] = useState<boolean>(false);

	// To load the user from storage when the app starts
	const loadUserFromStorage = async () => {
		try {
			const storedUser = await AsyncStorage.getItem('loggedUser');
			if (storedUser) {
				// If there is a user in storage, set it
				setLoggedUser(JSON.parse(storedUser));
				console.info('User loaded from storage:', JSON.parse(storedUser));
			}
		} catch (error) {
			console.error('Error loading the user from the storage!:', error);
		} finally {
			setLoading(false);
		}
	};

	// To save the user to storage when the user changes
	const saveUserToStorage = async () => {
		try {
			if (loggedUser) {
				await AsyncStorage.setItem('loggedUser', JSON.stringify(loggedUser));
			} else {
				await AsyncStorage.removeItem('loggedUser');
			}
		} catch (error) {
			console.error('Error saving the user in the storage:', error);
		}
	};

	const updateUserStorage = (user: LoggedUser): void => {
		AsyncStorage.setItem('loggedUser', JSON.stringify(user));
		setLoggedUser(user);
	};

	useEffect(() => {
		loadUserFromStorage();
	}, []);

	useEffect(() => {
		saveUserToStorage();
	}, [loggedUser]);

	const contextValue: UserContextProps = useMemo(
		() => ({
			loggedUser: loggedUser,
			setLoggedUser,
			updateUser: updateUserStorage,
		}),
		[loggedUser, setLoggedUser],
	);

	// If the app is still loading, show the splash screen
	if (loading) {
		return <SplashScreen onAnimationFinish={(): void => setAnimationComplete(true)} />;
	}

	// If the app has finished loading, show the children
	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

const useUserContext = (): UserContextProps => {
	const context = React.useContext(UserContext);

	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserProvider');
	}

	return context;
};

export { UserProvider, useUserContext };
