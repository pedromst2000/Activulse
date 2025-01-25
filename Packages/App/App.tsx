import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import FontsProvider from './src/context/FontsProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/context/user';
import { NavigationContainer } from '@react-navigation/native';
import MainApp from './Main';
import config from './src/config';
import utils from './src/utils';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const asyncStoragePersister = createAsyncStoragePersister({
	storage: utils.storage,
});

const App: React.FC = (): React.JSX.Element => {
	const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if (appState === 'active' && nextAppState === 'background') {
				console.info('App transitioning to the background.');

				// Clear sensitive data or reset state
				utils.storage.removeItem('selectedStress');
				utils.storage.removeItem('selectedKnowDiet');
				utils.storage.removeItem('FastFoodState');
				utils.storage.removeItem('selectedGender');
				utils.storage.removeItem('selectedSmoke');
				utils.storage.removeItem('selectedDiabetes');
				utils.storage.removeItem('selectedHypertension');
			}
			setAppState(nextAppState);
		};

		const subscription = AppState.addEventListener('change', handleAppStateChange);

		return () => {
			subscription.remove();
		};
	}, [appState]);

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
