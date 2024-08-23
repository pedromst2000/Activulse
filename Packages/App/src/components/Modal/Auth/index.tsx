import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Ilustration from '../../Ilustration';
import SuccessModalIlus from '../../../assets/svg/ilustrations/Modals/SuccessModal.svg';
import LogoIlus from '../../../assets/svg/ilustrations/Logo.svg';

type AuthModalProps = {
	onPressModalBtn: () => void;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isModalVisible: boolean;
	toogleModal: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({
	onPressModalBtn,
	setModalVisible,
	isModalVisible,
	toogleModal,
}): React.JSX.Element => {
	return (
		<View>
			<Modal
				isVisible={isModalVisible}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				backdropOpacity={0.5}
				className="flex justify-end m-0"
			>
				<View className="bg-primary-50 p-[50px] rounded-t-3xl pt-[30px] pb-[90px]">
					<View className="flex items-center space-y-[10px]">
						{/* Icon */}
						<View>
							<Ilustration ilustration={SuccessModalIlus} width={64} height={64} />
						</View>

						{/* Message */}
						<View>
							<Text className="text-center text-[14px] font-quicksand-bold text-secondary-700 mt-4">
								Success! You’re one step closer to better heart health.
							</Text>
						</View>

						{/* Button */}
						<View className="mt-6 flex justify-center items-center pt-[20px]">
							<TouchableOpacity
								activeOpacity={0.8}
								disabled={false}
								onPress={onPressModalBtn}
								className="bg-accent-500 rounded-[30px] p-3 items-center justify-center w-[150px] py-[10px]"
							>
								<Text className="text-secondary-700 font-quicksand-bold text-base tracking-[1px]">
									Continue
								</Text>
							</TouchableOpacity>
						</View>

						{/* Logo */}
						<View className="flex-1 w-full items-center pb-[5px] pt-[5px]">
							<Ilustration ilustration={LogoIlus} width={120} height={106} />
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default AuthModal;
