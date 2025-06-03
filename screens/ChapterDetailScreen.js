import { convertDigits } from "@dmxdev/digit-converter-multilang";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

import { Header, SectionAccordion, TabView } from "../components";
import { tabTranslations } from "../configs";
import { useLanguage, useTheme } from "../contexts";
import versesData from "../data/verses.json";
import { calculateVerseCounts, createTextStyles } from "../utils";

const ChapterDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const { chapter } = route.params;
  const verseCounts = calculateVerseCounts(versesData);

  const textStyles = createTextStyles(currentLanguage);
  const [activeTab, setActiveTab] = useState(0);

  const [openSections, setOpenSections] = useState({
    teachings: false,
    tips: false,
    learnings: false,
  });

  const translations = chapter[currentLanguage] || chapter.en;

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getTabLabels = () => {
    const translations = tabTranslations[currentLanguage] || tabTranslations.en;
    return [{ label: translations.details }, { label: translations.verses }];
  };

  const sections = [
    {
      key: "teachings",
      titleKey: "mainTeachings",
      contentKey: "main_teachings",
    },
    {
      key: "tips",
      titleKey: "practicalTips",
      contentKey: "practical_tips",
    },
    {
      key: "learnings",
      titleKey: "whatWeCanLearn",
      contentKey: "what_we_can_learn",
    },
  ];

  const renderDetailsTab = () => (
    <View>
      <View
        style={[
          tw`p-6 rounded-3xl mb-6 border border-gray-200`,
          {
            backgroundColor: colors.cardBg,
          },
        ]}
      >
        <Text
          style={[
            tw`text-3xl font-bold mb-2 text-center`,
            textStyles.heading1,
            { color: colors.text },
          ]}
        >
          {translations.title?.includes(":")
            ? translations.title.split(":")[0]?.trim()
            : translations.title ?? ""}
        </Text>

        <Text
          style={[
            tw`text-3xl mt-1 mb-4 text-center`,
            textStyles.heading1,
            {
              color: colors.primary,
              flexShrink: 1,
              flexWrap: "nowrap",
              includeFontPadding: false,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {translations.title?.includes(":")
            ? translations.title.split(":")[1]?.trim()
            : ""}
        </Text>

        <Text
          style={[
            tw`leading-6 pt-4`,
            { color: colors.text, lineHeight: 30 },
            textStyles.heading3,
          ]}
        >
          {translations.summary}
        </Text>

        <Text style={[tw`text-sm italic mt-4`, { color: colors.primary }]}>
          Contains{" "}
          {convertDigits(verseCounts[chapter.chapter] || 0, currentLanguage)}{" "}
          Sacred Verses
        </Text>
      </View>

      <SectionAccordion
        sections={sections}
        openSections={openSections}
        toggleSection={toggleSection}
        translations={translations}
        colors={colors}
        textStyles={textStyles}
      />
    </View>
  );

  const renderVersesTab = () => (
    <View>
      {Array.from({ length: chapter.verses_count }, (_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            tw`p-4 mb-2 rounded-xl flex-row items-center`,
            {
              backgroundColor: colors.cardBg,
            },
          ]}
          onPress={() =>
            navigation.navigate("VerseDetail", {
              verse: {
                chapter: chapter.chapter,
                number: index + 1,
              },
            })
          }
        >
          <Text
            style={[
              tw`text-lg flex-1`,
              textStyles.heading3,
              { color: colors.text },
            ]}
          >
            Verse {index + 1}
          </Text>
          <Icon
            name="chevron-right"
            size={24}
            color={colors.primary}
            style={tw`ml-2`}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header showBackButton onBackPress={() => navigation.goBack()} />

      <View
        style={{
          marginTop: 130,
          flex: 1,
        }}
      >
        <TabView
          tabs={getTabLabels()}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <ScrollView
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 32,
          }}
        >
          {activeTab === 0 ? renderDetailsTab() : renderVersesTab()}
        </ScrollView>
      </View>
    </View>
  );
};

export default ChapterDetailScreen;
