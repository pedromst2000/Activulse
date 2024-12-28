import React, { useState, useEffect, useRef } from 'react';
import timers from '@/src/utils/timers';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { useUserContext } from '../../../context/user';
import { useNavigation } from '@react-navigation/native';
import useLogin, { LoginData } from '../../../hooks/ReactQuery/auth/login';
import EmailI from '../../../assets/svg/icons/EmailIcon.svg';
import PasswordI from '../../../assets/svg/icons/PasswordIcon.svg';
import LogoIlus from '../../../assets/svg/ilustrations/Logo.svg';
import GoBackBtn from '../../../components/GoBackBtn';
import Title from '../../../components/Title';
import Input from '../../../components/Input';
import SelectBoxInput from '../../../components/SelectBox';
import Button from '../../../components/Button';
import AnimatedComponent from '../../../components/Animated/index';
import Message from '../../../components/Message';
import utils from '../../../utils';
import Ilustration from '@/src/components/Ilustration';
import Link from '@/src/components/Link';

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
	const scrollViewRef = useRef<ScrollView>(null);

	const { status, mutateAsync, data } = useLogin({
		email: email.trim(),
		password,
		remember_me: rememberMe,
	});

	const handleSignIn = async (): Promise<void> => {
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
						timeoutRef.current = setTimeout(() => {
							setLoggedUser(resData.data.user);
						}, timers.SUCCESS_DELAY); // delaying the navigation for 2 seconds

						// Saving the tokens on the device
						await utils.storage.setItem('authToken', resData.data.authToken);
						await utils.storage.setItem('refreshToken', resData.data.refreshToken);
					}
				},
				onError: (error: any): void => {
					const errorMessage = utils.error.getMessage(error as Error);

					setValidationError(errorMessage);
					setShowError(true);
					timeoutRef.current = setTimeout(() => {
						setShowError(false); // Hide error message after 5 seconds
					}, timers.ERROR_MESSAGE_TIMEOUT);
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
		if ((showError || showSuccess) && scrollViewRef.current) {
			scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to the top
		}
	}, [showError, showSuccess]);

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
						<View className="absolute top-3 left-2 mt-6 ml-4 sm:top-4 sm:left-3 sm:mt-8 sm:ml-5 md:top-5 md:left-4 md:mt-10 md:ml-6 lg:top-6 lg:left-5 lg:mt-12 lg:ml-7">
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

						<View className="flex-1 justify-center items-center mb-[-20px] mt-[-30px] sm:mt-24 md:mt-28 lg:mt-32">
							{/* Title Form */}
							<Title
								title="Welcome Back !"
								subTitle="Let's keep your heart health on track. Log in now!"
							/>

							{/* Form */}
							<View className="flex-1 justify-center items-center pt-8 sm:pt-10 md:pt-12 lg:pt-14">
								<View className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
									<Input
										placeholder="Email"
										icon={EmailI}
										onChange={(text: string) => setEmail(text)}
										value={email}
										textInputClassName="w-full pl-3"
										iconClassName="pl-4"
									/>
								</View>

								<View className="pt-6 sm:pt-7 md:pt-8 lg:pt-9 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
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
								<View className="flex flex-col justify-between items-center pt-4 sm:pt-5 md:pt-6 lg:pt-7 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
									<SelectBoxInput
										value={rememberMe}
										onPress={(newValue: boolean) => setRememberMe(newValue)}
										text="Remember Me"
										className="flex-row items-center"
									/>
								</View>

								<Link
									type="Short"
									message="Forgot Password"
									onPress={() => navigation.navigate('ForgotPassword' as never)}
									styleClass="pt-4 sm:pt-5 md:pt-6 lg:pt-7"
								/>

								<Link
									type="Long"
									message="Don’t have an account?"
									boldMessage="Join Now"
									onPress={() => navigation.navigate('JoinNow' as never)}
									styleClass="pt-8 sm:pt-9 md:pt-10 lg:pt-12"
								/>

								<View className="flex flex-row justify-between items-center pt-10 sm:pt-12 md:pt-14 lg:pt-16 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
									<Button
										disabled={email === '' || password === '' || status === 'pending'}
										onPress={handleSignIn}
										styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
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
								<View className="flex-1 w-full items-center pb-8 pt-8 sm:pb-10 sm:pt-10 md:pb-12 md:pt-12 lg:pb-14 lg:pt-14">
									<Ilustration
										ilustration={LogoIlus}
										styleClass="w-36 h-14 sm:w-40 sm:h-16 md:w-44 md:h-18 lg:w-48 lg:h-20"
									/>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</AnimatedComponent>
	);
};

export default SignIn;
