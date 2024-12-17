import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import FontsProvider from './src/context/FontsProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, useUserContext } from './src/context/user';
import { NavigationContainer } from '@react-navigation/native';
import MainApp from './Main';
import config from './src/config';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage,
});

/**
 * The main application component.
 *
 * This component sets up the root view for gesture handling, navigation, and context providers.
 * It ensures that the assessment form data is reset when the user leaves the assessment screen
 * without completing it or closes the app. This prevents the next user from seeing previous data
 * that might be stored in async storage from other users who signed in on the same device.
 *
 * @returns {React.JSX.Element} The root component of the application.
 */
const App: React.FC = (): React.JSX.Element => {

	useEffect(() => {
		//unmount
		return () => {
			AsyncStorage.removeItem('selectedGender');
			AsyncStorage.removeItem('selectedSmoke');
			AsyncStorage.removeItem('selectedDiabetes');
			AsyncStorage.removeItem('selectedHypertension');
		};
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style="auto" />

			<NavigationContainer theme={config.navigator.options.theme}>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister: asyncStoragePersister }}
				>
					<UserProvider>
						<FontsProvider>
							<MainApp />
						</FontsProvider>
					</UserProvider>
				</PersistQueryClientProvider>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

export default App;
