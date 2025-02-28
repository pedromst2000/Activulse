import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedComponent from '@/src/components/Animated';
import OptionCard from '@/src/components/OptionCard';

type SelectPremiumLayoutProps = {
	navigation: any;
};

const SelectPremiumLayout: React.FC<SelectPremiumLayoutProps> = ({
	navigation,
}): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				className="flex-1 bg-primary-50"
			>
				{/* Layout Select Feed Cards */}
				<View className="w-full flex-1 bg-primary-50 px-4 mb-4">
					{/* Title & Subtitle */}
					<View className="mt-8 mb-6">
						<Text
							className="text-[22px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] text-secondary-700 font-merriweather-bold
			  leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] xl:leading-[32px] text-center tracking-[0.8px]"
						>
							Premium Lifestyle Choices
						</Text>
						<Text
							className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-secondary-700 font-quicksand-medium
			  leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px] text-center tracking-[0.8px] mt-2"
						>
							Select your preference section
						</Text>
					</View>

					{/* Cards */}
					<View className="flex flex-col items-center space-y-4">
						{/* Fitness Card */}
						<OptionCard
							label="Fitness"
							description="Unlock exclusive activities to elevate your fitness journey designed to boost your cardio health."
							sourceImg={require('../../../assets/images/StoreFitness.png')}
							onPress={() => navigation.navigate('FitnessStoreFeed' as never)}
						/>

						{/* Nutrition Card */}
						<OptionCard
							label="Nutrition"
							description="Unlock exclusive recipes crafted to nourish your body and support your heart health."
							sourceImg={require('../../../assets/images/StoreNutrition.png')}
							onPress={() => navigation.navigate('NutritionStoreFeed' as never)}
						/>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default SelectPremiumLayout;
