import React, { useEffect, useRef, useState } from 'react';
import { Text, View, FlatList, Animated } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import BonusOnboardingItem from '@/src/components/BonusOnboarding/item';
import Button from '@/src/components/Button';
import slides from '@/src/data/BonusOnboarding';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AssessmentRiskStackParamList } from '@/src/navigation/AssessmentRisk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainTabParamList, RootStackParamList } from '@/src/navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useUserContext } from '@/src/context/user';

type BonusOnboardingRouteProp = RouteProp<AssessmentRiskStackParamList, 'BonusOnboarding'>;
type BonusOnboardingNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

const BonusOnboarding: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<BonusOnboardingNavigationProp>();
	const route = useRoute<BonusOnboardingRouteProp>();
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef<FlatList<any>>(null);
	const [isStress, setIsStress] = useState<boolean>(false);
	const [isFastFood, setIsFastFood] = useState<boolean>(false);
	const { loggedUser } = useUserContext();

	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	useEffect(() => {
		AsyncStorage.getItem('selectedStress').then((res) => {
			const _isStress_ = res === 'Sometimes' || res === 'Frequently';
			setIsStress(_isStress_);
		});

		AsyncStorage.getItem('loggedUser').then((res) => {
			console.log('loggedUser:', res);
		});

		setIsFastFood(route.params.isFastFood ? true : false);
	}, [isFastFood, isStress]);

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<View className="flex-1">
					<FlatList
						data={slides.filter((slide) => {
							if (slide.id === 1 && !isStress) return false;
							if (slide.id === 2 && !isFastFood) return false;
							return true;
						})}
						renderItem={({ item, index }) => (
							<BonusOnboardingItem
								key={index}
								id={index}
								title={item.title}
								description={item.description}
								imageKey={item.imageKey}
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
						scrollEventThrottle={32}
						onViewableItemsChanged={viewableItemsChanged}
						viewabilityConfig={viewConfig}
						ref={slidesRef}
					/>
				</View>
				<Button
					onPress={() => {
						const filteredSlides = slides.filter((slide) => {
							if (slide.id === 1 && !isStress) return false;
							if (slide.id === 2 && !isFastFood) return false;
							return true;
						});

						if (slidesRef.current && currentIndex < filteredSlides.length - 1) {
							slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
						} else if (currentIndex === filteredSlides.length - 1) {
							navigation.navigate('Home');
						}
					}}
				>
					<Text className="font-quicksand-bold text-secondary-700 text-base">
						{currentIndex ===
						slides.filter((slide) => {
							if (slide.id === 1 && !isStress) return false;
							if (slide.id === 2 && !isFastFood) return false;
							return true;
						}).length -
							1
							? 'Home'
							: 'Next'}
					</Text>
				</Button>
			</View>
		</AnimatedComponent>
	);
};

export default BonusOnboarding;
