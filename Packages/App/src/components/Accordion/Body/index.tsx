import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Ilustration from '../../Ilustration';

type Props = {
	type: 'Ingredient' | 'Instruction';
	ilustration: React.FC<SvgProps>;
	data: any;
	isToogle: boolean;
};

const AccordionBody: React.FC<Props> = ({
	type,
	ilustration,
	data,
	isToogle,
}): React.JSX.Element => {
	const openAnim = useRef(new Animated.Value(isToogle ? 0 : 1)).current;

	useEffect(() => {
		Animated.timing(openAnim, {
			toValue: isToogle ? 1 : 0,
			duration: 350,
			useNativeDriver: true,
		}).start();
	}, [isToogle, openAnim]);

	return (
		<Animated.View
			style={{
				opacity: isToogle ? openAnim : 0,
				display: isToogle ? 'flex' : 'none',
			}}
			className="flex justify-between items-center  bg-accent-100 rounded-b-[30px] p-[12px] w-11/12 md:w-10/12 lg:w-11/12 space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8 pb-4"
		>
			<View className="w-full max-w-xs sm:max-w-sm md:max-w-md items-center">
				<Ilustration
					ilustration={ilustration}
					styleClass="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52"
				/>
			</View>
			<View
				className={`
						items-center
					${type === 'Ingredient' ? 'space-y-4 sm:space-y-4 md:space-y-6 lg:space-y-6' : null}`}
			>
				{Array.from({
					length: data?.length,
				}).map((_, index) => (
					<View key={index} className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`}>
						<Text
							className={`text-secondary-700 text-sm sm:text-sm md:text-base lg:text-base tracking-[0.5px] leading-5 sm:leading-6 md:leading-7 lg:leading-8
						${type === 'Ingredient' && index % 2 === 0 ? 'font-quicksand-bold' : 'font-quicksand-medium'} ${type === 'Instruction' ? 'p-2 w-64 text-center' : null}
								`}
						>
							<Text
								className="
								font-merriweather-bold-italic text-secondary-700 text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px]
								tracking-[0.5px] leading-5 sm:leading-6 md:leading-7 lg:leading-8"
							>
								{type === 'Instruction' ? `${index + 1}.` : null}
							</Text>{' '}
							{type === 'Instruction' ? '' : null}
							{type === 'Ingredient' ? data[index]?.ingredient : data[index]?.instruction}
						</Text>
					</View>
				))}
			</View>
		</Animated.View>
	);
};

export default AccordionBody;
