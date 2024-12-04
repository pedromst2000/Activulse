import React from 'react';
import { Text, View } from 'react-native';

type TitleProps = {
	title: string;
	subTitle: string;
	className?: string;
};

const Title: React.FC<TitleProps> = ({ title, subTitle, className }): React.JSX.Element => {
	return (
		<View className={`justify-center items-center gap-2 pt-[120px]`}>
			<Text className="font-merriweather-bold text-[25.6px] text-center text-secondary-700 tracking-[1px]">
				{title}
			</Text>
			<Text className="font-quicksand-medium text-[14.2px] text-center text-secondary-700 px-4 tracking-[0.2px] leading-[20px]">
				{subTitle}
			</Text>
		</View>
	);
};

export default Title;
