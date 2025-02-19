import AnimatedComponent from '@/src/components/Animated';
import { View, Text } from 'react-native';
import Feed from '../../Feed';

/**
 * TODO:
 * 4. Fix Glitch Bug of Modal Showing unecessary!
 * Fix blank screen while fetching data after showing the loading skeleton and the data is not yet fetched
 */

const BannersLayout: React.FC = (): React.JSX.Element => {
	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex justify-center items-center">
				{/* Title & Subtitle */}
				<View className="mt-8 mb-6">
					<Text
						className="text-[22px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] text-secondary-700 font-merriweather-bold
			  leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] xl:leading-[32px] text-center tracking-[0.8px]"
					>
						Customize Your Profile with Exclusive Banners
					</Text>
					<Text
						className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-secondary-700 font-quicksand-medium
			  leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px] text-center tracking-[0.8px] mt-2"
					>
						Select your preference banner to buy
					</Text>
				</View>
				{/* Banners */}
			</View>
		</AnimatedComponent>
	);
};

export default BannersLayout;
