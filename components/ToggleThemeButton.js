import { View, TouchableOpacity, Animated } from "react-native";
import { useEffect, useRef } from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts";

const ToggleThemeButton = ({ style }) => {
  const { isDark, toggleTheme } = useTheme();
  const translateX = useRef(new Animated.Value(isDark ? 26 : 2)).current;

  // Animate toggle knob movement
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isDark ? 22 : 2, // move knob from left to right
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      style={[
        tw`w-14 h-8 rounded-full justify-center`,
        {
          backgroundColor: isDark ? "#1f1f1f" : "#ddd",
          paddingHorizontal: 2,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          tw`w-7 h-7 rounded-full items-center justify-center`,
          {
            backgroundColor: isDark ? "#FFD700" : "#fff",
            transform: [{ translateX }],
          },
        ]}
      >
        <Ionicons
          name={isDark ? "sunny" : "moon"}
          size={18}
          color={isDark ? "#1f1f1f" : "#333"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ToggleThemeButton;
