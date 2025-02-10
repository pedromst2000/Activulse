import React from 'react';
import { View } from 'react-native';
import Switch from './Switch';
import Restart from './Restart';
import SoundAlarm from './SoundAlarm';

type Props = {
	isSoundOn: boolean;
	isPause: boolean;
	isFinished: boolean;
	currentTime: number;
	handleRestart: () => void;
	handleSound: () => void;
	handleSwitch: () => void;
};

/**
 *
 * @function ControllersTimer
 * @description This component is reusable for the timer controllers of one Activity in the Fitness Activity screen when toogle the 'Start Activity' button
 * @returns {React.JSX.Element}
 */

const ControllersTimer: React.FC<Props> = ({
	isSoundOn,
	isPause,
	isFinished,
	currentTime,
	handleRestart,
	handleSound,
	handleSwitch,
}): React.JSX.Element => {
	return (
		<View className="flex-row justify-between items-center gap-12 pt-10 ">
			<View>
				<Restart onPress={handleRestart} currentTime={currentTime} />
			</View>
			<View>
				<Switch onPress={handleSwitch} isPause={isPause} isFinished={isFinished} />
			</View>
			<View>
				<SoundAlarm onPress={handleSound} isSoundOn={isSoundOn} />
			</View>
		</View>
	);
};

export default ControllersTimer;
