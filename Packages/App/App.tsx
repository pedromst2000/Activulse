import FontsProvider from './src/context/FontsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainApp from './Main';
import config from './src/config';

const queryClient = new QueryClient();

const App: React.FC = (): React.JSX.Element => {
	return (
		<NavigationContainer
			theme={config.navigator.theme}
		>
			<QueryClientProvider client={queryClient}>
				<FontsProvider>
					<MainApp />
				</FontsProvider>
			</QueryClientProvider>
		</NavigationContainer>
	);
};

export default App;
