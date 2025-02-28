import React from 'react';
import { View } from 'react-native';
import { InView } from 'react-native-intersection-observer';
import config from '@/src/config';
import Card from './Card';
import EmptyState from '../EmptyState';
import LoadingSkeleton from '../LoadingSkeleton';
import ErrorIlus from '../../assets/svg/ilustrations/EmptyStates/ErrorServer.svg';
import NoRecipesIlus from '../../assets/svg/ilustrations/EmptyStates/FilterEmptyState.svg';
import NoActivitiesIlus from '../../assets/svg/ilustrations/EmptyStates/NoActivitiesFound.svg';
import NoPremiumRecipesIlus from '../../assets/svg/ilustrations/EmptyStates/NoPremiumRecipes.svg';
import NoPremiumActivitiesIlus from '../../assets/svg/ilustrations/EmptyStates/NoPremiumActivities.svg';
import NoBannersIlus from '../../assets/svg/ilustrations/EmptyStates/EmptyBannersStore.svg';
import NoActivitiesToBuyIlus from '../../assets/svg/ilustrations/EmptyStates/NoActivitiesToBuy.svg';
import NoRecipesToBuyIlus from '../../assets/svg/ilustrations/EmptyStates/NoRecipesToBuy.svg';

type Props = {
	type: 'recipes' | 'activities' | 'storeBanners';
	data: any[];
	handleOnChange: (inView: boolean, id: number) => void;
	isLoading: boolean;
	isError: boolean;
	isRefetching: boolean;
	category?: string | undefined;
	search?: string | undefined;
	filter?: string | undefined;
	messageAPI?: string;
	activities?: any[];
	recipes?: any[];
	banners?: any[];
	onPressCard?: (id: number) => void;
};

const Feed: React.FC<Props> = ({
	type,
	data,
	handleOnChange,
	isLoading,
	isError,
	isRefetching,
	category,
	search,
	filter,
	messageAPI,
	activities,
	recipes,
	banners,
	onPressCard,
}): React.JSX.Element => {
	return (
		<>
			{data.map((item: any, index: number) => (
				<InView
					className={`w-full flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12`}
					key={`${item.id}-${index}`}
					onChange={(inView: boolean) => handleOnChange(inView, item.id)}
				>
					<Card
						onPressCard={onPressCard}
						type={
							type === 'recipes'
								? 'Recipe'
								: type === 'activities'
									? 'Activity'
									: 'StoreBanner'
						}
						_item_={item}
					/>
				</InView>
			))}

			{(isLoading || isRefetching) && (
				<View className="mt-2">
					{Array.from({
						length:
							type === 'recipes'
								? config.pagination.recipes.feed.defaultLimit
								: type === 'activities'
									? config.pagination.activities.feed.defaultLimit
									: type === 'storeBanners'
										? config.pagination.banners.feed.defaultLimit
										: 0,
					}).map((_, index) => (
						<View
							key={index}
							className="w-full flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12"
						>
							<LoadingSkeleton
								type={
									type === 'recipes'
										? 'FeedRecipes'
										: type === 'activities'
											? 'FeedActivities'
											: type === 'storeBanners'
												? 'Banners'
												: null
								}
								category={category}
							/>
						</View>
					))}
				</View>
			)}

			{!isLoading &&
				!isRefetching &&
				(messageAPI === 'No Recipes Found' && search !== '' && recipes?.length == 0 ? (
					<EmptyState
						type="NotFound"
						_ilustration_={NoRecipesIlus}
						message={messageAPI}
						description="Oops! It seems like we couldn't find any recipes that match your search criteria. How about exploring new culinary adventures? Your next delicious discovery is just around the corner!"
						styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
					/>
				) : messageAPI === 'No Activities Found' &&
				  filter !== '' &&
				  activities?.length == 0 ? (
					<EmptyState
						type="NotFound"
						_ilustration_={NoActivitiesIlus}
						message={messageAPI}
						description="It looks like there are no activities that match your filter criteria. Try adjusting your filters or explore other ways to keep your heart healthy!"
						styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
					/>
				) : (messageAPI === 'No Premium Recipes Found' && recipes?.length == 0) ||
				  (messageAPI === 'No Premium Activities Found' && activities?.length == 0) ? (
					<EmptyState
						type="NotFound"
						_ilustration_={type === 'recipes' ? NoPremiumRecipesIlus : NoPremiumActivitiesIlus}
						message={messageAPI}
						description={
							type === 'recipes'
								? " Uh-oh! It seems like your premium pursuits are still under lock and key. Haven't unlocked premium activities yet? No worries! Head over to the store to discover exclusive offerings and elevate your nourishing journey."
								: "Uh-oh! It seems like your premium pursuits are still under lock and key. Haven't unlocked premium activities yet? No worries! Head over to the store to discover exclusive offerings and elevate your fitness journey."
						}
						styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
					/>
				) : messageAPI?.includes('to buy it !') && data?.length == 0 ? (
					<EmptyState
						type="NotFound"
						_ilustration_={
							banners?.length == 0
								? NoBannersIlus
								: activities?.length == 0
									? NoActivitiesToBuyIlus
									: NoRecipesToBuyIlus
						}
						message={
							banners?.length == 0 ? 'Banners Collection Completed!' : "You're All Set!"
						}
						description={
							banners?.length == 0
								? "You've collected every banner we have to offer! Your profile has never looked better. Stay tuned for new designs and updates. Keep shining bright on your health journey!"
								: `Congratulations! You've unlocked all our Premium ${
										activities?.length == 0 ? 'activities' : 'recipes'
									}. Stay tuned for ${activities?.length == 0 ? 'more exciting updates and new features designed to help you stay on top of' : 'delicious new additions and exciting updates designed to support'} your cardiovascular health. Keep up the great work!`
						}
						styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
					/>
				) : messageAPI?.includes('No Store') && data?.length == 0 ? (
					<EmptyState
						type="NotFound"
						_ilustration_={
							activities?.length == 0 ? NoPremiumActivitiesIlus : NoPremiumRecipesIlus
						}
						message={activities?.length == 0 ? 'No Activities Found' : 'No Recipes Found'}
						description={`Oops! No ${activities?.length == 0 ? 'activities' : 'recipes'} found in this category. But don’t worry—discover exciting options in other categories or explore our premium ${activities?.length == 0 ? 'recipes' : 'activities'} for something truly special!`}
						styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
					/>
				) : (
					isError &&
					((messageAPI === 'Network Error' && data?.length == 0) ||
						(messageAPI === 'Something went wrong!' && data?.length == 0) ||
						(messageAPI === 'Missing auth token or refresh token' && data?.length == 0) ||
						(messageAPI === 'Refresh token has expired' && data?.length == 0)) && (
						<EmptyState
							type="Error"
							_ilustration_={ErrorIlus}
							message="Oops! Something went wrong"
							description="Uh-oh! It looks like something went wrong on our end. Our tech team is already working hard to fix it. Please try again Later. Thanks for your patience and understanding! "
							styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
						/>
					)
				))}
		</>
	);
};

export default Feed;
