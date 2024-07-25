import AsyncStorage from '@react-native-async-storage/async-storage';

interface Storage {
	setItem: (key: string, value: string) => Promise<void>;
	getItem: (key: string) => Promise<string | null>;
	removeItem: (key: string) => Promise<void>;
}

const storage: Storage = {
	setItem: async (key: string, value: string): Promise<void> => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.error('Failed to save the data to the storage', e);
		}
	},
	getItem: async (key: string): Promise<string | null> => {
		try {
			const value = await AsyncStorage.getItem(key);
			return value;
		} catch (e) {
			console.error('Failed to fetch the data from storage', e);
			return null;
		}
	},
	removeItem: async (key: string): Promise<void> => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (e) {
			console.error('Failed to remove the data from storage', e);
		}
	},
};

export default storage;
