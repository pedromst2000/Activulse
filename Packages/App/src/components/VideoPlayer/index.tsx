import React, { useEffect, useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';

type Props = {
	videoSrc?: string | null;
};

/**
 * TODO:
 * 1. Checking the performance of the video (buffering, loading time, etc.)
 */

const VideoPlayer: React.FC<Props> = ({ videoSrc = null }): React.JSX.Element => {
	const [videoSource, setVideoSource] = useState<string | null>(videoSrc);

	useEffect(() => {
		setVideoSource(videoSrc);
	}, [videoSrc]);

	const player = useVideoPlayer(videoSource, (player) => {
		player.loop = true;
		player.play();
	});

	return (
		<View className="flex-1">
			{videoSrc ? (
				<View className="flex-1 justify-center items-center">
					<VideoView
						className="w-full h-[265px] mt-[100px]"
						player={player}
						allowsFullscreen
						allowsPictureInPicture
						contentFit="cover"
					/>
				</View>
			) : null}
		</View>
	);
};

export default VideoPlayer;
