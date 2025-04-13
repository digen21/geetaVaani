import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme, useLanguage } from "../contexts";
import { Header } from "../components";

const screenWidth = Dimensions.get("window").width;

const CharacterDetail = ({ route }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const { character } = route.params;
  const { name, role, type, image } = character;

  const defaultImage =
    "https://e7.pngegg.com/pngimages/981/645/png-clipart-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-thumbnail.png";

  const formattedType = type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <LinearGradient
      colors={[colors.background, "#fff8e1"]}
      style={styles.container}
    >
      <Header title={name[currentLanguage]} showBackButton />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Character Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image || defaultImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Character Name */}
        <Text style={[styles.name, { color: colors.text }]}>
          {name[currentLanguage]}
        </Text>

        {/* Decorative Divider */}
        <View style={styles.divider} />

        {/* Type Badge */}
        <View style={[styles.typeBadge, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="auto-awesome" size={20} color="#fff" />
          <Text style={styles.typeText}>{formattedType}</Text>
        </View>

        {/* Role Panel */}
        <View style={[styles.rolePanel, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.panelTitle, { color: colors.primary }]}>
            {currentLanguage === "en" ? "Character Role" : "चरित्र भूमिका"}
          </Text>
          <Text style={[styles.roleText, { color: colors.text }]}>
            {role[currentLanguage]}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  imageContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#e0c97f",
    padding: 6,
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  divider: {
    width: screenWidth * 0.6,
    height: 2,
    backgroundColor: "#d4af37",
    marginVertical: 16,
    borderRadius: 10,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 24,
  },
  typeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  rolePanel: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  roleText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});

export default CharacterDetail;
