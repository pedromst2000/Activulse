import React, { useState, useEffect, useRef } from 'react';
import timers from '../../../utils/timers';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useRegister from '@/src/hooks/ReactQuery/auth/register';
import { APIResponse } from '@/src/api/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/src/navigation/Auth';
import utils from '../../../utils';
import GoBackBtn from '../../../components/GoBackBtn';
import Title from '../../../components/Title';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import AnimatedComponent from '../../../components/Animated/index';
import Message from '../../../components/Message';
import Modal from '@/src/components/Modal';
import Link from '@/src/components/Link';
import Ilustration from '@/src/components/Ilustration';
import UsernameI from '../../../assets/svg/icons/Usernamecon.svg';
import EmailI from '../../../assets/svg/icons/EmailIcon.svg';
import PasswordI from '../../../assets/svg/icons/PasswordIcon.svg';
import LogoIlus from '../../../assets/svg/ilustrations/Logo.svg';
import SucessIlus from '../../../assets/svg/ilustrations/Modals/SuccessModal.svg';

type JoinNowNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'JoinNow'>;

const JoinNow: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<JoinNowNavigationProp>();
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [validationError, setValidationError] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [longErrorMessage, setLongErrorMessage] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);

	const { status, mutateAsync } = useRegister({
		username: username.trim(),
		email: email.trim(),
		password,
	});

	const toogleModal = (): void => {
		setModalVisible(!modalVisible);
	};

	const handleRegister = async (): Promise<void> => {
		setValidationError('');
		setLongErrorMessage(null);
		setShowError(false); // Hide the error message before new validation
		clearTimeout(timeoutRef.current!);

		// Send the request
		mutateAsync(
			{},
			{
				onSuccess: async (resData: APIResponse): Promise<void> => {
					if (resData.success) {
						setModalVisible(true); // Show the modal on success
					}
				},
				onError: (error: any): void => {
					const errorMessage = utils.error.getMessage(error as Error);

					// Determine whether the message is long or short
					if (
						errorMessage.includes('Username must be at least 3 characters long') ||
						errorMessage.includes('Username must contain only letters') ||
						errorMessage.includes('must contain at least one lowercase letter') ||
						errorMessage.includes('must contain at least one uppercase letter') ||
						errorMessage.includes('must contain at least one digit') ||
						errorMessage.includes('be at least 8 characters long')
					) {
						// Long error message handling
						setLongErrorMessage(errorMessage);
					} else {
						// Short error message handling
						setValidationError(errorMessage);
						setShowError(true);
						timeoutRef.current = setTimeout(() => {
							setShowError(false);
						}, timers.LONG_ERROR_MESSAGE_TIMEOUT);
					}
				},
			},
		);
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current!); // Clear the timeout when the component unmounts
		};
	}, []);

	// To scroll to the top when the error message is shown
	useEffect(() => {
		if (showError && scrollViewRef.current) {
			scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to the top
		}
	}, [showError]);

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<ScrollView
					ref={scrollViewRef}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<View className="p-4 sm:p-6 md:p-8 justify-between flex-1 bg-primary-50">
						<View className="absolute top-3 left-2 mt-6 ml-4 sm:top-4 sm:left-3 sm:mt-7 sm:ml-5 md:top-5 md:left-4 md:mt-8 md:ml-6 lg:top-6 lg:left-5 lg:mt-9 lg:ml-7">
							<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
						</View>

						{/* Message */}
						<AnimatedComponent animation="FadeIn">
							{showError && <Message message={validationError} type="error" />}
						</AnimatedComponent>

						<View className="flex-1 justify-center items-center mb-[-20px] mt-[-30px] sm:mt-24 md:mt-28 lg:mt-32">
							{/* Title Form */}
							<Title
								title="Get Started"
								subTitle="Begin your journey to better heart health! Sign up for personalized tracking and expert guidance."
							/>

							{/* Form */}
							<View className="flex-1 justify-center items-center pt-8 sm:pt-10 md:pt-12 lg:pt-14">
								{/* Display long error messages */}
								{longErrorMessage && (
									<View className="w-full items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
										<Text className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-red-500 font-quicksand-bold">
											{longErrorMessage}
										</Text>
									</View>
								)}

								<View className="w-full pt-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-8 sm:space-y-9 md:space-y-10 lg:space-y-12">
									<View className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
										<Input
											placeholder="Username"
											icon={UsernameI}
											onChange={(text: string) => setUsername(text)}
											value={username}
											textInputClassName="w-full pl-3"
											iconClassName="pl-4"
										/>
									</View>

									<View className="sm:pt-9 md:pt-10 lg:pt-12 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
										<Input
											placeholder="Email"
											icon={EmailI}
											onChange={(text: string) => setEmail(text)}
											value={email}
											textInputClassName="w-full pl-3"
											iconClassName="pl-4"
										/>
									</View>

									<View className="sm:pt-9 md:pt-10 lg:pt-12 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
										<Input
											placeholder="Password"
											hideText
											onChange={(text: string) => setPassword(text)}
											value={password}
											icon={PasswordI}
											textInputClassName="w-full pl-3"
											iconClassName="pl-4"
										/>
									</View>
								</View>

								<Link
									type="Long"
									message="Already have an account?"
									boldMessage="Sign In"
									onPress={() => navigation.navigate('SignIn' as never)}
									styleClass="pt-10 sm:pt-12 md:pt-14 lg:pt-16"
								/>

								<View className="flex flex-row justify-between items-center pt-12 sm:pt-14 md:pt-16 lg:pt-18 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
									<Button
										disabled={email === '' || password === '' || status === 'pending'}
										onPress={handleRegister}
										styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
									>
										<Text className="font-quicksand-bold text-secondary-700 text-base">
											{status === 'pending' ? (
												<ActivityIndicator size="small" color="#0C2C7E" />
											) : (
												'Join Now'
											)}
										</Text>
									</Button>
								</View>
								<View className="flex-1 w-full items-center pb-10 pt-10 sm:pb-12 sm:pt-12 md:pb-14 md:pt-14 lg:pb-16 lg:pt-16">
									<Ilustration
										ilustration={LogoIlus}
										styleClass="w-36 h-14 sm:w-40 sm:h-16 md:w-44 md:h-18 lg:w-48 lg:h-20"
									/>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
				{/* Auth Modal */}
				<Modal
					type="successRegistration"
					ilustration={SucessIlus}
					message="Success! You're one step closer to better heart health."
					toogleModal={toogleModal}
					isModalVisible={modalVisible}
					setModalVisible={setModalVisible}
					onPress={() => {
						setModalVisible(false);
						navigation.navigate('VerifyEmail', { email: email.trim() });
					}}
				/>
			</KeyboardAvoidingView>
		</AnimatedComponent>
	);
};

export default JoinNow;
