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
import { APIResponse } from '@/src/api/types';
import { RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import useVerifyOTP from '@/src/hooks/ReactQuery/auth/verifyOTP';
import useRequestResetPassword from '@/src/hooks/ReactQuery/auth/requestResetPassword';
import GoBackBtn from '@/src/components/GoBackBtn';
import Title from '@/src/components/Title';
import Button from '@/src/components/Button';
import Ilustration from '@/src/components/Ilustration';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import { AuthStackParamList } from '@/src/navigation/Auth';
import utils from '@/src/utils';
import AnimatedComponent from '@/src/components/Animated';
import Message from '@/src/components/Message';
import OTPInput from '@/src/components/Input/OTP';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Link from '@/src/components/Link';

type VerifyOTPRouteProp = RouteProp<AuthStackParamList, 'VerifyOTP'>;
type VerifyOTPNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'VerifyOTP'>;

const VerifyOTP: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<VerifyOTPNavigationProp>();
	const route = useRoute<VerifyOTPRouteProp>();
	const [OTP, setOTP] = useState<string>('');
	const [validationError, setValidationError] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [havesAllDigits, setHavesAllDigits] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<number | null>(null);
	const [countDigit, setCountDigit] = useState<number>(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);
	const { status, mutateAsync } = useVerifyOTP({
		OTP,
		email: route.params.email,
	});
	const { mutateAsync: resendMutate } = useRequestResetPassword({
		email: route.params.email,
	});

	// Reset states when component is focused
	useFocusEffect(
		React.useCallback(() => {
			resetState();
			return () => {
				clearTimeout(timeoutRef.current!);
			};
		}, []),
	);

	const resetState = () => {
		setOTP('');
		setValidationError('');
		setShowError(false);
		setShowSuccess(false);
		setSuccessMessage('');
		setHavesAllDigits(false);
		setErrorCode(null);
		setCountDigit(0);
	};

	const handleVerifyOTP = async (): Promise<void> => {
		clearTimeout(timeoutRef.current!);
		setValidationError('');
		setShowError(false);

		await mutateAsync(
			{
				OTP,
				email: route.params.email,
			},
			{
				onSuccess: async (resData: APIResponse): Promise<void> => {
					if (resData.success) {
						setSuccessMessage(resData.message);
						setShowSuccess(true);
						// Navigate to ChangePassword screen after 2 seconds
						timeoutRef.current = setTimeout(() => {
							setShowSuccess(false);
							navigation.navigate('ChangePassword', { email: route.params.email });
						}, timers.SUCCESS_DELAY);
					}
				},
				onError: (error: any): void => {
					const errorMessage = utils.error.getMessage(error as Error);
					const statusCode = error?.status || null;

					setErrorCode(statusCode);
					if (statusCode === 409 && errorMessage === 'Already verified!') {
						setValidationError('Resent Again the Email !');
						setShowError(true);
						timeoutRef.current = setTimeout(() => {
							setShowError(false);
						}, timers.ERROR_MESSAGE_TIMEOUT);
					} else {
						setValidationError(errorMessage);
						setShowError(true);
						timeoutRef.current = setTimeout(() => {
							setShowError(false);
						}, timers.ERROR_MESSAGE_TIMEOUT);
					}
				},
			},
		);
	};

	const handleResendEmail = async (): Promise<void> => {
		clearTimeout(timeoutRef.current!);
		setValidationError('');
		setShowError(false);

		await resendMutate(
			{
				email: route.params.email,
			},
			{
				onSuccess: async (resData: APIResponse): Promise<void> => {
					if (resData.success) {
						setSuccessMessage('Email sent successfully');
						setShowSuccess(true);
						// Hide the success message after 2 seconds
						timeoutRef.current = setTimeout(() => {
							setShowSuccess(false);
						}, timers.SUCCESS_DELAY);
					}
				},
				onError: (error: any): void => {
					const errorMessage = utils.error.getMessage(error as Error);
					setValidationError(errorMessage);
					setShowError(true);
					timeoutRef.current = setTimeout(() => {
						setShowError(false);
					}, timers.ERROR_MESSAGE_TIMEOUT);
				},
			},
		);
	};

	useEffect(() => {
		return () => {
			// Clear the timeout when the component unmounts
			clearTimeout(timeoutRef.current!);
		};
	}, []);

	// Check if the user has entered all the digits (6 digits) for the OTP
	useEffect(() => {
		setHavesAllDigits(countDigit === 6);
	}, [countDigit]);

	// Scroll to the top when the error message is shown
	useEffect(() => {
		if ((showError || showSuccess) && scrollViewRef.current) {
			scrollViewRef.current.scrollTo({ y: 0, animated: true });
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
					<View className="p-4 sm:p-8 justify-between flex-1 bg-primary-50">
						<View className="absolute top-3 left-2 mt-6 ml-4 sm:mt-8 sm:ml-6 md:mt-10 md:ml-8 lg:mt-12 lg:ml-10">
							<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
						</View>

						{/* Message */}
						<AnimatedComponent animation="FadeIn">
							{showError ? (
								<Message type="error" message={validationError} />
							) : showSuccess ? (
								<Message type="success" message={successMessage} />
							) : null}
						</AnimatedComponent>

						<View className="flex-1 justify-center items-center  mt-[-70px] pt-12 sm:pt-16 md:pt-20 lg:pt-24">
							{/* Title Form */}
							<Title
								title="Verify your Email"
								subTitle="We´ve sent to your email the verification code. Please enter the OTP!"
							/>

							{/* Form */}
							<View className="flex-1 justify-center items-center  pt-12 sm:pt-16 md:pt-20 lg:pt-24">
								<View>
									{/* Input with 6 digits OTP */}
									<OTPInput
										length={6}
										onOTPChange={setOTP}
										setCountDigit={setCountDigit}
										countDigit={countDigit}
									/>
								</View>

								<Link
									type="Long"
									message="Didn´t Receive the Email or expired? "
									boldMessage="Resend"
									onPress={handleResendEmail}
									styleClass="flex flex-row justify-between items-center pt-10 sm:pt-12 md:pt-14 lg:pt-16"
								/>

								<View className="flex flex-row justify-between items-center pt-10 sm:pt-12 md:pt-14 lg:pt-16">
									<Button
										disabled={havesAllDigits !== true || status === 'pending'}
										onPress={handleVerifyOTP}
										styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
									>
										<Text className="font-quicksand-bold text-secondary-700 text-base">
											{status === 'pending' ? (
												<ActivityIndicator size="small" color="#0C2C7E" />
											) : (
												'Verify'
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

export default VerifyOTP;
