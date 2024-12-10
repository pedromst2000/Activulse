import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import GaugeChartIlus from '@/src/assets/svg/ilustrations/heartRiskAssessment/GaugeChart.svg';
import { AssessmentRiskStackParamList } from '@/src/navigation/AssessmentRisk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserContext } from '@/src/context/user';
import AnimatedComponent from '@/src/components/Animated';
import Button from '@/src/components/Button';
import Ilustration from '@/src/components/Ilustration';
import HealthDataCard from '@/src/components/HealthDataCard';
import Indicator from '@/src/components/Indicator';

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
			>
				<View className="flex-1 w-full relative bg-primary-50">
					{/* Risk Layout */}
					{/* Title */}
					<View className="flex-1 flex-row justify-center mt-10">
						<Text className="font-merriweather-bold text-2xl text-secondary-700 text-center sm:text-3xl md:text-4xl lg:text-5xl">
							Your Results
						</Text>
					</View>

					{/* Gauge Chart and Risk Details */}
					<View className="flex-1 flex-col justify-center items-center mt-1">
						{/* Gauge Chart */}
						<Ilustration
							ilustration={GaugeChartIlus}
							styleClass="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
						/>

						{/* Risk Levels */}
						<View className="flex-row justify-center items-center space-x-2 sm:space-x-4 mt-1">
							{/* Low Risk */}
							<Indicator
								type="Risk"
								bulletColor="bg-success-300"
								label="Low risk"
								value="<10%"
								styleClass="pr-2 sm:pr-4 md:pr-6 lg:pr-8"
							/>

							{/* Moderate Risk */}
							<Indicator
								type="Risk"
								bulletColor="bg-accent-300"
								label="Moderate risk"
								value="10-19%"
								styleClass="pl-2 pr-2 sm:pl-4 sm:pr-4 md:pl-6 md:pr-6 lg:pl-8 lg:pr-8"
							/>

							{/* High Risk */}
							<Indicator
								type="Risk"
								bulletColor="bg-error-500"
								label="High risk"
								value=">20%"
								styleClass="pl-2 sm:pl-4 md:pl-6 lg:pl-8"
							/>
						</View>
					</View>

					{/* Risk Percentage and Warning */}
					<View className="mt-5 items-center">
						<Text className="text-3xl font-quicksand-bold text-secondary-700">
							{route.params.riskScore}%{route.params.health_data.diabetes === 'Yes' ? '*' : ''}
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
							<View className="mt-4 w-11/12 sm:w-4/5 mx-auto">
								<Text className="text-xs sm:text-sm md:text-base lg:text-lg text-secondary-700 mt-2 text-center font-quicksand-bold">
									<Text className="text-xl sm:text-2xl font-quicksand-bold">*</Text>When
									diabetes is present, risk is considered high
								</Text>
							</View>
						)}
					</View>

					{/* HEALTH DATA */}
					<HealthDataCard
						gender={route.params.health_data.gender}
						age={route.params.health_data.age}
						smoker={route.params.health_data.smoker}
						diabetes={route.params.health_data.diabetes}
						hypertension={route.params.health_data.treatment_for_hypertension}
						SBP={route.params.health_data.systolic_blood_pressure}
						HDL={route.params.health_data.HDL_cholesterol}
						total_chol={route.params.health_data.total_cholesterol}
					/>

					<View className="mt-10 w-11/12 sm:w-4/5 mx-auto">
						<Button
							onPress={() => {
								handleNavigate();
							}}
							styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
						>
							<Text className="font-quicksand-bold text-secondary-700 text-base text-center sm:text-lg md:text-xl lg:text-2xl">
								Continue
							</Text>
						</Button>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default Result;
