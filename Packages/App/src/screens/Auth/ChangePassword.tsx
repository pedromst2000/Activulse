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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useResetPassword from '@/src/hooks/ReactQuery/auth/resetPassword';
import PasswordI from '../../assets/svg/icons/PasswordIcon.svg';
import ChangePasswordIlus from '../../assets/svg/ilustrations/ChangePassword.svg';
import LogoIlus from '../../assets/svg/ilustrations/Logo.svg';
import Title from '../../components/Title';
import GoBackBtn from '../../components/GoBackBtn';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AnimatedComponent from '../../components/Animated/index';
import Message from '../../components/Message';
import utils from '../../utils';
import Ilustration from '../../components/Ilustration';
import { AuthStackParamList } from '@/src/navigation/Auth';

type ChangePasswordRouteProp = RouteProp<AuthStackParamList, 'ChangePassword'>;
type ChangePasswordNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	'ChangePassword'
>;

const ChangePassword: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<ChangePasswordNavigationProp>();
	const route = useRoute<ChangePasswordRouteProp>();
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [validationError, setValidationError] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const scrollViewRef = useRef<ScrollView>(null);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [longErrorMessage, setLongErrorMessage] = useState<string | null>(null);

	const { status, mutateAsync } = useResetPassword({
		email: route.params.email,
	});

	const handleResetPassword = async (): Promise<void> => {
		try {
			// Reset previous error states
			setValidationError('');
			setLongErrorMessage(null);
			setShowError(false);
			clearTimeout(timeoutRef.current!);

			// Send the request
			await mutateAsync(
				{
					new_password: newPassword,
					confirm_password: confirmPassword,
				},
				{
					onSuccess: (resData: APIResponse): void => {
						if (resData.success) {
							setSuccessMessage(resData.message);
							setShowSuccess(true);
							timeoutRef.current = setTimeout(() => {
								navigation.navigate('SignIn');
							}, 2000);
						}
					},
					onError: (error: Error): void => {
						const errorMessage = utils.error.getMessage(error);
						// Determine whether the message is long or short
						if (
							errorMessage.includes('cannot be the same as the old password') ||
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
				errorMessage.includes('cannot be the same as the old password') ||
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
		if ((showError || showSuccess) && scrollViewRef.current) {
			scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to the top
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
							{showError ? (
								<Message type="error" message={validationError} />
							) : showSuccess ? (
								<Message type="success" message={successMessage} />
							) : null}
						</AnimatedComponent>

						<View>
							{/* Title Form */}
							<Title
								title="Change Password"
								subTitle="Your new password must be different from previously used!"
							/>

							{/* Illustration */}
							<View className="flex-1 items-center justify-center pt-[50px]">
								<Ilustration ilustration={ChangePasswordIlus} width={200} height={157} />
							</View>

							{/* Form */}
							<View className="flex-1 justify-center items-center pt-[30px]">
								{/* Display long error messages */}
								{longErrorMessage && (
									<View className="w-full items-center mb-4">
										<Text className="text-center text-[13px] text-red-500">
											{longErrorMessage}
										</Text>
									</View>
								)}

								<View>
									<Input
										placeholder="New Password"
										hideText
										onChange={(text: string) => setNewPassword(text)}
										value={newPassword}
										icon={PasswordI}
										textInputClassName="w-44 pl-[10px]"
									/>
									<View className="mt-[20px]">
										<Input
											placeholder="Confirm Password"
											hideText
											onChange={(text: string) => setConfirmPassword(text)}
											value={confirmPassword}
											icon={PasswordI}
											textInputClassName="w-44 pl-[10px]"
										/>
									</View>
								</View>

								<View className="flex flex-row justify-between items-center pt-[55px]">
									<Button
										disabled={
											newPassword === '' || confirmPassword === '' || status === 'pending'
										}
										onPress={handleResetPassword}
									>
										<Text className="font-quicksand-bold text-secondary-700 text-base">
											{status === 'pending' ? (
												<ActivityIndicator size="small" color="#0C2C7E" />
											) : (
												'Change'
											)}
										</Text>
									</Button>
								</View>
								<View className="flex-1 w-full items-center pb-[40px] pt-[35px]">
									<Ilustration ilustration={LogoIlus} width={150} height={56} />
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</AnimatedComponent>
	);
};

export default ChangePassword;
