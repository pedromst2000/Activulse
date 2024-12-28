import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import timers from '@/src/utils/timers';
import { APIResponse } from '@/src/hooks/ReactQuery/users/heartRiskAssessment/BodyResponse';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AssessmentRiskStackParamList } from '@/src/navigation/AssessmentRisk';
import utils from '@/src/utils';
import useHeartRiskAssessment from '@/src/hooks/ReactQuery/users/heartRiskAssessment';
import Ilustration from '../../Ilustration';
import CholesterolIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/Cholesterol.svg';
import InfoI from '../../../assets/svg/icons/InfoIcon.svg';
import AnimatedComponent from '../../Animated';
import Input from '../../Input';
import Button from '../../Button';
import Icon from '../../Icon';

type CholesterolQuestiondNavigationProp = NativeStackNavigationProp<
	AssessmentRiskStackParamList,
	'AssessmentRisk'
>;

type CholesterolQuestionProps = {
	gender: 'Male' | 'Female' | null;
	age: string;
	isSmoker: boolean;
	isDiabetic: boolean;
	isHypertensive: boolean;
	bloodPressure: string;
	HDL: string;
	setHDL: React.Dispatch<React.SetStateAction<string>>;
	totalCholesterol: string;
	setTotalCholesterol: React.Dispatch<React.SetStateAction<string>>;
};

const CholesterolQuestion: React.FC<CholesterolQuestionProps> = ({
	gender,
	age,
	isSmoker,
	isDiabetic,
	isHypertensive,
	bloodPressure,
	HDL,
	setHDL,
	totalCholesterol,
	setTotalCholesterol,
}): React.JSX.Element => {
	const [showError, setShowError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Manage the timeout for the error message
	const navigation = useNavigation<CholesterolQuestiondNavigationProp>();
	const { mutateAsync } = useHeartRiskAssessment({
		gender: gender,
		age: parseInt(age),
		smoker: isSmoker,
		diabetes: isDiabetic,
		treatment_for_hypertension: isHypertensive,
		systolic_blood_pressure: parseInt(bloodPressure),
		HDL_cholesterol: parseInt(HDL),
		total_cholesterol: parseInt(totalCholesterol),
	});

	useEffect(() => {
		if (showError) {
			timeoutRef.current = setTimeout(() => {
				setShowError(false);
			}, timers.ERROR_MESSAGE_TIMEOUT); // Hide the error message after 5 seconds
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [showError]);

	const handleAssessment = async (): Promise<void> => {
		await mutateAsync(
			{
				gender,
				age: parseInt(age),
				smoker: isSmoker,
				diabetes: isDiabetic,
				treatment_for_hypertension: isHypertensive,
				systolic_blood_pressure: parseInt(bloodPressure),
				HDL_cholesterol: parseInt(HDL),
				total_cholesterol: parseInt(totalCholesterol),
			},
			{
				onSuccess: async (resData: APIResponse): Promise<void> => {
					if (resData.success && resData.data) {
						const { riskScore, typeRisk, health_data } = resData.data;

						navigation.navigate('AssessmentRiskResult', {
							riskScore,
							typeRisk,
							health_data: {
								gender: health_data.gender,
								age: health_data.age,
								smoker: health_data.smoker,
								diabetes: health_data.diabetes,
								treatment_for_hypertension: health_data.treatment_for_hypertension,
								systolic_blood_pressure: health_data.systolic_blood_pressure,
								HDL_cholesterol: health_data.HDL_cholesterol,
								total_cholesterol: health_data.total_cholesterol,
							},
						});
					}
				},
				onError: (error: any): void => {
					const errorMessage = utils.error.getMessage(error as Error);

					setShowError(true);
					setErrorMessage(errorMessage);
				},
			},
		);
	};

	return (
		<AnimatedComponent
			animation="SlideInFromRight"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex justify-center items-center p-4">
				<View className="flex flex-row w-full px-2 py-2 gap-2 items-center mb-4 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">
					<Icon icon={InfoI} width={20} height={20} />
					<Text className="font-quicksand-semi-bold text-secondary-700 text-xs sm:text-sm md:text-base lg:text-lg tracking-wide flex-1">
						<Text className="font-quicksand-bold text-sm sm:text-base md:text-lg lg:text-xl">
							Check
						</Text>{' '}
						{''}
						the previous data filled in the previous steps before continuing.
					</Text>
				</View>
				<View className="mb-2">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						Let us know about your Cholesterol
					</Text>
				</View>
				<View className="mb-2">
					<Ilustration
						ilustration={CholesterolIlus}
						styleClass="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
					/>
				</View>

				{/* ERROR MESSAGE */}
				{showError && (
					<AnimatedComponent animation="FadeIn">
						<View className="mb-4">
							<Text className="font-quicksand-bold text-red-500 text-xs sm:text-sm md:text-base lg:text-lg text-center">
								{errorMessage}
							</Text>
						</View>
					</AnimatedComponent>
				)}

				<View className="mb-4 w-full flex flex-col justify-center items-center gap-4">
					{['HDL Chol.', 'Total Chol.'].map((label, index) => (
						<View
							key={index}
							className="relative flex-1 flex flex-row justify-center items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
						>
							<Text className="mr-2 font-quicksand-bold text-secondary-700 text-xs sm:text-sm md:text-base lg:text-lg">
								{label}
							</Text>

							<Input
								placeholder={`Insert your ${label}`}
								value={label === 'HDL Chol.' ? HDL : totalCholesterol}
								onChange={(text) =>
									label === 'HDL Chol.' ? setHDL(text) : setTotalCholesterol(text)
								}
								keyboardType="numeric"
								className="w-[60%] sm:w-[70%] md:w-[60%] lg:w-[50%]"
							/>
							<Text className="ml-2 font-quicksand-bold text-secondary-700 text-xs sm:text-sm md:text-base lg:text-lg">
								mg/dL
							</Text>
						</View>
					))}
				</View>

				<View className="w-full mb-4 mt-4 flex justify-center items-center">
					<Button
						disabled={HDL === '' || totalCholesterol === ''}
						onPress={() => {
							handleAssessment();
						}}
						styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
					>
						<Text className="font-quicksand-bold text-secondary-700 text-sm sm:text-base md:text-lg lg:text-xl text-center">
							Finish
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default CholesterolQuestion;
