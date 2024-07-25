import {} from 'react-native';
import FontsProvider from './src/context/FontsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Default from './src/components/default';
// import MainApp from './Main';

const queryClient = new QueryClient();

const App: React.FC = (): React.JSX.Element => {
	return (
		<QueryClientProvider client={queryClient}>
			<FontsProvider>
				<Default />
			</FontsProvider>
		</QueryClientProvider>
	);
};

export default App;
