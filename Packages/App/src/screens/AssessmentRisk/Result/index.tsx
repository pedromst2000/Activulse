import AnimatedComponent from '@/src/components/Animated';
import Button from '@/src/components/Button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ilustration from '@/src/components/Ilustration';
import GaugeChartIlus from '@/src/assets/svg/ilustrations/heartRiskAssessment/GaugeChart.svg';
import { AssessmentRiskStackParamList } from '@/src/navigation/AssessmentRisk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserContext } from '@/src/context/user';

type AssessmentResultRouteProp = RouteProp<
	AssessmentRiskStackParamList,
	'AssessmentRiskResult'
>;
type AssessmentResultNavigationProp = NativeStackNavigationProp<
	AssessmentRiskStackParamList,
	'AssessmentRiskResult'
>;

const Result: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<AssessmentResultNavigationProp>();
	const route = useRoute<AssessmentResultRouteProp>();
	const { loggedUser, updateUser } = useUserContext();

	const handleNavigate = (): void => {
		const update = {
			isNewUser: false,
		};

		if (loggedUser) {
			updateUser({ ...loggedUser, ...update });
		}

		navigation.navigate('InitBonusAssessment' as never);
	};

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<ScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'center',
					alignItems: 'center',
					paddingBottom: 30,
				}}
				className="bg-primary-50"
			>
				<View className="flex-1 w-full relative">
					{/* Risk Layout */}
					<View>
						{/* Title */}
						<View className="flex-1 flex-row justify-center mt-10">
							<Text className="font-merriweather-bold text-2xl text-secondary-700 text-center">
								Your Results
							</Text>
						</View>

						{/* Gauge Chart and Risk Details */}
						<View className="flex-1 flex-col justify-center items-center mt-1">
							{/* Gauge Chart */}
							<Ilustration ilustration={GaugeChartIlus} width={180} height={180} />

							{/* Risk Levels */}
							<View className="flex-row justify-center items-center space-x-4 mt-1">
								{/* Low Risk */}
								<View className="items-center">
									<View className="flex-1 flex-row justify-center items-center gap-2">
										<View className="w-3 h-3 bg-success-300 rounded-full mt-2" />
										<Text className="font-quicksand-bold tracking-wide text-sm text-secondary-700">
											Low risk
										</Text>
									</View>
									<Text className="font-quicksand-medium text-sm text-secondary-700 ml-2">
										{'<'}10%
									</Text>
								</View>

								{/* Moderate Risk */}
								<View className="items-center">
									<View className="flex-1 flex-row justify-center items-center gap-2">
										<View className="w-3 h-3 bg-accent-300 rounded-full mt-2" />
										<Text className="font-quicksand-bold tracking-wide text-sm text-secondary-700">
											Moderate risk
										</Text>
									</View>
									<Text className="font-quicksand-medium text-sm text-secondary-700 ml-2">
										10-19%
									</Text>
								</View>

								{/* High Risk */}
								<View className="items-center">
									<View className="flex-1 flex-row justify-center items-center gap-2">
										<View className="w-3 h-3 bg-error-500 rounded-full mt-2" />
										<Text className="font-quicksand-bold tracking-wide text-sm text-secondary-700">
											High risk
										</Text>
									</View>
									<Text className="font-quicksand-medium text-sm text-secondary-700 ml-2">
										{'>'}20%
									</Text>
								</View>
							</View>
						</View>

						{/* Risk Percentage and Warning */}
						<View className="mt-5 items-center">
							<Text className="text-3xl font-quicksand-bold text-secondary-700">
								{route.params.riskScore}%
								{route.params.health_data.diabetes === 'Yes' ? '*' : ''}
							</Text>
							<Text className="font-quicksand-medium text-base tracking-wide text-secondary-700">
								10-year risk of CV event
							</Text>

							{/* High Risk Indicator */}
							<View
								className={`mt-4 px-4 py-2 rounded-full ${route.params.typeRisk === 'High Risk' ? 'bg-error-500' : route.params.typeRisk === 'Moderate Risk' ? 'bg-accent-300' : 'bg-success-300'}`}
							>
								<Text
									className={`text-${
										route.params.typeRisk === 'High Risk'
											? 'primary-50'
											: route.params.typeRisk === 'Moderate Risk'
												? 'secondary-700'
												: 'primary-50'
									} text-sm font-quicksand-semi-bold`}
								>
									{route.params.typeRisk}
								</Text>
							</View>

							{/* Diabetes Warning */}
							{route.params.health_data.diabetes === 'Yes' && (
								<Text className="text-[12.5px] text-secondary-700 mt-2 text-center font-quicksand-bold">
									<Text className="text-2xl font-quicksand-bold">*</Text>When diabetes is
									present, risk is considered high
								</Text>
							)}
						</View>

						{/* HEALTH DATA */}
						<View className="flex-1 bg-accent-100 rounded-3xl mt-5 w-4/5 mx-auto p-3 shadow-2xl">
							<View className="space-y-3">
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">
											Gender
										</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.gender}
										</Text>
									</View>
								</View>
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">Age</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.age}
										</Text>
									</View>
								</View>
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">
											Smoker
										</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.smoker}
										</Text>
									</View>
								</View>
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">
											Diabetes
										</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.diabetes}
										</Text>
									</View>
								</View>
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">
											Hypertension
										</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.treatment_for_hypertension}
										</Text>
									</View>
								</View>
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">SBP</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.systolic_blood_pressure} mmHg
										</Text>
									</View>
								</View>
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">HDL</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.HDL_cholesterol} mg/dl
										</Text>
									</View>
								</View>
								<View className="flex-row justify-between px-4">
									<View>
										<Text className="font-quicksand-bold text-sm text-secondary-700">
											Total Cholesterol
										</Text>
									</View>
									<View>
										<Text className="font-quicksand-medium text-secondary-700 tracking-wide">
											{route.params.health_data.total_cholesterol} mg/dl
										</Text>
									</View>
								</View>
							</View>
						</View>

						<View className="mt-10 w-11/12 sm:w-4/5 mx-auto">
							<Button
								onPress={() => {
									handleNavigate();
								}}
								className="w-full"
							>
								<Text className="font-quicksand-bold text-secondary-700 text-base text-center">
									Continue
								</Text>
							</Button>
						</View>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default Result;
