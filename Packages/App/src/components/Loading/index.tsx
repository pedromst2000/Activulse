import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loading: React.FC = (): React.JSX.Element => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#0000ff" />
			<Text style={styles.text}>Loading...</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EFF6FF',
	},
	text: {
		marginTop: 10,
		fontSize: 16,
		color: '#333',
	},
});

export default Loading;
