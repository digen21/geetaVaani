import { MaterialIcons } from "@expo/vector-icons";
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

import { BackButton } from "../components";
import { useTheme } from "../contexts";

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
      {/* <BackButton /> */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.appName, { color: colors.textColor }]}>
          GeetaVaani
        </Text>
        <Text style={[styles.version, { color: colors.textColor }]}>
          Version 1.0.0
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.textColor }]}>
          About the App
        </Text>
        <Text style={[styles.sectionText, { color: colors.textColor }]}>
          GeetaVaani is a spiritual companion that brings the timeless wisdom of
          the Bhagavad Gita to your fingertips. With translations in multiple
          Indian languages, verse explanations, and an intuitive interface, we
          aim to make the sacred text accessible to everyone.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.textColor }]}>
          Features
        </Text>
        <View style={styles.featureList}>
          {[
            "Multiple language translations",
            "Verse-by-verse commentary",
            "Bookmark favorite verses",
            "Track reading progress",
            "Dark/Light theme support",
            "Offline access",
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <MaterialIcons
                name="check-circle"
                size={24}
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
          <MaterialIcons name="email" size={24} color={colors.primary} />
          <Text style={[styles.contactText, { color: colors.textColor }]}>
            support@geetavaani.com
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => openLink("https://geetavaani.com")}
        >
          <MaterialIcons name="web" size={24} color={colors.primary} />
          <Text style={[styles.contactText, { color: colors.textColor }]}>
            www.geetavaani.com
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  version: {
    fontSize: 16,
    opacity: 0.7,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine: "underline",
  },
});

export default AboutScreen;
