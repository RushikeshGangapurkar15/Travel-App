import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const useZoomInAnimation = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const handleImagePress = () => {
      Animated.spring(scaleValue, {
        toValue: 1.05,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    const handleImageRelease = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return { scaleValue, handleImagePress, handleImageRelease };
  }, []);

  return scaleValue;
};
