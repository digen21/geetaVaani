// screens/ChapterDetailScreen.js
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

import { Header } from "../components";
import { useLanguage, useTheme } from "../contexts";

const ChapterDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const { chapter } = route.params;

  // Get translations for current language
  const translations = chapter[currentLanguage] || chapter.en;

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
        },
      ]}
      contentContainerStyle={{
        paddingTop: 130,
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
    >
      <Header showBackButton onBackPress={() => navigation.goBack()} />
      <View
        style={[tw`p-6 rounded-2xl mb-4`, { backgroundColor: colors.cardBg }]}
      >
        {/* Chapter Number */}
        <Text
          style={[
            tw`text-2xl font-bold mb-2 text-center`,
            { color: colors.text },
          ]}
        >
          {translations.title.split(":")[0]?.trim()}
        </Text>

        {/* Chapter Title */}
        <Text
          style={[
            tw`text-3xl font-semibold mt-1 mb-4 text-center`,
            {
              color: colors.primary,
              flexShrink: 1, // Prevent parent from shrinking
              flexWrap: "nowrap", // Explicitly disable wrapping
              includeFontPadding: false, // Remove extra font padding
            },
          ]}
          numberOfLines={1} // Force single line
          ellipsizeMode="tail" // Add ... when truncated
        >
          {translations.title.split(":")[1]?.trim()}
        </Text>

        {/* Chapter Summary */}
        <Text style={[tw`text-lg leading-6 pt-4`, { color: colors.text }]}>
          {translations.summary}
        </Text>

        {/* Verse Count */}
        <Text style={[tw`text-sm italic mt-4`, { color: colors.primary }]}>
          Contains {chapter.verses_count} Sacred Verses
        </Text>
      </View>

      <TouchableOpacity
        style={[
          tw`absolute top-4 left-4 z-10 p-2 rounded-full`,
          { backgroundColor: colors.primary + "20" },
        ]}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      {/* Add more details like verse list or navigation buttons here */}
    </ScrollView>
  );
};

export default ChapterDetailScreen;
