import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

type Props = {
    current: number;
    total: number;
};

const ProgressBar = ({ current, total }: Props): React.JSX.Element => {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const newProgress = (current / total) * 100;
        Animated.timing(progress, {
            toValue: newProgress,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [current, total]);

    const width = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View className="flex flex-row items-center justify-center w-full px-4 py-2 sm:px-8 sm:py-4 mt-8">
            <View className="w-[180px] h-[12px] bg-secondary-50 rounded-full">
                <Animated.View
                    className="h-[12px] bg-secondary-700 rounded-full"
                    style={{ width }}
                />
            </View>
        </View>
    );
};

export default ProgressBar;