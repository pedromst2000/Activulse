import FontsProvider from './src/context/FontsProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/context/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainApp from './Main';
import config from './src/config';

const queryClient = new QueryClient();

const App: React.FC = (): React.JSX.Element => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer theme={config.navigator.theme}>
				<QueryClientProvider client={queryClient}>
					<UserProvider>
						<FontsProvider>
							<MainApp />
						</FontsProvider>
					</UserProvider>
				</QueryClientProvider>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

export default App;
