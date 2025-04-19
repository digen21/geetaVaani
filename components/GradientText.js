import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text } from "react-native";

const defaultColors = ["#4facfe", "#8e44ad", "#ff6a6a"];
const GradientText = ({ text = "GitaVaani", colors = defaultColors }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.appName, { backgroundColor: "transparent" }]}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.appName, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: -0.5,
    textAlign: "center",
  },
});

export default GradientText;
