import { convertDigits } from "@dmxdev/digit-converter-multilang";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

import SectionAccordion from "../components/SectionAccordion";
import { containTranslations, tabTranslations } from "../configs";
import { useLanguage, useTheme } from "../contexts";
import versesData from "../data/verses.json";
import { calculateVerseCounts, createTextStyles } from "../utils";

const ChapterDetailScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const { chapter } = route.params;
  const verseCounts = calculateVerseCounts(versesData);
  const layout = useWindowDimensions();

  const textStyles = createTextStyles(currentLanguage);
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

  const tabLabels = tabTranslations[currentLanguage] || tabTranslations.en;

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
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 50, }}
    >
      <View
        style={[
          tw`p-6 rounded-3xl mt-6 mb-6 border border-gray-200`,
          { backgroundColor: colors.cardBg },
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
          {containTranslations(currentLanguage, convertDigits(verseCounts[chapter.chapter] || 0, currentLanguage))}
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
    </ScrollView>
  );

  const renderVersesTab = () => {
    // Ensure chapter numbers are numbers
    const currentChapterNumber = Number(chapter.chapter);

    // Filter verses for the current chapter (handle type mismatch)
    const chapterVerses = versesData.filter(
      (v) => Number(v.chapter) === currentChapterNumber
    );


    return (

      <SafeAreaView style={{ flex: 1, paddingTop: 10 }} edges={["bottom"]}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 60 }}
        >
          {chapterVerses.map((verse) => (
            <TouchableOpacity
              key={`${verse.chapter}-${verse.verse}`}
              style={[
                tw`pr-8 pl-4 py-4 mb-2 rounded-xl flex-row items-center`,
                { backgroundColor: colors.cardBg },
              ]}
              onPress={() =>
                navigation.navigate("VerseDetail", {
                  verse: { chapter: verse.chapter, number: verse.verse },
                })
              }
            >
              <View style={tw`flex-1 justify-between flex-row items-center`}>
                <Text
                  style={[
                    textStyles.text,
                    { color: colors.text },
                  ]}
                >
                  {verse.sk}
                </Text>
                <Icon
                  name="chevron-right"
                  size={24}
                  color={colors.primary}
                  style={tw`ml-2`}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

    );
  };


  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "details", title: tabLabels.details },
    { key: "verses", title: tabLabels.verses },
  ]);

  const renderScene = SceneMap({
    details: renderDetailsTab,
    verses: renderVersesTab,
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: colors.background }}
            indicatorStyle={{ backgroundColor: colors.primary, height: 2 }}
            labelStyle={{ fontWeight: "bold", fontSize: 16 }}
            activeColor={colors.primary}
            inactiveColor="#999"
            pressColor="#e0e0e0"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChapterDetailScreen;
