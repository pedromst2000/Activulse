import React from 'react';
import { Text, View } from 'react-native';
import SucccessI from '../../assets/svg/icons/SuccessIconV2.svg';
import ErrorI from '../../assets/svg/icons/ErrorIcon_V2.svg';

type MessageProps = {
	type?: 'success' | 'error' | 'AddFav' | 'RemoveFav' | 'Workout';
	message?: string;
};

const Message: React.FC<MessageProps> = ({ type, message }): React.JSX.Element => {
	return (
		<View className="flex flex-row items-center justify-center w-full mt-5">
			<View
				className={`absolute top-0 w-full flex flex-row items-center justify-center ${type === 'success' ? 'bg-success-500' : 'bg-error-500'} rounded-3xl px-4 py-2`}
				style={{ maxWidth: '90%', marginHorizontal: '5%' }}
			>
				<View className="mr-4">
					{type === 'success' ? (
						<SucccessI width={19} height={15} />
					) : type === 'error' || type === 'RemoveFav' ? (
						<ErrorI width={19} height={15} />
					) : type === 'AddFav' || type === 'Workout' ? (
						<Text className="w-6 h-6 flex items-center justify-center text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl bg-primary-50 rounded-full">
							{type === 'AddFav' ? '⭐' : type === 'Workout' ? '💥' : null}
						</Text>
					) : null}
				</View>

				<Text className="font-quicksand-bold text-primary-50 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
					{message}
				</Text>
			</View>
		</View>
	);
};

export default Message;
