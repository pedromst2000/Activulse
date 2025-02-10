import { View } from 'react-native';
import Button from '../../Button';
import Icon from '../../Icon';
import pauseI from '../../../assets/svg/icons/PauseIcon.svg';
import playI from '../../../assets/svg/icons/PlayIcon.svg';

type Props = {
	isPause: boolean;
	isFinished: boolean;
	onPress: () => void;
};

const Switch: React.FC<Props> = ({ isPause, isFinished, onPress }): React.JSX.Element => {
	return (
		<View>
			<Button disabled={isFinished} isRounded={true} onPress={onPress}>
				<Icon icon={isPause ? playI : pauseI} width={24} height={24} />
			</Button>
		</View>
	);
};

export default Switch;
