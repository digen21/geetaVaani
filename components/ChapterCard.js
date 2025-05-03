import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#00000005", borderless: false }} // android ripple effect
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.cardBg, opacity: pressed ? 0.95 : 1 },
      ]}
      
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
        <Pressable
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
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 100,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    justifyContent: "center",
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
    color: "#007AFF",
    opacity: 0.9,
  },
});

export default ChapterCard;
