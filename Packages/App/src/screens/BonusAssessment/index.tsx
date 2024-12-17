import AnimatedComponent from '@/src/components/Animated';
import React from 'react';
import { View, Text } from 'react-native';
import Ilustration from '@/src/components/Ilustration';
import PersonalizedHeartIlus from '../../assets/svg/ilustrations/PersonalizedAssessment/PersonalizedHeart.svg';
import Button from '@/src/components/Button';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserContext } from '@/src/context/user';
import utils from '@/src/utils';

const InitBonusAssessment: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser, loggedUser } = useUserContext();

	const handleSignOut = async (): Promise<void> => {
		// Remove the tokens from the device storage
		await utils.storage.removeItem('authToken');
		await utils.storage.removeItem('refreshToken');

		// Update the global state
		setLoggedUser(null);
	};

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
				<View className="flex-1 justify-center items-center min-h-screen px-4 py-5 gap-4 bg-primary-50">
					{/* Heading Section */}
					<View className="w-full px-4">
						<Text className="font-merriweather-bold text-[22px] text-secondary-700 text-center sm:text-[22px] md:text-[25px] lg:text-[28px]">
							Personalized Heart
						</Text>
					</View>
					{/* Ilustration Section */}
					<View className="w-full items-center">
						<Ilustration
							ilustration={PersonalizedHeartIlus}
							styleClass="w-[300px] h-[220px] sm:w-[320px] sm:h-[240px] md:w-[340px] md:h-[250px] lg:w-[360px] lg:h-[270px]"
						/>
					</View>

					{/* Start Assessment Description */}
					<View className="px-4">
						<Text className="font-quicksand-medium text-secondary-700 text-[14.22px] text-center">
							Congratulations on completing the Heart Risk Assessment! You're ready to begin
							your journey. To personalize your experience and track your progress, we just
							need a few more details about you.
						</Text>
					</View>
					<View className="flex w-full px-4 py-1 gap-4 sm:px-8 sm:py-4">
						<View className="flex-1">
							<Button
								onPress={() => {
									navigation.navigate('BonusAssessment' as never);
									console.log(
										`User state before starting the assessment: ${JSON.stringify(loggedUser, null, 2)}`,
									);
								}}
							>
								<Text className="font-quicksand-bold text-secondary-700 text-base">Start</Text>
							</Button>
						</View>
						<View>
							<Button
								onPress={handleSignOut}
								className="flex-1 bg-primary-50 border-2 border-accent-500"
							>
								<Text className="font-quicksand-bold text-secondary-700 text-base text-center">
									Sign Out
								</Text>
							</Button>
						</View>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default InitBonusAssessment;
