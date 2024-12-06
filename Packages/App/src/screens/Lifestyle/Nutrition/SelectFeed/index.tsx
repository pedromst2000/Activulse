import { Text, View } from 'react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AnimatedComponent from '../../../../components/Animated';
import GoBackBtn from '@/src/components/GoBackBtn';
import OptionCard from '@/src/components/OptionCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';

type SelectFeedNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'SelectFeed'
>;

const SelectFeed: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<SelectFeedNavigationProp>();
	const [selectedDiet, setSelectedDiet] = useState<'DASH' | 'Vegan' | 'Mediterranean' | null>(
		null,
	);

	const handleDietSelection = (dietType: 'DASH' | 'Vegan' | 'Mediterranean') => {
		setSelectedDiet(dietType);

		navigation.navigate('NutritionFeed', { diet: dietType });
	};

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<ScrollView keyboardShouldPersistTaps="handled" className="bg-primary-50">
				{/* TODO: Convert into a reusable Component Called - Top Label Screen */}
				<View className="flex-row items-center mt-10 ml-4 z-10">
					<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
					<Text className="font-merriweather-bold text-[22px] md:text-xl lg:text-2xl text-secondary-700 ml-14">
						Nutrition
					</Text>
				</View>

				<View className="flex-1 bg-primary-50 px-4 mb-4">
					{/* Title & Subtitle */}
					<View className="mt-8 mb-6">
						<Text
							className="text-[22px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-secondary-700 font-merriweather-bold
			  leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-center tracking-[0.8px]
				w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 mx-auto 
			  "
						>
							A culinary journey with our diets
						</Text>
						<Text
							className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-secondary-700 font-quicksand-medium
			  leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] text-center tracking-[0.8px] mt-2
			  "
						>
							Select your preference diet
						</Text>
					</View>

					{/* Cards */}
					<View className="flex flex-col items-center space-y-4">
						{/* DASH CARD */}
						<OptionCard
							label="DASH"
							sourceImg={require('../../../../assets/images/DashDiet.png')}
							onPress={() => handleDietSelection('DASH')}
							description="Discover the DASH Diet: a heart-healthy plan rich in fruits, vegetables, and low-fat dairy, proven to help lower blood pressure."
						/>

						{/* VEGAN CARD */}
						<OptionCard
							label="Vegan"
							sourceImg={require('../../../../assets/images/VeganDiet.png')}
							onPress={() => handleDietSelection('Vegan')}
							description=" Elevate your plate with our Vegetarian Diet, where every bite is a celebration of plant-based goodness."
						/>

						{/* MEDITERRANEAN CARD */}
						<OptionCard
							label="Mediterranean"
							sourceImg={require('../../../../assets/images/MediterraneanDiet.png')}
							onPress={() => handleDietSelection('Mediterranean')}
							description=" Embark on a sensory journey through the sun-kissed lands of the Mediterranean with our diet rich in tradition and taste."
						/>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default SelectFeed;
