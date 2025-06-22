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

import { BackButton, GradientText, TopBar } from "../components";
import { useLanguage, useTheme } from "../contexts";
import { createTextStyles } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { profileTranslations } from "../configs";
import { useNavigation } from "@react-navigation/native";

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
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation();
  const textStyles = createTextStyles(currentLanguage);

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening link:", error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar
        title={profileTranslations[currentLanguage].aboutApp}
        onBack={() => navigation.goBack()}
        textStyle={[{ color: colors.textPrimary }, textStyles.heading3]}
      />
      <ScrollView showsVerticalScrollIndicator={true}>
        <BlurView
          intensity={50}
          tint="systemThinMaterial"
          style={styles.blurContainer}
        >
          <View
            style={[styles.headerContainer, { backgroundColor: colors.cardBg }]}
          >
            <Image
              source={require("../assets/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <GradientText text={"GitaVaani"} />
            <Text
              style={[styles.version, textStyles.text, { color: colors.text }]}
            >
              Version 1.0.0
            </Text>
          </View>

          <View
            style={[
              styles.sectionContainer,
              { backgroundColor: colors.cardBg },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                textStyles.text,
                { color: colors.text },
              ]}
            >
              About the App
            </Text>
            <Text
              style={[
                styles.sectionText,
                textStyles.text,
                { color: colors.text },
              ]}
            >
              GitaVaani is a spiritual companion that brings the timeless wisdom
              of the Bhagavad Gita to your fingertips. With translations in
              multiple Indian languages, verse explanations, and an intuitive
              interface, we aim to make the sacred text accessible to everyone.
            </Text>
          </View>

          <View
            style={[
              styles.sectionContainer,
              { backgroundColor: colors.cardBg },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                textStyles.text,
                { color: colors.text },
              ]}
            >
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
                  <Text
                    style={[
                      styles.featureText,
                      textStyles.text,
                      { color: colors.text },
                    ]}
                  >
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={[
              styles.sectionContainer,
              { backgroundColor: colors.cardBg },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                textStyles.text,
                { color: colors.text },
              ]}
            >
              Contact Us
            </Text>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => openLink("mailto:support@geetavaani.com")}
            >
              <MaterialIcons name="email" size={22} color={colors.primary} />
              <Text
                style={[
                  styles.contactText,
                  textStyles.text,
                  { color: colors.text },
                ]}
              >
                support@geetavaani.com
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => openLink("https://geetavaani.com")}
            >
              <MaterialIcons name="web" size={22} color={colors.primary} />
              <Text
                style={[
                  styles.contactText,
                  textStyles.text,
                  { color: colors.text },
                ]}
              >
                www.geetavaani.com
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </SafeAreaView>
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
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
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
