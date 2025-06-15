import React, { useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HEART_COLOR = "#FF3B30";
const SPARKLE_COLORS = ["#FFD700", "#FF69B4", "#00E6FF", "#FFB300", "#B388FF"];
const sparkleAngles = [
  0,
  Math.PI / 3,
  (2 * Math.PI) / 3,
  Math.PI,
  (4 * Math.PI) / 3,
  (5 * Math.PI) / 3,
];

// Sparkle Component - starts from exact center of heart and pops outward
const Sparkle = ({ anim, angle, color }) => {
  const opacity = anim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 1, 0.5, 0],
  });

  const distance = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const x = distance.interpolate({
    inputRange: [0, 20],
    outputRange: [0, Math.cos(angle) * 20],
  });

  const y = distance.interpolate({
    inputRange: [0, 20],
    outputRange: [0, Math.sin(angle) * 20],
  });

  const scale = anim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 1.5, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: [
          { translateX: x },
          { translateY: y },
          { scale },
          { translateX: -12 }, // half of emoji width
          { translateY: -12 }, // half of emoji height
        ],
        opacity,
      }}
    >
      <Text style={{ color, fontSize: 16 }}>✨</Text>
    </Animated.View>
  );
};

const AnimatedFavoriteIcon = ({ isFav, onToggle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    sparkleAnim.setValue(0);
    Animated.timing(sparkleAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    onToggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={{
        position: "relative",
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {sparkleAngles.map((angle, i) => (
        <Sparkle
          key={i}
          anim={sparkleAnim}
          angle={angle}
          color={SPARKLE_COLORS[i % SPARKLE_COLORS.length]}
        />
      ))}

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <MaterialIcons
          name={isFav ? "favorite" : "favorite-border"}
          size={24}
          color={HEART_COLOR}
        />
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedFavoriteIcon;
