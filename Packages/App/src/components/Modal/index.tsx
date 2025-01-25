import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { default as ModalView } from 'react-native-modal';
import Ilustration from '../Ilustration';
import LogoIlus from '../../assets/svg/ilustrations/Logo.svg';
import EarnPointsI from '../../assets/svg/icons/EarnPointsIcon.svg';
import { SvgProps } from 'react-native-svg';

type ModalProps = {
	type:
		| 'successRegistration'
		| 'warning'
		| 'claim'
		| 'info'
		| 'confirmation'
		| 'expiredWarning'
		| 'addFavorite'
		| 'removeFavorite';

	ilustration: React.FC<SvgProps> | null;
	message: string;
	heartPoints?: string | undefined;
	challengePoints?: string | undefined;
	onPress?: () => void;
	isModalVisible: any;
};

const Modal: React.FC<ModalProps> = ({
	type,
	ilustration,
	message,
	heartPoints,
	challengePoints,
	onPress,
	isModalVisible,
}): React.JSX.Element => {
	return (
		<ModalView
			isVisible={isModalVisible}
			animationIn="slideInUp"
			animationOut="slideOutDown"
			backdropOpacity={0.5}
			className="flex justify-end m-0"
		>
			<View className="bg-primary-50 p-4 md:p-6 lg:p-8 rounded-t-3xl pt-6 pb-16 md:pt-8 md:pb-20 lg:pt-10 lg:pb-24">
				<View className="flex items-center space-y-2 md:space-y-3 lg:space-y-4">
					{/* Icon */}
					<View className="flex items-center justify-center">
						<Ilustration
							ilustration={ilustration}
							styleClass="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
						/>
					</View>

					{/* Message */}
					<View>
						<Text className="text-center text-xs md:text-sm lg:text-base font-quicksand-bold text-secondary-700 mt-3 md:mt-4 lg:mt-5">
							{message}
						</Text>
					</View>

					{type === 'successRegistration' ||
					type === 'claim' ||
					type === 'addFavorite' ||
					type === 'removeFavorite' ||
					type === 'expiredWarning' ? (
						<View className="mt-4 md:mt-6 lg:mt-8 flex justify-center items-center pt-4 md:pt-5 lg:pt-6">
							<TouchableOpacity
								activeOpacity={0.8}
								disabled={false}
								onPress={onPress}
								className="bg-accent-500 rounded-full p-2.5 md:p-3 lg:p-3.5 items-center justify-center w-32 md:w-36 lg:w-40 py-2 md:py-2.5 lg:py-3"
							>
								{type === 'successRegistration' ||
								type === 'expiredWarning' ||
								type === 'addFavorite' ||
								type === 'removeFavorite' ? (
									<Text className="text-secondary-700 font-quicksand-bold text-sm md:text-base lg:text-lg tracking-wide">
										{type === 'successRegistration'
											? 'Continue'
											: type === 'expiredWarning'
												? 'Sign Out'
												: 'Ok'}
									</Text>
								) : type === 'claim' ? (
									<View className="flex flex-row items-center justify-center space-x-2 md:space-x-3 lg:space-x-4">
										<EarnPointsI
											width={16}
											height={16}
											className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6"
										/>
										<Text className="text-secondary-700 font-quicksand-bold text-sm md:text-base lg:text-lg tracking-wide">
											{challengePoints} pts
										</Text>
									</View>
								) : null}
							</TouchableOpacity>
						</View>
					) : null}

					{/* Logo */}
					<View className="flex-1 w-full items-center pb-1 pt-1 md:pb-1.5 md:pt-1.5 lg:pb-2 lg:pt-2">
						<Ilustration
							ilustration={LogoIlus}
							styleClass="w-24 h-20 md:w-32 md:h-24 lg:w-40 lg:h-32"
						/>
					</View>
				</View>
			</View>
		</ModalView>
	);
};

export default Modal;
