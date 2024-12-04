import React from 'react';
import { Text, View } from 'react-native';
import Ilustration from '../Ilustration';
import ErrorIlus from '../../assets/svg/ilustrations/EmptyStates/ErrorServer.svg';

const Error: React.FC = (): React.JSX.Element => {
	return (
		<View className="flex-1 items-center justify-center p-4 md:p-8">
			<View className="w-full max-w-xs md:max-w-md items-center">
				<Ilustration
					ilustration={ErrorIlus}
					width={200}
					height={200}
					className="w-48 h-48 md:w-64 md:h-64"
				/>
			</View>

			<View className="w-full max-w-xs md:max-w-md mt-4 items-center">
				<Text className="text-lg md:text-xl text-center uppercase font-merriweather-bold text-secondary-700">
					Oops! Internal Server Error
				</Text>
			</View>

			<View className="w-full max-w-xs md:max-w-md mt-3 items-center">
				<Text className="text-sm md:text-base text-center text-secondary-700 font-quicksand-medium">
					Uh-oh! It looks like something went wrong on our end. Our tech team is already
					working hard to fix it. Please try again later. Thanks for your patience and
					understanding!
				</Text>
			</View>
		</View>
	);
};

export default Error;
