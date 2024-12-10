import React from 'react';
import { Text, View } from 'react-native';

type TitleProps = {
	title: string;
	subTitle: string;
};

const Title: React.FC<TitleProps> = ({ title, subTitle }): React.JSX.Element => {
	return (
		<View className={`justify-center items-center gap-2 pt-[120px]`}>
			<Text className="font-merriweather-bold text-center text-secondary-700 tracking-[1px] text-[24px] sm:text-[20px] md:text-[25.6px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
				{title}
			</Text>
			<Text className="font-quicksand-medium text-center text-secondary-700 px-4 tracking-[0.2px] leading-[20px] text-[14.6px] sm:text-[16px] md:text-[18px] lg:text-[20px]">
				{subTitle}
			</Text>
		</View>
	);
};

export default Title;
