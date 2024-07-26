import FontsProvider from './src/context/FontsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import MainApp from './Main';

const queryClient = new QueryClient();

const App: React.FC = (): React.JSX.Element => {
	return (
		<QueryClientProvider client={queryClient}>
			<FontsProvider>
				<MainApp />
			</FontsProvider>
		</QueryClientProvider>
	);
};

export default App;
