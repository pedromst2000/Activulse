import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../Icon';

type HomeCardProps = {
	type?: 'HealthListCard';
	title: string;
	description?: string;
	icon: any;
	onPress?: () => void;
};

const HomeCard: React.FC<HomeCardProps> = ({
	type,
	title,
	description,
	icon,
	onPress,
}: HomeCardProps): React.JSX.Element => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className={`flex justify-center items-center shadow-lg mb-4 px-2 py-2 w-full ${type === 'HealthListCard' ? 'py-10' : ''}`}
			onPress={onPress}
		>
			<View
				className={`rounded-2xl ${type === 'HealthListCard' ? 'w-[180px]' : 'w-[330px]'}`}
				style={{
					shadowColor: '#000',
					shadowOpacity: 0.25,
					shadowRadius: 4.84,
					elevation: 48,
				}}
			>
				<LinearGradient
					colors={['#EFF6FF', '#F7D7BA', '#FFB875']}
					start={[0, 0]}
					end={[0, 1]}
					locations={[0, 0.5, 1]}
					className="rounded-[30px] p-5 justify-center items-center"
				>
					<View className="flex-row items-center">
						<View className="mr-4">
							<Icon icon={icon} width={70} height={70} />
						</View>
						{type === 'HealthListCard' ? (
							<View className="w-[180px]">
								<Text className="text-[18px] md:text-xl lg:text-2xl font-merriweather-bold text-center text-secondary-700">
									{title}
								</Text>
							</View>
						) : (
							<View className="w-[220px]">
								<Text className="text-[18px] font-merriweather-bold text-secondary-700">
									{title}
								</Text>
								{description && (
									<Text className="text-[14px] text-secondary-700 mt-2 font-quicksand-medium">
										{description}
									</Text>
								)}
							</View>
						)}
					</View>
				</LinearGradient>
			</View>
		</TouchableOpacity>
	);
};

export default HomeCard;
