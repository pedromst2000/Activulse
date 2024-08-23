import React, { useState, useEffect, useRef } from 'react';
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
import UsernameI from '../../assets/svg/icons/Usernamecon.svg';
import EmailI from '../../assets/svg/icons/EmailIcon.svg';
import PasswordI from '../../assets/svg/icons/PasswordIcon.svg';
import LogoIlus from '../../assets/svg/ilustrations/Logo.svg';
import GoBackBtn from '../../components/GoBackBtn';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AnimatedComponent from '../../components/Animated/index';
import Message from '../../components/Message';
import AuthModal from '@/src/components/Modal/Auth';
import utils from '../../utils';
import Ilustration from '@/src/components/Ilustration';
import { APIResponse } from '@/src/api/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/src/navigation/Auth';

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
		try {
			setValidationError('');
			setLongErrorMessage(null);
			setShowError(false); // Hide the error message before new validation
			clearTimeout(timeoutRef.current!);

			// Send the request
			await mutateAsync(
				{},
				{
					onSuccess: async (resData: APIResponse): Promise<void> => {
						if (resData.success) {
							setModalVisible(true); // Show the modal on success
						} else {
							// Handle failure
							setValidationError(resData.message);
							setPassword('');
							setShowError(true); // Show error message
							timeoutRef.current = setTimeout(() => {
								setShowError(false); // Hide error message after 2.6 seconds
							}, 2600);
						}
					},
					onError: (error: Error): void => {
						const errorMessage = utils.error.getMessage(error);
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
							}, 10000);
						}
					},
				},
			);
		} catch (error) {
			const errorMessage = utils.error.getMessage(error);
			// Handle the error similar to the onError method above
			if (
				errorMessage.includes('Username must be at least 3 characters long') ||
				errorMessage.includes('Username must contain only letters') ||
				errorMessage.includes('must contain at least one lowercase letter') ||
				errorMessage.includes('must contain at least one uppercase letter') ||
				errorMessage.includes('must contain at least one digit') ||
				errorMessage.includes('be at least 8 characters long')
			) {
				setLongErrorMessage(errorMessage);
			} else {
				setValidationError(errorMessage);
				setShowError(true);
				timeoutRef.current = setTimeout(() => {
					setShowError(false);
				}, 10000);
			}
		}
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
		<AnimatedComponent animation="FadeIn">
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<ScrollView
					ref={scrollViewRef}
					keyboardShouldPersistTaps="handled"
					className="bg-primary-50"
				>
					<View className="p-4 sm:p-8 justify-between flex-1 bg-primary-50">
						<View className="absolute top-3 left-2 mt-6 ml-4">
							<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
						</View>

						{/* Message */}
						<AnimatedComponent animation="FadeIn">
							{showError && <Message message={validationError} type="error" />}
						</AnimatedComponent>
						{/* Title Form */}
						<Title
							title="Get Started"
							subTitle="Begin your journey to better heart health! Sign up for personalized tracking and expert guidance."
						/>

						{/* Form */}
						<View className="flex-1 justify-center items-center pt-[50px]">
							{/* Display long error messages */}
							{longErrorMessage && (
								<View className="w-full items-center mb-4">
									<Text className="text-center text-[13px] text-red-500">
										{longErrorMessage}
									</Text>
								</View>
							)}
							<View className="flex justify-center items-center gap-[25px]">
								<View>
									<Input
										placeholder="Username"
										icon={UsernameI}
										onChange={(text: string) => setUsername(text)}
										value={username}
										textInputClassName="w-44 pl-[10px]"
										iconClassName="pl-[12px]"
									/>
								</View>

								<View>
									<Input
										placeholder="Email"
										icon={EmailI}
										onChange={(text: string) => setEmail(text)}
										value={email}
										textInputClassName="w-44 pl-[10px]"
										iconClassName="pl-[12px]"
									/>
								</View>

								<View>
									<Input
										placeholder="Password"
										hideText
										onChange={(text: string) => setPassword(text)}
										value={password}
										icon={PasswordI}
										textInputClassName="w-44 pl-[10px]"
									/>
								</View>
							</View>

							<View className="flex flex-row justify-between items-center pt-[40px]">
								<Text
									onPress={() => navigation.navigate('SignIn' as never)}
									className="font-quicksand-semi-bold text-secondary-700 underline "
								>
									Already have an account ?{' '}
									<Text className="font-quicksand-bold">Sign In</Text>
								</Text>
							</View>

							<View className="flex flex-row justify-between items-center pt-[55px]">
								<Button
									disabled={
										username === '' || email === '' || password === '' || status === 'pending'
									}
									onPress={handleRegister}
								>
									<Text className="font-quicksand-bold text-secondary-700 text-base">
										{status === 'pending' ? (
											<ActivityIndicator size="small" color="#0C2C7E" />
										) : (
											'Sign Up'
										)}
									</Text>
								</Button>
							</View>
							<View className="flex-1 w-full items-center pb-[40px] pt-[5px]">
								<Ilustration ilustration={LogoIlus} width={140} height={96} />
							</View>
						</View>
						{/* Auth Modal */}
						<AuthModal
							toogleModal={toogleModal}
							isModalVisible={modalVisible}
							setModalVisible={setModalVisible}
							onPressModalBtn={() => {
								setModalVisible(false);
								navigation.navigate('VerifyEmail', { email: email.trim() });
							}}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</AnimatedComponent>
	);
};

export default JoinNow;
