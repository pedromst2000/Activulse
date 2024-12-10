import React from 'react';
import { Text, View } from 'react-native';

type LinkProps = {
	type: 'Long' | 'Short' | 'Reference';
	message?: string;
	boldMessage?: string;
	onPress?: () => void;
	styleClass?: string;
	refNumber?: string;
	refAuthor?: string;
	refTitle?: string;
	refYear?: string;
	refPublication?: string;
	refVolume?: string;
	refIssue?: string;
	refPages?: string;
	refId?: string;
};

const Link: React.FC<LinkProps> = ({
	type,
	message,
	boldMessage,
	onPress,
	styleClass,
	refNumber,
	refAuthor,
	refTitle,
	refYear,
	refPublication,
	refVolume,
	refIssue,
	refPages,
	refId,
}): React.JSX.Element => {
	const renderShortOrLongLink = () => (
		<View className={`flex flex-row justify-between items-center ${styleClass}`}>
			<Text
				onPress={onPress}
				className="font-quicksand-semi-bold text-secondary-700 underline sm:text-base md:text-lg lg:text-xl"
			>
				{type === 'Short' ? (
					message
				) : (
					<>
						{message}{' '}
						<Text className="font-quicksand-bold sm:text-base md:text-lg lg:text-xl">
							{boldMessage}
						</Text>
					</>
				)}
			</Text>
		</View>
	);

	const renderReferenceLink = () => (
		<View className={styleClass}>
			<Text
				className="font-quicksand-medium text-secondary-700 underline sm:text-sm md:text-base lg:text-lg w-full text-justify leading-6"
				onPress={onPress}
			>
				<Text className="font-quicksand-bold sm:text-sm md:text-base lg:text-lg">
					{refNumber}
				</Text>
				{refAuthor}
				{refTitle}
				{refPublication}
				{refYear}
				{refVolume}
				{refIssue}
				{refPages}
				{refId}
			</Text>
		</View>
	);

	return (
		<>
			{(type === 'Short' || type === 'Long') && renderShortOrLongLink()}
			{type === 'Reference' && renderReferenceLink()}
		</>
	);
};

export default Link;
