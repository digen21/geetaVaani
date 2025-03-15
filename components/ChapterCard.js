import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

import { useFavorites, useLanguage, useTheme } from "../contexts";
import { createTextStyles } from "../utils";

/**
 * ChapterCard component represents a single chapter in the list.
 *
 * Displays the chapter title and the number of verses. Applies theme-based colors and styles.
 *
 * @param {{
 *   chapter: {
 *     language: string,
 *     [key: string]: { title: string },
 *     verses_count: number
 *   },
 *   onPress: () => void
 * }} props - The chapter details and the function to handle press events.
 *
 * @returns {JSX.Element} The ChapterCard component.
 */
const ChapterCard = ({ chapter, onPress }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const textStyles = createTextStyles(currentLanguage);

  // Get the translations for the current language
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
      style={[
        tw`p-4 mb-4 rounded-xl shadow-lg`,
        {
          backgroundColor: colors.cardBg,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    >
      <View style={tw`flex-row justify-between items-start`}>
        <View style={tw`flex-1`}>
          <Text
            style={[tw`text-lg`, textStyles.heading2, { color: colors.text }]}
          >
            {translations.title.split(":")[0]}:{" "}
            {translations.title.split(":")[1].split("-").join(" ")}
          </Text>
          <Text style={[tw`text-sm mt-2`, { color: colors.primary }]}>
            {chapter.verses_count} Verses
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
            size={24}
            color={HEART_COLOR}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ChapterCard;
