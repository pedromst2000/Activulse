import React from 'react';
import { View, Text } from 'react-native';
import useDefault from '../hooks/ReactQuery/Default';

const Default: React.FC = (): React.JSX.Element => {
	const { data, isError, isLoading} = useDefault();

	return (
		<View className="flex-1 justify-center">
			{isLoading && <Text>Loading...</Text>}
			{isError && <Text>Error</Text>}
			{data && <Text>{data.message}</Text>}
		</View>
	);
};


export default Default;