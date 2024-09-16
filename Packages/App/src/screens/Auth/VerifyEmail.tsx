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
import useConfirmVerify from '@/src/hooks/ReactQuery/users/confirmVerify';
import useResendVerification from '@/src/hooks/ReactQuery/users/resendVerification';
import GoBackBtn from '@/src/components/GoBackBtn';
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
							}, 2000); // delaying the navigation for 2 seconds after navigating to the risk assessment screen
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
					keyboardShouldPersistTaps="handled"
					className="bg-primary-50"
				>
					<View className="p-4 sm:p-8 justify-between flex-1 bg-primary-50">
						{/* Message */}
						<AnimatedComponent animation="FadeIn">
							{showError ? (
								<Message type="error" message={validationError} />
							) : showSuccess ? (
								<Message type="success" message={successMessage} />
							) : null}
						</AnimatedComponent>
						<View>
							{/* Title*/}
							<Title
								title="Verify your Email"
								subTitle="We´ve just sent an email to your email address. Tap on the link to verify your account."
							/>
						</View>

						{/* Ilustration */}
						<View className="flex-1 items-center justify-center pt-12">
							<Ilustration ilustration={VerifyEmailIlus} width={200} height={200} />
						</View>
						<View className="flex flex-row justify-center items-center pt-12">
							<Text
								onPress={handleResendVerify}
								className="font-quicksand-semi-bold text-secondary-700 underline"
							>
								Didn´t Receive the Email? <Text className="font-quicksand-bold">Resend</Text>
							</Text>
						</View>
						<View className="flex flex-row justify-center items-center pt-12">
							<Button disabled={false} onPress={handleConfirmVerify}>
								<Text className="font-quicksand-bold text-secondary-700 text-base">
									{statusConfirm === 'pending' ? (
										<ActivityIndicator size="small" color="#0C2C7E" />
									) : (
										'Confirm'
									)}
								</Text>
							</Button>
						</View>
						<View className="flex-1 w-full items-center pb-10 pt-24">
							<Ilustration ilustration={LogoIlus} width={150} height={156} />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</AnimatedComponent>
	);
};

export default VerifyEmail;
