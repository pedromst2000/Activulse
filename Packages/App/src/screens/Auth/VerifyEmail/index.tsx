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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import useConfirmVerify from '@/src/hooks/ReactQuery/users/confirmVerify';
import useResendVerification from '@/src/hooks/ReactQuery/users/resendVerification';
import Title from '@/src/components/Title';
import Button from '@/src/components/Button';
import Ilustration from '@/src/components/Ilustration';
import VerifyEmailIlus from '@/src/assets/svg/ilustrations/CheckEmail.svg';
import LogoIlus from '@/src/assets/svg/ilustrations/Logo.svg';
import { AuthStackParamList } from '@/src/navigation/Auth';
import utils from '@/src/utils';
import AnimatedComponent from '@/src/components/Animated';
import Message from '@/src/components/Message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Link from '@/src/components/Link';

type VerifyEmailRouteProp = RouteProp<AuthStackParamList, 'VerifyEmail'>;
type VerifyEmailNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'VerifyEmail'>;

const VerifyEmail: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<VerifyEmailNavigationProp>();
	const route = useRoute<VerifyEmailRouteProp>();
	const [validationError, setValidationError] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);
	const { status: statusConfirm, mutateAsync: mutateConfirm } = useConfirmVerify({
		email: route.params.email,
	});
	const { mutateAsync: mutateResend } = useResendVerification({
		email: route.params.email,
	});

	const handleConfirmVerify = async (): Promise<void> => {
		try {
			setValidationError('');
			setShowError(false);
			clearTimeout(timeoutRef.current!);

			await mutateConfirm(
				{},
				{
					onSuccess: (resData: APIResponse): void => {
						if (resData.success) {
							setSuccessMessage(resData.message);
							setShowSuccess(true);

							timeoutRef.current = setTimeout(() => {
								navigation.navigate('SignIn');
							}, 2000); // delaying the navigation for 2 seconds after navigating to the SignIn screen
						}
					},
					onError: (error: Error): void => {
						const errorMessage = utils.error.getMessage(error);
						setValidationError(errorMessage);
						setShowError(true); // Show error message
						timeoutRef.current = setTimeout(() => {
							setShowError(false); // Hide error message after 5 seconds
						}, 5000);
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

	const handleResendVerify = async (): Promise<void> => {
		try {
			setValidationError('');
			setShowError(false);
			clearTimeout(timeoutRef.current!);

			await mutateResend(
				{},
				{
					onSuccess: (resData: APIResponse): void => {
						if (resData.success) {
							setSuccessMessage(resData.message);
							setShowSuccess(true);

							timeoutRef.current = setTimeout(() => {
								setShowSuccess(false); // Hide success message after 2 seconds
							}, 2000);
						}
					},
					onError: (error: Error): void => {
						const errorMessage = utils.error.getMessage(error);
						setValidationError(errorMessage);
						setShowError(true); // Show error message
						timeoutRef.current = setTimeout(() => {
							setShowError(false); // Hide error message after 5 seconds
						}, 5000);
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
		if ((showError || showSuccess) && scrollViewRef.current) {
			scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to the top
		}
	}, [showError, showSuccess]);

	return (
		<AnimatedComponent animation="SlideInFromTop">
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
					<View className="p-4 sm:p-6 md:p-8 lg:p-10 justify-between flex-1 bg-primary-50">
						{/* Message */}
						<AnimatedComponent animation="FadeIn">
							{showError ? (
								<Message type="error" message={validationError} />
							) : showSuccess ? (
								<Message type="success" message={successMessage} />
							) : null}
						</AnimatedComponent>
						<View className="flex-1 justify-center items-center mb-[-20px] mt-[-50px] sm:mt-24 md:mt-28 lg:mt-32">
							<View className="items-center">
								{/* Title*/}
								<Title
									title="Verify your Email"
									subTitle="We´ve just sent an email to your email address. Tap on the link to verify your account."
								/>
							</View>

							{/* Ilustration */}
							<View className="flex-1 items-center justify-center pt-8 sm:pt-10 md:pt-12 lg:pt-14">
								<Ilustration
									ilustration={VerifyEmailIlus}
									styleClass="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px]"
								/>
							</View>

							<View className="flex items-center pt-6 sm:pt-8 md:pt-10 lg:pt-12">
								<Link
									type="Long"
									message="Didn’t Receive the Email?"
									boldMessage="Resend"
									onPress={handleResendVerify}
									styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
								/>
							</View>

							<View className="flex flex-row justify-center items-center pt-10 sm:pt-12 md:pt-14 lg:pt-16">
								<Button disabled={false} onPress={handleConfirmVerify}>
									<Text className="font-quicksand-bold text-secondary-700 text-base sm:text-lg md:text-xl lg:text-2xl">
										{statusConfirm === 'pending' ? (
											<ActivityIndicator size="small" color="#0C2C7E" />
										) : (
											'Confirm'
										)}
									</Text>
								</Button>
							</View>
							<View className="flex-1 w-full items-center pb-8 pt-6 sm:pb-10 sm:pt-8 md:pb-12 md:pt-10 lg:pb-14 lg:pt-12">
								<Ilustration
									ilustration={LogoIlus}
									styleClass="w-[150px] h-[56px] sm:w-[180px] sm:h-[68px] md:w-[200px] md:h-[75px] lg:w-[220px] lg:h-[82px]"
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</AnimatedComponent>
	);
};

export default VerifyEmail;
