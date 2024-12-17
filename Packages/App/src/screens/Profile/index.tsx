import { RefreshControl, ScrollView, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AnimatedComponent from '@/src/components/Animated';
import config from '@/src/config';
import useGetLoggedUser, {
	GetLoggedUserData,
} from '../../hooks/ReactQuery/users/GetLoggedUser';
import { useUserContext } from '../../context/user';
import { useNavigation } from '@react-navigation/native';
import Button from '@/src/components/Button';
import utils from '@/src/utils';
import TopBar from '@/src/components/TopBar';

// type Props = {
// 	id?: number;
// 	isLoggedUser?: boolean;
// };

const Profile: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser, removeSession } = useUserContext();
	const { isLoading, data, isError, isRefetching, refetch } = useGetLoggedUser();

	const handleOnRefresh = (): void => {
		if (isRefetching || isLoading) {
			return;
		}

		refetch();
	};

	const handleSignOut = async (): Promise<void> => {
		removeSession();
	};

	useEffect(() => {
		if (isError) {
			navigation.navigate('Home' as never);
			console.log('Error:', data);
		}
	}, [isError, navigation]);

	return (
		<AnimatedComponent animation="FadeIn">
			<View>
				<TopBar />
			</View>
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
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
					<Text className="text-lg md:text-xl lg:text-2xl">{data?.data.username}</Text>
					<Text className="text-lg md:text-xl lg:text-2xl">{data?.data.email}</Text>
					<Text className="text-lg md:text-xl lg:text-2xl">{data?.data.tag}</Text>
					<Text className="text-lg md:text-xl lg:text-2xl">{data?.data.points}</Text>
					{/* <Text>{data?.data.diet.name}</Text> */}
					<Text className="text-lg md:text-xl lg:text-2xl">{data?.data.gender}</Text>
				</View>
				<View className="flex-1 justify-center items-center space-y-4 md:space-y-6 lg:space-y-8">
					<Button
						className="px-12 py-2"
						// onPress={() => navigation.navigate('C')}
					>
						<Text className="font-quicksand-bold text-secondary-700 text-base md:text-lg lg:text-xl">
							Change Password
						</Text>
					</Button>

					<Button className="px-12 py-2" onPress={handleSignOut}>
						<Text className="font-quicksand-bold text-secondary-700 text-base md:text-lg lg:text-xl">
							Sign Out
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default Profile;
