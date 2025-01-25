import React from 'react';
import { View, Image } from 'react-native';
import VideoPlayer from '../VideoPlayer';

type Props = {
	type: 'image' | 'video';
	imgSrc?: string | null;
	videoSrc?: string | null;
	videoLength?: number | null;
};

const DetailsMedia: React.FC<Props> = ({ type, imgSrc, videoSrc }): React.JSX.Element => {
	return (
		<>
			{type === 'image' && imgSrc ? (
				<View>
					<Image
						className="w-full h-[330px] sm:h-[250px] md:h-[320px] lg:h-[350px] xl:h-[400px] object-cover
									absolute mt-[28px] z-0 sm:mt-[20px] md:mt-[28px] lg:mt-[32px] xl:mt-[40px] mt-[-55px] sm:mt-[-40px] md:mt-[-55px] lg:mt-[-60px] xl:mt-[-70px]
								"
						source={{ uri: imgSrc }}
					/>
					{/* Dark Overlay */}
					<View
						className="absolute w-full h-[330px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] bg-neutral-700 opacity-[0.25] mt-[-55px]
							sm:mt-[-40px] md:mt-[-55px] lg:mt-[-60px] xl:mt-[-70px]
						"
					/>
				</View>
			) : (
				<View
					className="w-full h-[330px] sm:h-[250px] md:h-[320px] lg:h-[350px] xl:h-[400px] object-cover
										absolute mt-[28px] z-0 sm:mt-[20px] md:mt-[28px] lg:mt-[32px] xl:mt-[40px] mt-[-55px] sm:mt-[-40px] md:mt-[-55px] lg:mt-[-60px] xl:mt-[-70px]
									"
				>
					<VideoPlayer videoSrc={videoSrc} />
				</View>
			)}
		</>
	);
};

export default DetailsMedia;
