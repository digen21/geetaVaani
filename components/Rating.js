import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts";
import tw from "twrnc";

const Rating = ({ rating, setRating, size = 30, disabled = false }) => {
  const { colors } = useTheme();
  const stars = [1, 2, 3, 4, 5];

  const starColor = {
    filled: "#FFD700", // Golden yellow
    empty: "#D3D3D3", // Light gray
  };

  const starAnimation = new Animated.Value(1);

  const animateStar = () => {
    Animated.sequence([
      Animated.timing(starAnimation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(starAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleStarPress = (starValue) => {
    if (!disabled) {
      setRating(starValue);
      animateStar();
    }
  };

  return (
    <View style={tw`flex-row justify-center items-center`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handleStarPress(star)}
          disabled={disabled}
          style={tw`p-1`}
        >
          <Animated.View
            style={{
              transform: [{ scale: rating >= star ? starAnimation : 1 }],
            }}
          >
            <MaterialIcons
              name={rating >= star ? "star" : "star-outline"}
              size={size}
              color={rating >= star ? starColor.filled : starColor.empty}
              style={styles.star}
            />
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Rating;
