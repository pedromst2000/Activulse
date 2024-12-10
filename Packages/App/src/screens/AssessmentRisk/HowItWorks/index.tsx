import React from 'react';
import { View, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import InfoI from '../../../assets/svg/icons/InfoIcon.svg';
import LogoIlus from '../../../assets/svg/ilustrations/Logo.svg';
import AnimatedComponent from '@/src/components/Animated';
import Ilustration from '@/src/components/Ilustration';
import Icon from '@/src/components/Icon';
import ScreenTitle from '@/src/components/ScreenTitle';
import Link from '@/src/components/Link';

const HowItWorks: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-primary-50">
				<ScreenTitle label="How It Works" onPress={() => navigation.goBack()} />

				{/* Layout Assessment Content */}
				<View
					className=" flex-1 justify-center items-center px-4 py-7 mt-[-20px] bg-primary-50
				 sm:px-6 sm:py-8 
				 md:px-8 md:py-10
				 lg:px-10 lg:py-12
				 xl:px-12 xl:py-14
				 2xl:px-14 2xl:py-16
				 "
				>
					{/* Note */}
					<View className="flex flex-row w-full px-4 py-6 sm:px-6 sm:py-4 gap-2 items-center">
						<Icon icon={InfoI} width={20} height={20} />
						<Text
							className="font-quicksand-bold text-secondary-700 text-[13.22px] flex-1 tracking-[1px] text-center sm:text-left
						md:text-center lg:text-left xl:text-center 2xl:text-left sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]
						"
						>
							We recommend to read all the guidelines
						</Text>
					</View>
					{/* Info Section  */}
					<View className="w-[90%] px-[5%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] mx-auto">
						{/* Welcome Section */}
						<View
							className="my-5
								sm:my-6 
								md:my-7
								lg:my-8
								xl:my-9
						"
						>
							{/* Welcome Heading */}
							<View>
								<Text className="font-merriweather-bold text-secondary-700 text-center text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
									Welcome
								</Text>
								<View className="border-b-2 border-secondary-700 w-[180px] sm:w-[190px] md:w-[200px] lg:w-[210px] xl:w-[220px] 2xl:w-[230px] mt-2 mx-auto"></View>
							</View>
							{/* Welcome Content */}
							<View className="mt-2">
								<Text className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
									Welcome to our Cardiovascular Risk Assessment tool! We want to empower you
									with knowledge about your heart health. Our calculations are based on the{' '}
									<Text className="font-quicksand-bold"> Framingham Risk Score</Text> [1], a
									widely respected tool developed to estimate your risk of developing
									cardiovascular disease over the next 10 years [1][2].
								</Text>
							</View>
						</View>

						{/* Framingham Risk Score (FRS) Section */}
						<View className="my-5">
							{/* FRS Heading */}
							<View>
								<Text className="font-merriweather-bold text-secondary-700 text-center text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
									Framingham Risk Score (FRS)
								</Text>
								<View className="border-b-2 border-secondary-700 w-[180px] sm:w-[190px] md:w-[200px] lg:w-[210px] xl:w-[220px] 2xl:w-[230px] mt-2 mx-auto"></View>
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
								<Link
									type="Reference"
									refNumber="1. "
									refAuthor="D'Agostino RB, Vasan RS, Pencina MJ, et al. "
									refTitle="General cardiovascular risk profile for use in primary care: the Framingham Heart Study."
									refPublication=" Circulation. "
									refYear="2008; "
									refVolume="117"
									refIssue="(6)"
									refPages="743-753"
									styleClass="mb-5 mt-6"
									onPress={() =>
										Linking.openURL(
											'https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579#d1e386',
										)
									}
								/>

								<Link
									type="Reference"
									refNumber="2. "
									refAuthor="Sharifi. N., Najafi. A. et al. "
									refTitle="Ten-Year Cardiovascular Risk Estimation through the Framingham Risk Score among Commercial Motor Vehicle Drivers with High and Low Risk of Obstructive Sleep Apnea. "
									refPublication="Sleep Science. "
									refYear="2024; "
									refId="DOI: 10.1055/s-0044-1782528"
									styleClass="mb-5 mt-2"
									onPress={() =>
										Linking.openURL(
											'https://www.thieme-connect.de/products/ejournals/abstract/10.1055/s-0044-1782528',
										)
									}
								/>

								<Link
									type="Reference"
									refNumber="3. "
									refAuthor="QxMD. "
									refTitle="Framingham Risk Score. "
									refPublication="QxMD FRS Calculator. "
									refYear="2008"
									styleClass="mb-5 mt-2"
									onPress={() =>
										Linking.openURL(
											'https://qxmd.com/calculate/calculator_252/framingham-risk-score-2008',
										)
									}
								/>
							</View>
						</View>

						{/* Assesment Meaning */}
						<View>
							{/* Assessment Meaning Heading */}
							<View>
								<Text className="font-merriweather-bold text-secondary-700 text-center text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
									Assessment Meaning
								</Text>
								<View className="border-b-2 border-secondary-700 w-[180px] sm:w-[190px] md:w-[200px] lg:w-[210px] xl:w-[220px] 2xl:w-[230px] mt-2 mx-auto"></View>
							</View>
							{/* Assessment Meaning Content */}
							<View className="mt-2"></View>
							<Text className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
								Your assessment results offer valuable insights into your heart health,
								providing an estimate of your risk of developing cardiovascular disease over
								the next decade. If your assessment indicates an increased risk,{' '}
								<Text className="font-quicksand-bold">don't panic</Text>. Activulse features a
								dedicated lifestyle section designed to enhance your heart health. However,
								it's crucial to discuss your results with a{' '}
								<Text className="font-quicksand-bold">healthcare professional</Text> to develop
								a personalized plan for optimal heart health. Remember, this assessment is just
								one piece of the puzzle in understanding your overall health.{' '}
								<Text className="font-quicksand-bold">We strongly recommend</Text> following up
								with your {''}
								<Text className="font-quicksand-bold">
									healthcare provider for tailored advice and recommendations.
								</Text>
							</Text>
						</View>
					</View>
				</View>
				{/* Logo */}
				<View
					className="flex-1 w-full items-center pb-[30px] pt-[15px]
					sm:pb-[35px] sm:pt-[20px]
					md:pb-[40px] md:pt-[25px]
					lg:pb-[45px] lg:pt-[30px]
					xl:pb-[50px] xl:pt-[35px]
					2xl:pb-[55px] 2xl:pt-[40px]"
				>
					<Ilustration
						ilustration={LogoIlus}
						styleClass="w-[150px] h-[56px] sm:w-[160px] sm:h-[60px] md:w-[170px] md:h-[64px] lg:w-[180px] lg:h-[68px] xl:w-[190px] xl:h-[72px] 2xl:w-[200px] 2xl:h-[76px]"
					/>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default HowItWorks;
