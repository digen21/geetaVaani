import { convertDigits } from "@dmxdev/digit-converter-multilang";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { verseTranslations } from "../configs";
import { useFavorites, useLanguage } from "../contexts";
import { createTextStyles } from "../utils";

const ChapterCard = ({ chapter, verseCount, onPress }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const HEART_COLOR = "#FF3B30";
  const chapterId = `chapter_${chapter.chapter}`;

  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);

  if (!chapter || !chapter[currentLanguage]) {
    return null; // or handle the error as neededq
  }
  const translations = chapter[currentLanguage] || chapter.en;
  const favorite = isFavorite(chapterId);
  const handleFavoritePress = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(chapterId);
    } else {
      addFavorite({
        id: chapterId,
        type: "chapter",
        chapter: chapter.chapter,
        number: chapter.chapter,
        title: translations.title,
        ...chapter,
      });
    }
  };

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#00000005", borderless: false }}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.cardBg, opacity: pressed ? 0.95 : 1 },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={[{ color: colors.text }, textStyles.body]}>
            {translations.title?.includes(":")
              ? translations.title?.split(":")[0]
              : translations.title ?? ""}
            {translations.title?.includes(":")
              ? `: ${translations.title?.split(":")[1]?.split("-").join(" ")}`
              : ""}
          </Text>
          <Text style={[styles.verseText, { color: colors.primary }]}>
            {`${
              verseTranslations[currentLanguage] || "Verses"
            }: ${convertDigits(verseCount, currentLanguage)}`}
          </Text>
        </View>
        <Pressable
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name={favorite ? "favorite" : "favorite-border"}
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
    marginBottom: 8,
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
