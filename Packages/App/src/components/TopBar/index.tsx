import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useUserContext } from '../../context/user';
import Icon from '../Icon';
import AppI from '../../assets/svg/ilustrations/Icon.svg';

const TopBar: React.FC = (): React.JSX.Element => {
	const { loggedUser } = useUserContext();

	useEffect(() => {}, []);

	return (
		<View
			className="flex flex-row items-center justify-between w-full  px-4 py-4 mt-4 bg-primary-50 
			border-b border-secondary-700 shadow-md"
		>
			{/* Left Side: Avatar and Greeting */}
			<View className="flex flex-row items-center space-x-3">
				{/* User Avatar */}
				<View className="relative w-14 h-14 rounded-full border-2 border-secondary-700 overflow-hidden">
					<Image
						className="w-full h-full"
						source={
							loggedUser?.avatar !== null
								? { uri: loggedUser?.avatar }
								: {
										uri: 'https://res.cloudinary.com/dvthg2763/image/upload/v1732390121/activevulse/dev/avatars/Profile_avatar_placeholder_large_inh11z.png',
									}
						}
						resizeMode="cover"
					/>
					{/* Dark overlay on avatar */}
					<View className="absolute top-0 left-0 w-full h-full bg-black opacity-5 rounded-full" />
				</View>

				{/* Greeting and Username */}
				<View>
					<Text className="text-[14px] sm:text-[16px] font-quicksand-medium text-secondary-700">
						Hello <Text className="text-[16px] sm:text-[18px]">👋</Text>
					</Text>
					<Text className="text-[14.5px] sm:text-[16.5px] font-quicksand-bold text-secondary-700">
						{loggedUser?.username}
					</Text>
				</View>
			</View>

			{/* Right Side: Icon and Points */}
			<View className="flex flex-row items-center space-x-2 border-2 border-secondary-700 rounded-full px-2 py-1 sm:px-3 sm:py-1">
				{/* Heart Icon */}
				<View className="flex items-center">
					<Icon
						icon={AppI}
						className="w-[24px] h-[24px] 
							sm:w-[24px] sm:h-[24px] 
							md:w-[28px] md:h-[28px] 
							lg:w-[32px] lg:h-[32px] 
						"
					/>
				</View>

				{/* Points */}
				<View>
					<Text className="text-[14px] sm:text-[16px] font-quicksand-semi-bold text-secondary-700">
						{loggedUser?.points ?? '0'}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default TopBar;
