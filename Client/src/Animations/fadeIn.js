import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const useFadeInAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return fadeAnim;
};
