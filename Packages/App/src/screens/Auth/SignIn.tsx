import React, { useState, useEffect, useRef } from 'react';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Image,
	ActivityIndicator,
} from 'react-native';
import { useUserContext } from '../../context/user';
import { useNavigation } from '@react-navigation/native';
import useLogin, { LoginData } from '../../hooks/ReactQuery/auth/login';
import EmailI from '../../assets/svg/icons/EmailIcon.svg';
import PasswordI from '../../assets/svg/icons/PasswordIcon.svg';
import LogoIlus from '../../assets/svg/ilustrations/Logo.svg';
import GoBackBtn from '../../components/GoBackBtn';
import Title from '../../components/Title';
import Input from '../../components/Input';
import SelectBoxInput from '../../components/SelectBox';
import Button from '../../components/Button';
import AnimatedComponent from '../../components/Animated/index';
import Message from '../../components/Message';
import utils from '../../utils';
import Ilustration from '@/src/components/Ilustration';

const SignIn: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser } = useUserContext();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { status, mutateAsync, data } = useLogin({
		email: email.trim(),
		password,
		remember_me: rememberMe,
	});

	const handleSignIn = async (): Promise<void> => {
		try {
			setValidationError('');
			setShowError(false); // Hide the error message before new validation
			clearTimeout(timeoutRef.current!);

			// Send the request
			await mutateAsync(
				{},
				{
					onSuccess: async (resData: LoginData): Promise<void> => {
						if (resData.success && resData.data) {
							setShowSuccess(true);
							// Update the global state
							timeoutRef.current = setTimeout(() => {
								setLoggedUser(resData.data.user);
							}, 2000); // delaying the navigation for 3 seconds after navigating to the home screen

							// Save the tokens on the device storage
							await utils.storage.setItem('authToken', resData.data.authToken);
							await utils.storage.setItem('refreshToken', resData.data.refreshToken);
						} else {
							// Handle failure
							setValidationError(resData.message);
							setPassword('');
							setShowError(true); // Show error message
							timeoutRef.current = setTimeout(() => {
								setShowError(false); // Hide error message after 5 seconds
							}, 2600);
						}
					},
					onError: (error) => {
						const errorMessage = utils.error.getMessage(error);
						setValidationError(errorMessage);
						setShowError(true); // Show error message
						timeoutRef.current = setTimeout(() => {
							setShowError(false); // Hide error message after 5 seconds
						}, 2600);
					},
				},
			);
		} catch (error) {
			setValidationError(utils.error.getMessage(error));
			setShowError(true);
			timeoutRef.current = setTimeout(() => {
				setShowError(false);
			}, 2600);
		}
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current!); // Clear the timeout when the component unmounts
		};
	}, []);

	return (
		<AnimatedComponent animation="FadeIn">
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<ScrollView keyboardShouldPersistTaps="handled" className="bg-primary-50">
					<View className="p-4 sm:p-8 justify-between flex-1 bg-primary-50">
						<View className="absolute top-3 left-2 mt-6 ml-4">
							<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
						</View>

						{/* Message */}
						<AnimatedComponent animation="FadeIn">
							{showError ? (
								<Message type="error" message={validationError} />
							) : showSuccess ? (
								<Message type="success" message={data?.message} />
							) : null}
						</AnimatedComponent>
						{/* Title Form */}
						<Title
							title="Welcome Back !"
							subTitle="Let's keep your heart health on track. Log in now!"
						/>

						{/* Form */}
						<View className="flex-1 justify-center items-center pt-[50px]">
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

							<View className="pt-[25px]">
								<Input
									placeholder="Password"
									hideText
									onChange={(text: string) => setPassword(text)}
									value={password}
									icon={PasswordI}
									textInputClassName="w-44 pl-[10px]"
								/>
							</View>
							<View className="flex flex-row justify-between items-center pr-[110px] pt-[10px]">
								<SelectBoxInput
									value={rememberMe}
									onPress={(newValue: boolean) => setRememberMe(newValue)}
									text="Remember Me"
									className="flex-row items-center"
								/>
							</View>
							<View className="flex flex-row justify-between items-center pt-[40px]">
								<Text
									onPress={() => navigation.navigate('ForgotPassword' as never)}
									className="font-quicksand-semi-bold text-secondary-700 underline "
								>
									Forgot Password{' '}
								</Text>
							</View>

							<View className="flex flex-row justify-between items-center pt-[55px]">
								<Button
									disabled={email === '' || password === '' || status === 'pending'}
									onPress={handleSignIn}
								>
									<Text className="font-quicksand-bold text-secondary-700 text-base">
										{status === 'pending' ? (
											<ActivityIndicator size="small" color="#0C2C7E" />
										) : (
											'Sign In'
										)}
									</Text>
								</Button>
							</View>
							<View className="flex-1 w-full items-center pb-[40px] pt-[35px]">
								<Ilustration ilustration={LogoIlus} width={150} height={156} />
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</AnimatedComponent>
	);
};

export default SignIn;