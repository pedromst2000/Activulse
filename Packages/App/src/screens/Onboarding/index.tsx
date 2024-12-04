import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, Animated } from 'react-native';
import AnimatedComponent from '../../components/Animated';
import Button from '../../components/Button';
import LastSlideButton from '../../components/Onboarding/LastSlideBtn';
import slides from '../../data/Onboarding';
import OnboardingItem from '../../components/Onboarding/Item';
import Paginator from '../../components/Onboarding/Paginator';
import { RootStackParamList } from '../../navigation/index';

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList, 'AuthStack'>;

const Onboarding: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<OnboardingNavigationProp>();
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef<FlatList<any>>(null);

	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	useEffect(() => {
		console.log('Onboarding screen mounted');
	}, []);

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<View className="w-full px-4 py-2 sm:px-8 sm:py-4 flex-row justify-end">
					{currentIndex < slides.length - 1 && (
						<Text
							onPress={() => {
								slidesRef.current?.scrollToEnd();
							}}
							className="font-quicksand-bold text-secondary-700 text-base"
						>
							Skip
						</Text>
					)}
				</View>
				<View className="flex-1">
					{slides && slides.length > 0 && (
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
							onViewableItemsChanged={viewableItemsChanged}
							viewabilityConfig={viewConfig}
							ref={slidesRef}
						/>
					)}
				</View>
				<View className="flex flex-col items-center justify-between px-4 py-2">
					<Paginator data={slides} ScrollX={scrollX} />
					{currentIndex < slides.length - 1 ? (
						<Button
							onPress={() => {
								if (slidesRef.current) {
									slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
								}
							}}
						>
							<Text className="font-quicksand-bold text-secondary-700 text-base">Next</Text>
						</Button>
					) : (
						<View className="flex flex-col items-center justify-center gap-4">
							<LastSlideButton
								text="Sign In"
								onPress={() => {
									navigation.navigate('AuthStack', { screen: 'SignIn' });
								}}
								className="bg-primary-50 border-2 border-accent-500"
							/>
							<LastSlideButton
								text="Join Now"
								onPress={() => {
									navigation.navigate('AuthStack', { screen: 'JoinNow' });
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
