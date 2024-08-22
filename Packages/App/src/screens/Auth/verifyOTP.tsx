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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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

type VerifyOTPRouteProp = RouteProp<AuthStackParamList, 'VerifyOTP'>;

const VerifyOTP: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<VerifyOTPRouteProp>();
	const [OTP, setOTP] = useState<string>('');
	const [validationError, setValidationError] = useState<string>('');

	const [showError, setShowError] = useState<boolean>(false);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const [havesAllDigits, setHavesAllDigits] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<number | null>(null);
	const [countDigit, setCountDigit] = useState<number>(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const { status, mutateAsync } = useVerifyOTP({
		email: route.params.email,
	});

	const { mutateAsync: resendMutate } = useRequestResetPassword({
		email: route.params.email,
	});

	const handleVerifyOTP = async (): Promise<void> => {
		try {
			setValidationError('');
			setShowError(false); // Hide the error message before new validation
			clearTimeout(timeoutRef.current!);

			// Send the request
			await mutateAsync(
				{ OTP },
				{
					onSuccess: (resData: APIResponse): void => {
						if (resData.success) {
							setShowSuccess(true);
							timeoutRef.current = setTimeout(() => {
								console.log('Navigate to the change password screen WITH SUCCESS');
							}, 2000); // delaying the navigation for 2 seconds after navigating to the change password screen
						}
					},
					onError: (error: any): void => {
						const errorMessage = utils.error.getMessage(error);
						setValidationError(errorMessage);
						setShowError(true); // Show error message
						setErrorCode(parseInt(error.response?.status));
						console.log(typeof errorCode);

						if (errorCode === 409) {
							// if already verified then navigate to the change password screen as well
							console.log('Navigate to the change password screen WITH ERROR');
						}

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

	const handleResendEmail = async (): Promise<void> => {
		try {
			setValidationError('');
			setShowError(false); // Hide the error message before new validation
			clearTimeout(timeoutRef.current!);

			// Send the request
			await resendMutate(
				{ email: route.params.email },
				{
					onSuccess: (resData: APIResponse): void => {
						if (resData.success) {
							setShowSuccess(true);
							timeoutRef.current = setTimeout(() => {
								setShowSuccess(false);
							}, 2000); // Hide the success message after 2 seconds
						}
					},
					onError: (error: any): void => {
						const errorMessage = utils.error.getMessage(error);
						setValidationError(errorMessage);
						setShowError(true); // Show error message
						setErrorCode(error.response?.status || null);
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

	// To check if the user has entered all the digits OTP (6 digits)
	useEffect(() => {
		setHavesAllDigits(countDigit === 6);
	}, [countDigit]);

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
								<Message type="success" message="Email Sent Successfuly" />
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
										className="font-quicksand-medium text-secondary-700  "
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
