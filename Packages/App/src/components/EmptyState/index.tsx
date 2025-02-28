import React from 'react';
import { Text, View } from 'react-native';
import { useUserContext } from '@/src/context/user';
import Ilustration from '../Ilustration';
import { SvgProps } from 'react-native-svg';
import Button from '../Button';

type Props = {
	type: 'Error' | 'NotFound' | 'BadRequest';
	_ilustration_: React.FC<SvgProps> | null;
	message: string;
	description: string;
	styleClass?: string | undefined;
};

const EmptyState: React.FC<Props> = ({
	type,
	styleClass,
	_ilustration_,
	message,
	description,
}): React.JSX.Element => {
	const { exitApp } = useUserContext();

	return (
		<View
			className={`flex-1 items-center justify-center p-4 sm:p-6 md:p-8 bg-primary-50 ${styleClass}`}
		>
			<View className="w-full max-w-xs sm:max-w-sm md:max-w-md items-center">
				<Ilustration
					ilustration={_ilustration_}
					width={200}
					height={200}
					styleClass="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
				/>
			</View>

			<View className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-8 items-center">
				<Text className="text-lg sm:text-xl md:text-2xl text-center uppercase font-merriweather-bold text-secondary-700">
					{message}
				</Text>
			</View>

			<View className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-6 items-center">
				<Text className="text-sm sm:text-base md:text-lg text-center text-secondary-700 font-quicksand-medium">
					{description}
				</Text>
			</View>

			{type === 'Error' && (
				<View className="flex flex-row justify-between items-center pt-8 sm:pt-14 md:pt-16 lg:pt-18 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
					<Button onPress={exitApp} styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
						<Text className="font-quicksand-bold text-secondary-700 text-base">Exit App</Text>
					</Button>
				</View>
			)}
		</View>
	);
};

export default EmptyState;
