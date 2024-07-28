// import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { Text, View, FlatList, Animated } from 'react-native';
import AnimatedComponent from '../components/Animated';
import Button from '../components/Button';
import LastSlideButton from '../components/Onboarding/Button';
import slides from '../data/Onboarding';
import OnboardingItem from '../components/Onboarding/Item';
import Paginator from '../components/Onboarding/Paginator';

const Onboarding: React.FC = (): React.JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef<any>(null);

	const viewableItensChanged = useRef(({ viewableItems }: any) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	/**
	 * @description The Slide should be atleast 50% visible to change to the next slide or previous slide
	 * @var viewConfig
	 */

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center">
				{/* Skip Onboarding */}
				<View className="flex flex-row">
					{currentIndex < slides.length - 1 ? (
						<Text
							onPress={() => {
								slidesRef.current.scrollToEnd();
							}}
							className="font-quicksand-bold text-secondary-700 text-base pl-72"
						>
							Skip
						</Text>
					) : null}
				</View>
				{/* Swipe Onboarding - Navigate Onboarding */}
				<View className="flex-1">
					<FlatList
						data={slides}
						renderItem={({ item, index }) => (
							<OnboardingItem
								key={index}
								id={index}
								title={item.title}
								description={item.description}
							/>
						)}
						showsHorizontalScrollIndicator={false}
						horizontal
						pagingEnabled
						bounces={false}
						keyExtractor={(item) => item.id.toString()}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
							useNativeDriver: false,
						})}
						onViewableItemsChanged={viewableItensChanged}
						viewabilityConfig={viewConfig}
						ref={slidesRef}
					/>
				</View>
				<View>
					{/* Paginator Onboarding */}
					<Paginator data={slides} ScrollX={scrollX} />
				</View>
				{/* Buttons Section Next or Sign In/Join Now*/}
				<View>
					{currentIndex < slides.length - 1 ? (
						<Button
							text="Next"
							onPress={() => {
								if (slidesRef.current) {
									slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
								}
							}}
						/>
					) : (
						<View className="flex flex-row items-center justify-center gap-[20px]">
							<LastSlideButton
								text="Sign In"
								onPress={() => {
									console.log('Sign In');
								}}
								className="bg-primary-50 border-2 border-accent-500"
							/>
							<LastSlideButton
								text="Join Now"
								onPress={() => {
									console.log('Join Now');
								}}
								className="bg-accent-500"
							/>
						</View>
					)}
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default Onboarding;
