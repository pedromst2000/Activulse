import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import FontsProvider from './src/context/FontsProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/context/user';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
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

const App: React.FC = (): React.JSX.Element => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer theme={config.navigator.theme}>
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
