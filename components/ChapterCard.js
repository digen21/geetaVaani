import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { verseTranslations } from "../configs";
import { useFavorites, useLanguage } from "../contexts";
const ChapterCard = ({ chapter, onPress }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const translations = chapter[currentLanguage] || chapter.en;
  const HEART_COLOR = "#FF3B30";

  const handleFavoritePress = (e) => {
    e.stopPropagation();
    const chapterId = `chapter_${chapter.chapter}`;
    if (isFavorite(chapterId)) {
      removeFavorite(chapterId);
    } else {
      addFavorite({
        id: chapterId,
        type: "chapter",
        number: chapter.chapter,
        title: translations.title,
        ...chapter,
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.card, { backgroundColor: colors.cardBg }]}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, { color: colors.text }]}>
            {translations.title.split(":")[0]}:{" "}
            {translations.title.split(":")[1]?.split("-").join(" ")}
          </Text>
          <Text style={[styles.verseText, { color: colors.primary }]}>
            {verseTranslations[currentLanguage] || "Verses"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name={
              isFavorite(`chapter_${chapter.chapter}`)
                ? "favorite"
                : "favorite-border"
            }
            size={22}
            color={HEART_COLOR}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  verseText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#007AFF", // iOS blue
    opacity: 0.9,
  },
});

export default ChapterCard;
