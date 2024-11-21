import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useUserContext } from '../../context/user';
import Icon from '../Icon';
import AppI from '../../assets/svg/ilustrations/Icon.svg';

const TopBar: React.FC = (): React.JSX.Element => {
	const { loggedUser } = useUserContext();

	useEffect(() => {
		console.log('loggedUserds:', JSON.stringify(loggedUser, null, 2));
	}, []);

	return (
		<View
			className="flex flex-row items-center justify-between w-full px-4 py-4 mt-4 bg-primary-50 
			border-b border-secondary-200 shadow-md"
		>
			{/* Left Side: Avatar and Greeting */}
			<View className="flex flex-row items-center space-x-4">
				{/* User Avatar */}
				<View className="relative w-14 h-14 rounded-full border-2 border-secondary-700 overflow-hidden">
					
					
					{/*TODO:
						Add a fallback avatar if the user doesn't have one set (bug prevention)
						
						*/}

					<Image
						className="w-full h-full"
						source={
							loggedUser?.avatar !== null
								? { uri: loggedUser?.avatar }
								: {
										uri: `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${loggedUser?.username}`,
									}
						}
						resizeMode="cover"
					/>
					{/* Dark overlay on avatar */}
					<View className="absolute top-0 left-0 w-full h-full bg-black opacity-5 rounded-full" />
				</View>

				{/* Greeting and Username */}
				<View>
					<Text className="text-[16px] font-quicksand-medium text-secondary-700">
						Hello <Text className="text-[18px]">👋</Text>
					</Text>
					<Text className="text-[18px] font-quicksand-bold text-secondary-700">
						{loggedUser?.username}
					</Text>
				</View>
			</View>

			{/* Right Side: Icon and Points */}
			<View className="flex flex-row items-center space-x-2 border-2 border-secondary-700 rounded-full px-3 py-1">
				{/* Heart Icon */}
				<View className="flex items-center">
					<Icon icon={AppI} width={24} height={24} />
				</View>

				{/* Points */}
				<View>
					<Text className="text-[16px] font-quicksand-bold text-secondary-700">
						{loggedUser?.points ?? '0'}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default TopBar;
