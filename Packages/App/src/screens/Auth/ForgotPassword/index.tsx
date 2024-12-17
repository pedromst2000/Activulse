import React, { useState, useEffect, useRef } from 'react';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { APIResponse } from '../../../api/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useRequestResetPassword from '@/src/hooks/ReactQuery/auth/requestResetPassword';
import EmailI from '../../../assets/svg/icons/EmailIcon.svg';
import ForgotPasswordIlus from '../../../assets/svg/ilustrations/ForgetPassword.svg';
import LogoIlus from '../../../assets/svg/ilustrations/Logo.svg';
import Title from '../../../components/Title';
import GoBackBtn from '../../../components/GoBackBtn';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import AnimatedComponent from '../../../components/Animated/index';
import Message from '../../../components/Message';
import utils from '../../../utils';
import Ilustration from '../../../components/Ilustration';
import { AuthStackParamList } from '@/src/navigation/Auth';

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	'ForgotPassword'
>;

const ForgotPassword: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<ForgotPasswordNavigationProp>();
	const [email, setEmail] = useState<string>('');
	const [validationError, setValidationError] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);

	const { status, mutateAsync } = useRequestResetPassword({
		email: email.trim(),
	});

	const handleRequestPassword = async (): Promise<void> => {
		try {
			setValidationError('');
			setShowError(false); // Hide the error message before new validation
			clearTimeout(timeoutRef.current!);

			// Send the request
			await mutateAsync(
				{},
				{
					onSuccess: (resData: APIResponse): void => {
						if (resData.success) {
							setEmail(''); // Clear the email input
							navigation.navigate('VerifyOTP', { email: email.trim() });
						}
					},
					onError: (error: Error): void => {
						const errorMessage = utils.error.getMessage(error);
						setValidationError(errorMessage);
						setShowError(true); // Show error message
						timeoutRef.current = setTimeout(() => {
							setShowError(false); // Hide error message after 3 seconds
						}, 3000);
					},
				},
			);
		} catch (error) {
			setValidationError(utils.error.getMessage(error));
			setShowError(true);
			timeoutRef.current = setTimeout(() => {
				setShowError(false);
			}, 3000);
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
					<View className="p-4 sm:p-8 justify-between flex-1 bg-primary-50">
						<View className="absolute top-3 left-2 mt-6 ml-4 sm:mt-8 sm:ml-6 md:mt-10 md:ml-8 lg:mt-12 lg:ml-10">
							<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
						</View>

						{/* Message */}
						<AnimatedComponent animation="FadeIn">
							{showError && <Message type="error" message={validationError} />}
						</AnimatedComponent>
						<View className="flex-1 justify-center items-center mb-[-20px] mt-[-30px] sm:mt-24 md:mt-28 lg:mt-32">
							{/* Title Form */}
							<Title
								title="Forgot Password"
								subTitle="Please enter your email address to receive a verification code. Let's get you back on track!"
							/>

							{/* Ilustration */}
							<View className="flex-1 items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
								<Ilustration
									ilustration={ForgotPasswordIlus}
									styleClass="w-[239px] h-[227px] sm:w-[300px] sm:h-[282px] md:w-[350px] md:h-[329px] lg:w-[400px] lg:h-[376px]"
								/>
							</View>
							{/* Form */}
							<View className="flex-1 justify-center items-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
								<View className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
									<Input
										placeholder="Email"
										icon={EmailI}
										onChange={(text: string) => setEmail(text)}
										value={email}
										textInputClassName="w-full pl-3"
										iconClassName="pl-4"
									/>
								</View>

								<View className="flex flex-row justify-between items-center pt-14 sm:pt-16 md:pt-20 lg:pt-24">
									<Button
										disabled={email === '' || status === 'pending'}
										onPress={handleRequestPassword}
										styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
									>
										<Text className="font-quicksand-bold text-secondary-700 text-base">
											{status === 'pending' ? (
												<ActivityIndicator size="small" color="#0C2C7E" />
											) : (
												'Send'
											)}
										</Text>
									</Button>
								</View>
								<View className="flex-1 w-full items-center pb-10 pt-9 sm:pb-12 sm:pt-12 md:pb-14 md:pt-14 lg:pb-16 lg:pt-16">
									<Ilustration
										ilustration={LogoIlus}
										styleClass="w-[150px] h-[56px]
									sm:w-[200px] sm:h-[74px] md:w-[250px] md:h-[93px] lg:w-[300px] lg:h-[112px]"
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

export default ForgotPassword;
