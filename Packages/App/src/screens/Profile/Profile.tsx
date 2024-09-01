import { RefreshControl, ScrollView, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AnimatedComponent from '@/src/components/Animated';
import config from '@/src/config';
import useGetLoggedUser, { GetLoggedUserData } from '../../hooks/ReactQuery/users/GetLoggedUser';
import { useUserContext } from '../../context/user';
import { useNavigation } from '@react-navigation/native';
import Button from '@/src/components/Button';
import utils from '@/src/utils';

// type Props = {
// 	id?: number;
// 	isLoggedUser?: boolean;
// };

const Profile: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser } = useUserContext();
	const { isLoading, data, isError, isRefetching, refetch } = useGetLoggedUser();

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		refetch();
	};

	const handleSignOut = async (): Promise<void> => {
		// Remove the tokens from the device storage
		await utils.storage.removeItem('authToken');
		await utils.storage.removeItem('refreshToken');

		// Update the global state
		setLoggedUser(null);
	};

	useEffect(() => {
		if (isError) {
			navigation.navigate('Home' as never);
			// get the error message from the hook
			console.log('Error:', data);
		}
	}, [isError, navigation]);

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<Text className="text-2xl font-bold text-primary-500">Profile</Text>
				<View className="flex-1 justify-center items-center">
					<View>
						{/* <Image
							source={{
								uri: data?.data.selected_avatar.avatar,
							}}
							width={100}
							height={100}
						/> */}
					</View>
					<Text>{data?.data.username}</Text>
					<Text>{data?.data.email}</Text>
					<Text>{data?.data.tag}</Text>
					<Text>{data?.data.points}</Text>
					{/* <Text>{data?.data.diet.name}</Text> */}
					<Text>{data?.data.gender}</Text>
				</View>
				<View
					className='flex-1 justify-center items-center space-y-10'
				>
					<Button
						// onPress={() => navigation.navigate('C')}
					>
						<Text>Change Password</Text>
					</Button>

					<Button onPress={handleSignOut}>
						<Text>Sign Out</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default Profile;
