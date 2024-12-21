import React from 'react';
import { View } from 'react-native';
import { InView } from 'react-native-intersection-observer';
import config from '@/src/config';
import Card from './Card';
import EmptyState from '../EmptyState';
import LoadingSkeleton from '../LoadingSkeleton';
import ErrorIlus from '../../assets/svg/ilustrations/EmptyStates/ErrorServer.svg';
import NoRecipesIlus from '../../assets/svg/ilustrations/EmptyStates/FilterEmptyState.svg';
import NoPremiumRecipes from '../../assets/svg/ilustrations/EmptyStates/NoPremiumRecipes.svg';
import NoPremiumActivities from '../../assets/svg/ilustrations/EmptyStates/NoPremiumActivities.svg';

type Props = {
	type: 'recipes' | 'activities';
	data: any[];
	handleOnChange: (inView: boolean, id: number) => void;
	isLoading: boolean;
	isError: boolean;
	isRefetching: boolean;
	category?: string | undefined;
	search?: string | undefined;
	messageAPI?: string;
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
	messageAPI,
}): React.JSX.Element => {
	return (
		<>
			{data.map((item: any, index: number) => (
				<InView
					className="w-full flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12"
					key={`${item.id}-${index}`}
					onChange={(inView: boolean) => handleOnChange(inView, item.id)}
				>
					<Card type={type === 'recipes' ? 'Recipe' : 'Activity'} _item_={item} />
				</InView>
			))}

			{(isLoading || isRefetching) && (
				<View className="mt-2">
					{Array.from({
						length:
							type === 'recipes'
								? config.pagination.recipes.feed.defaultLimit
								: config.pagination.activities.feed.defaultLimit,
					}).map((_, index) => (
						<View
							key={index}
							className="w-full flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12"
						>
							<LoadingSkeleton
								type={type === 'recipes' ? 'FeedRecipes' : 'FeedActivities'}
								category={category}
							/>
						</View>
					))}
				</View>
			)}

			{!isLoading &&
				!isRefetching &&
				(messageAPI === 'No Recipes Found' && search !== '' ? (
					<EmptyState
						type="NotFound"
						_ilustration_={NoRecipesIlus}
						message="No Recipes Found"
						description="Oops! It seems like we couldn't find any recipes that match your search criteria. How about exploring new culinary adventures? Your next delicious discovery is just around the corner!"
						styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
					/>
				) : messageAPI === 'No Premium Recipes Found' ||
				  messageAPI === 'No Premium Activities Found' ? (
					<EmptyState
						type="NotFound"
						_ilustration_={type === 'recipes' ? NoPremiumRecipes : NoPremiumActivities}
						message={
							type === 'recipes' ? 'No Premium Recipes Found' : 'No Premium Activities Found'
						}
						description={
							type === 'recipes'
								? " Uh-oh! It seems like your premium pursuits are still under lock and key. Haven't unlocked premium activities yet? No worries! Head over to the store to discover exclusive offerings and elevate your nourishing journey."
								: "Uh-oh! It seems like your premium pursuits are still under lock and key. Haven't unlocked premium activities yet? No worries! Head over to the store to discover exclusive offerings and elevate your fitness journey."
						}
						styleClass="pb-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12"
					/>
				) : (
					isError && (
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
