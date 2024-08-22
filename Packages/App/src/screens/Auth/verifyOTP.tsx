import React, { useState, useEffect, useRef } from 'react';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { APIResponse } from '../../api/types';
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
import OTPInput from '@/src/components/Input/OTPinput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
	const { status, mutateAsync } = useVerifyOTP({ email: route.params.email });
	const { mutateAsync: resendMutate } = useRequestResetPassword({ email: route.params.email });

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
		try {
			clearTimeout(timeoutRef.current!);
			setValidationError('');
			setShowError(false);

			// Send the OTP verification request
			const resData = await mutateAsync({ OTP });
			if (resData.success) {
				setSuccessMessage('OTP Verified Successfully');
				setShowSuccess(true);

				// Navigate to ChangePassword screen after 2 seconds
				timeoutRef.current = setTimeout(() => {
					setShowSuccess(false);
					navigation.navigate('ChangePassword', { email: route.params.email });
				}, 2000);
			}
		} catch (error: any) {
			const errorMessage = utils.error.getMessage(error);
			const statusCode = error.response?.status || null;
			setErrorCode(statusCode);

			if (statusCode === 409 && errorMessage === 'Already verified!') {
				setSuccessMessage('Already verified!');
				setShowSuccess(true);

				// Navigate directly to the ChangePassword screen after 2 seconds
				timeoutRef.current = setTimeout(() => {
					setShowSuccess(false);
					navigation.navigate('ChangePassword', { email: route.params.email });
				}, 2000);
			} else {
				setValidationError(errorMessage);
				setShowError(true);
				timeoutRef.current = setTimeout(() => {
					setShowError(false);
				}, 2600);
			}
		}
	};

	const handleResendEmail = async (): Promise<void> => {
		try {
			clearTimeout(timeoutRef.current!);
			setValidationError('');
			setShowError(false);

			// Send the request to resend the email
			const resData = await resendMutate({ email: route.params.email });
			if (resData.success) {
				setSuccessMessage('Email sent successfully');
				setShowSuccess(true);

				// Hide the success message after 2 seconds
				timeoutRef.current = setTimeout(() => {
					setShowSuccess(false);
				}, 2000);
			}
		} catch (error: any) {
			const errorMessage = utils.error.getMessage(error);
			setValidationError(errorMessage);
			setShowError(true);

			timeoutRef.current = setTimeout(() => {
				setShowError(false);
			}, 2600);
		}
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
							{showError && errorCode !== 409 ? (
								<Message type="error" message={validationError} />
							) : showSuccess ? (
								<Message type="success" message={successMessage} />
							) : null}
						</AnimatedComponent>

						<View className="flex-1 justify-center items-center pt-[50px]">
							{/* Title Form */}
							<Title
								title="Verify your Email"
								subTitle="We´ve sent to your email the verification code. Please enter the OTP!"
							/>

							{/* Form */}
							<View className="flex-1 justify-center items-center pt-[50px]">
								<View>
									{/* Input with 6 digits OTP */}
									<OTPInput
										length={6}
										onOTPChange={setOTP}
										setCountDigit={setCountDigit}
										countDigit={countDigit}
									/>
								</View>

								<View className="flex flex-row justify-between items-center pt-[40px]">
									<Text
										onPress={handleResendEmail}
										className="font-quicksand-medium text-secondary-700 text-[13px] "
									>
										Didn´t Receive the Email or expired ?{' '}
										<Text className="font-quicksand-bold">Resend</Text>
									</Text>
								</View>

								<View className="flex flex-row justify-between items-center pt-[55px]">
									<Button
										disabled={havesAllDigits !== true || status === 'pending'}
										onPress={handleVerifyOTP}
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

								<View className="flex-1 w-full items-center pb-[40px] pt-[95px]">
									<Ilustration ilustration={LogoIlus} width={150} height={156} />
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
