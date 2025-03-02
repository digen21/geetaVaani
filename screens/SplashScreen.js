// components/SplashScreen.js
import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  const maskAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(maskAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navigate after animation
    setTimeout(() => {
      navigation.replace("Chapters");
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      {/* Base Text */}
      <Text style={styles.text}>GitaVaani – "The Voice of the Gita"</Text>

      {/* Animated Mask */}
      <Animated.View
        style={[
          styles.mask,
          {
            transform: [
              {
                translateX: maskAnim.interpolate({
                  inputRange: [-100, 100],
                  outputRange: ["-100%", "100%"],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={[styles.text, styles.maskText]}>GitaVaani</Text>
        <Text style={[styles.text, styles.maskText]}>
          The Voice of the Gita
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A237E",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  mask: {
    position: "absolute",
    backgroundColor: "#FFD700",
    overflow: "hidden",
  },
  maskText: {
    color: "#1A237E",
  },
});

export default SplashScreen;
