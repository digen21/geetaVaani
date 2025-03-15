// screens/ChapterDetailScreen.js
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

import { AccordionItem, Header } from "../components";
import { useLanguage, useTheme } from "../contexts";
import { useLanguageFont } from "../hooks";
import { createTextStyles } from "../utils";

const ChapterDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const { chapter } = route.params;
  const { width } = useWindowDimensions();
  const textStyles = createTextStyles(currentLanguage);

  const [openSections, setOpenSections] = useState({
    teachings: false,
    tips: false,
    learnings: false,
  });

  // Get translations for current language
  const translations = chapter[currentLanguage] || chapter.en;

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
            textStyles.heading1,
            { color: colors.text },
          ]}
        >
          {translations.title.split(":")[0]?.trim()}
        </Text>

        {/* Chapter Title */}
        <Text
          style={[
            tw`text-3xl mt-1 mb-4 text-center`,
            textStyles.heading1,
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
        <Text
          style={[
            tw`leading-6 pt-4`,
            { color: colors.text, lineHeight: 28 },
            textStyles.heading3,
          ]}
        >
          {translations.summary}
        </Text>

        {/* Verse Count */}
        <Text style={[tw`text-sm italic mt-4`, { color: colors.primary }]}>
          Contains {chapter.verses_count} Sacred Verses
        </Text>
      </View>

      {/* Accordions */}
      <AccordionItem
        title="Main Teachings"
        content={translations.main_teachings}
        isOpen={openSections.teachings}
        onPress={() => toggleSection("teachings")}
        colors={colors}
        fontStyle={textStyles.heading3}
      />

      <AccordionItem
        title="Practical Tips"
        content={translations.practical_tips}
        isOpen={openSections.tips}
        onPress={() => toggleSection("tips")}
        colors={colors}
        fontStyle={textStyles.heading3}
      />

      <AccordionItem
        title="What We Can Learn"
        content={translations.what_we_can_learn}
        isOpen={openSections.learnings}
        onPress={() => toggleSection("learnings")}
        colors={colors}
        fontStyle={textStyles.heading3}
      />

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
