import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BackButton, GradientText } from "../components";
import { useTheme } from "../contexts";

const featureList = [
  "Multiple language translations",
  "Verse-by-verse commentary",
  "Bookmark favorite verses",
  "Track reading progress",
  "Dark/Light theme support",
  "Offline access",
];

const AboutScreen = () => {
  const { colors } = useTheme();

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening link:", error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <BackButton />
      <BlurView
        intensity={50}
        tint="systemThinMaterial"
        style={styles.blurContainer}
      >
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <GradientText text={"GitaVaani"} />
          <Text style={[styles.version, { color: colors.textColor }]}>
            Version 1.0.0
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textColor }]}>
            About the App
          </Text>
          <Text style={[styles.sectionText, { color: colors.textColor }]}>
            GitaVaani is a spiritual companion that brings the timeless wisdom
            of the Bhagavad Gita to your fingertips. With translations in
            multiple Indian languages, verse explanations, and an intuitive
            interface, we aim to make the sacred text accessible to everyone.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textColor }]}>
            Features
          </Text>
          <View style={styles.featureList}>
            {featureList.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons
                  name="check-circle"
                  size={22}
                  color={colors.primary}
                />
                <Text style={[styles.featureText, { color: colors.textColor }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textColor }]}>
            Contact Us
          </Text>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => openLink("mailto:support@geetavaani.com")}
          >
            <MaterialIcons name="email" size={22} color={colors.primary} />
            <Text style={[styles.contactText, { color: colors.textColor }]}>
              support@geetavaani.com
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => openLink("https://geetavaani.com")}
          >
            <MaterialIcons name="web" size={22} color={colors.primary} />
            <Text style={[styles.contactText, { color: colors.textColor }]}>
              www.geetavaani.com
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    overflow: "hidden",
    paddingTop: 30,
    padding: 12,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 18,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  version: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.6,
  },
  sectionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    marginLeft: 10,
    opacity: 0.85,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  contactText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "500",
    color: "#007AFF",
  },
});

export default AboutScreen;
