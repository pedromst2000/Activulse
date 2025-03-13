import React from 'react';
import { Text, View } from 'react-native';
import SucccessI from '../../assets/svg/icons/SuccessIconV2.svg';
import ErrorI from '../../assets/svg/icons/ErrorIcon_V2.svg';

type MessageProps = {
	type?: 'success' | 'error';
	message?: string;
	className?: string;
	marginStyle?: string;
	zIndexStyle?: string;
};

const Message: React.FC<MessageProps> = ({
	type,
	message,
	className,
	marginStyle,
	zIndexStyle,
}): React.JSX.Element => {
	return (
		<View
			className={`flex flex-row items-center justify-center w-full  ${marginStyle ?? 'mt-5'}  ${className}`}
		>
			<View
				className={`absolute top-0 z-10 flex flex-row items-center justify-center w-full ${type === 'success' ? 'bg-success-500' : 'bg-error-500'} rounded-3xl px-4 py-2`}
				style={{ maxWidth: '90%', marginHorizontal: '5%' }}
			>
				<View className="mr-4">
					{type === 'success' ? (
						<SucccessI width={19} height={15} />
					) : type === 'error' ? (
						<ErrorI width={19} height={15} />
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
