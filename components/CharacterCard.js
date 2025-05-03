import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLanguage, useTheme } from "../contexts";

const CharacterCard = ({ character, onPress }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.cardBg }]}
      onPress={onPress}
    >
      <Image
        source={{
          uri:
            character.image ||
            "https://e7.pngegg.com/pngimages/981/645/png-clipart-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-thumbnail.png",
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>
          {character.name[currentLanguage]}
        </Text>
        <Text style={[styles.type, { color: colors.primary }]}>
          {character.type
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Text>
        <Text
          style={[styles.role, { color: colors.secondaryText }]}
          numberOfLines={3}
        >
          {character.role[currentLanguage]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  role: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CharacterCard;
