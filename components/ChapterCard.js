import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

import { useLanguage, useTheme } from "../contexts";

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

  // Get the translations for the current language
  const translations = chapter[currentLanguage] || chapter.en;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`p-4 mb-4 rounded-xl shadow-lg`,
        {
          backgroundColor: colors.cardBg,
          // shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    >
      <Text style={[tw`text-lg font-bold`, { color: colors.text }]}>
        {translations.title.split(":")[0]}:{" "}
        {translations.title.split(":")[1].split("-").join(" ")}
      </Text>

      <Text style={[tw`text-sm mt-2`, { color: colors.primary }]}>
        {chapter.verses_count} Verses
      </Text>
    </TouchableOpacity>
  );
};

export default ChapterCard;
