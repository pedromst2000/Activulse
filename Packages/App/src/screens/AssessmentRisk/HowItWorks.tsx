import AnimatedComponent from '@/src/components/Animated';
import React from 'react';
import { View, Text, Linking } from 'react-native';
import GoBackBtn from '../../components/GoBackBtn';
import Icon from '@/src/components/Icon';
import Ilustration from '@/src/components/Ilustration';
import InfoI from '../../assets/svg/icons/InfoIcon.svg';
import LogoIlus from '../../assets/svg/ilustrations/Logo.svg';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const HowItWorks: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView keyboardShouldPersistTaps="handled" className="bg-primary-50">
				<View className="absolute top-3 left-2 mt-6 ml-4 z-10">
					<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
				</View>

				{/* Layout Assessment Content */}
				<View className="flex-1 justify-center items-center px-4 py-7">
					{/* Heading */}
					<View className="pt-5">
						<Text className="font-merriweather-bold text-[22.78px] text-secondary-700 text-center">
							How It Works
						</Text>
					</View>
					{/* Note */}
					<View className="flex flex-row w-full px-4 py-6 sm:px-8 sm:py-4 gap-2 items-center">
						<Icon icon={InfoI} width={20} height={20} />
						<Text className="font-quicksand-bold text-secondary-700 text-[14.22px] flex-1 tracking-[1px]">
							We recommend to read all the guidelines
						</Text>
					</View>
					{/* Info Section  */}
					<View className="w-[90%] px-[5%]">
						{/* Welcome */}
						<View className="my-5">
							{/* Welcome Heading */}
							<View>
								<Text className="font-merriweather-bold text-[18px] text-secondary-700 text-center">
									Welcome
								</Text>
								<View className="border-b-2 border-secondary-700 w-[220px] mt-2 mx-auto"></View>
							</View>
							{/* Welcome Content */}
							<View className="mt-2">
								<Text className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6">
									Welcome to our Cardiovascular Risk Assessment tool! We want to empower you
									with knowledge about your heart health. Our calculations are based on the{' '}
									<Text className="font-quicksand-bold"> Framingham Risk Score</Text> [1] , a
									widely respected tool developed to estimate your risk of developing
									cardiovascular disease over the next 10 years [1][2].
								</Text>
							</View>
						</View>

						{/* Framingham Risk Score (FRS) */}
						<View className="my-5">
							{/* FRS Heading */}
							<View>
								<Text className="font-merriweather-bold text-[18px] text-secondary-700 text-center">
									Framingham Risk Score (FRS)
								</Text>
								<View className="border-b-2 border-secondary-700 w-[220px] mt-2 mx-auto"></View>
							</View>
							{/* FRS Content */}
							<View className="mt-2">
								<Text className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6">
									The <Text className="font-quicksand-bold">FRS</Text> uses various factors
									such as age, cholesterol levels, blood pressure, smoking status, and diabetes
									to calculate your risk of heart disease [1]. It's an evidence-based approach
									that helps healthcare providers assess and manage cardiovascular risk [2]. He
									uses the tables published by the{' '}
									<Text className="font-quicksand-bold">American Heart Association (AHA)</Text>{' '}
									in 2008 [1]. Calculations can be performed using either the{' '}
									<Text className="font-quicksand-bold">
										Cardiovascular Diseases (CVD) system points
									</Text>{' '}
									for both Men and Women or through risk estimation using the{' '}
									<Text className="font-quicksand-bold">Cox Model</Text> and Score Sheet [1].
									For greater accuracy, Activulse uses Cox Model Formulas derived from General
									CVD Risk Prediction Models [1][2]. These formulas primarily consider
									Regression Coefficients and Hazard Ratios, ensuring a comprehensive
									evaluation of all risk factors and their statistically significant
									associations with incident CVD [1]. We classified the risk into 3 classes
									[2]: {'\n'}
									{'\u2022'} <Text className="font-quicksand-bold">{'< 10%'}</Text> low risk;
									{'\n'}
									{'\u2022'} <Text className="font-quicksand-bold">{'10% to 20%'}</Text> –
									moderate risk;
									{'\n'}
									{'\u2022'} <Text className="font-quicksand-bold">{'> 20%'}</Text> – high
									risk,
									{'\n'}
									based on the FRS risk percentage.{' '}
									<Text className="font-quicksand-bold">Pacients with Diabetes </Text>are
									automatically classified as{' '}
									<Text className="font-quicksand-bold">high risk</Text> [3]. For further
									information about the process behind the development of the calculation, we
									recommend that you consult the following references:
								</Text>
							</View>

							{/* FRS REFERENCES */}
							<View className="flex flex-col mt-[-10px]">
								<View className="mb-5 mt-6">
									<Text
										className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 underline"
										onPress={() =>
											Linking.openURL(
												'https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579#d1e386',
											)
										}
									>
										<Text className="font-quicksand-bold">1.</Text> D'Agostino RB, Vasan RS,
										Pencina MJ, et al. General cardiovascular risk profile for use in primary
										care: the Framingham Heart Study. Circulation. 2008;117(6):743-753.
									</Text>
								</View>

								<View className="mb-5 mt-2">
									<Text
										className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 underline"
										onPress={() =>
											Linking.openURL(
												'https://www.thieme-connect.de/products/ejournals/abstract/10.1055/s-0044-1782528',
											)
										}
									>
										<Text className="font-quicksand-bold">2.</Text> Sharifi. N., Najafi. A. et
										al. Ten-Year Cardiovascular Risk Estimation through the Framingham Risk
										Score among Commercial Motor Vehicle Drivers with High and Low Risk of
										Obstructive Sleep Apnea. Sleep Science. 2024; DOI: 10.1055/s-0044-1782528
									</Text>
								</View>

								<View className="mt-2">
									<Text
										className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 underline"
										onPress={() =>
											Linking.openURL(
												'https://qxmd.com/calculate/calculator_252/framingham-risk-score-2008',
											)
										}
									>
										<Text className="font-quicksand-bold">
											3. {''}
											<Text className="font-quicksand-medium">
												QxMD. Framingham Risk Score. QxMD FRS Calculator. 2008
											</Text>
										</Text>
									</Text>
								</View>
							</View>
						</View>

						{/* Assesment Meaning */}
						<View className="my-5">
							{/* Assessment Meaing Heading */}
							<View>
								<Text className="font-merriweather-bold text-[18px] text-secondary-700 text-center">
									Assessment Meaning
								</Text>
								<View className="border-b-2 border-secondary-700 w-[220px] mt-2 mx-auto"></View>
							</View>
							{/* Assessment Meaning Content */}
							<View className="mt-2">
								<Text className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6">
									Your assessment results offer valuable insights into your heart health,
									providing an estimate of your risk of developing cardiovascular disease over
									the next decade. If your assessment indicates an increased risk,{' '}
									<Text className="font-quicksand-bold">don't panic</Text>. Activulse features
									a dedicated lifestyle section designed to enhance your heart health.However,
									it's crucial to discuss your results with a{' '}
									<Text className="font-quicksand-bold">healthcare professional</Text> to
									develop a personalized plan for optimal heart health. Remember, this
									assessment is just one piece of the puzzle in understanding your overall
									health. <Text className="font-quicksand-bold">We strongly recommend</Text>{' '}
									following up with your {''}
									<Text className="font-quicksand-bold">
										healthcare provider for tailored advice and recommendations.
									</Text>
								</Text>
							</View>
						</View>
					</View>
					{/* Logo */}
					<View className="flex-1 w-full items-center pb-[40px] pt-[35px]">
						<Ilustration ilustration={LogoIlus} width={150} height={56} />
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default HowItWorks;
