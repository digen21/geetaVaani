import { convertDigits } from "@dmxdev/digit-converter-multilang";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Feather";
import tw from "twrnc";
import { BackButton, BackgroundImage, SectionAccordion } from "../components";
import {
  chapterImagesUrls,
  containTranslations,
  LANGUAGE_FONTS,
  sections,
  tabTranslations,
} from "../configs";
import { useLanguage, useTheme } from "../contexts";
import versesData from "../data/verses.json";
import { calculateVerseCounts, createTextStyles } from "../utils";
import VerseCard from "../components/VerseCard"; // Import at the top

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
  const tabLabels = tabTranslations[currentLanguage] || tabTranslations.en;
  const imageUrls = chapterImagesUrls[chapter.chapter];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [index, setIndex] = useState(0);
  const routes = [
    { key: "details", title: tabLabels.details },
    { key: "verses", title: tabLabels.verses },
  ];

  const renderDetailsTab = () => (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: insets.bottom + 50,
      }}
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
            textStyles.body,
          ]}
        >
          {translations.summary}
        </Text>
        <Text style={[tw`text-sm italic mt-4`, { color: colors.primary }]}>
          {containTranslations(
            currentLanguage,
            convertDigits(verseCounts[chapter.chapter] || 0, currentLanguage)
          )}
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
    const currentChapterNumber = Number(chapter.chapter);
    const chapterVerses = versesData.filter(
      (v) => Number(v.chapter) === currentChapterNumber
    );

    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 10 }} edges={["bottom"]}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 60 }}
        >
          {chapterVerses.map((verse) => (
            <VerseCard
              key={`${verse.chapter}-${verse.verse}`}
              verse={verse}
              colors={colors}
              onPress={() =>
                navigation.navigate("VerseDetail", {
                  verse: { chapter: verse.chapter, number: verse.verse },
                })
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderScene = SceneMap({
    details: renderDetailsTab,
    verses: renderVersesTab,
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Top Image Banner */}
      {
        <BackgroundImage
          source={imageUrls}
          styles={styles.imageBanner}
          resizeMode="cover"
          children={
            <View style={[styles.topOverlay, { paddingTop: insets.top + 16 }]}>
              <BackButton />
            </View>
          }
        />
      }

      {/* Tab View Below Image */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={[styles.contentCard, textStyles.body]}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              backgroundColor: colors.cardBg,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginBottom: 8,
              marginHorizontal: 8,
              elevation: 0,
              shadowOpacity: 0,
            }}
            indicatorStyle={{
              backgroundColor: colors.primary,
              height: 3,
              borderRadius: 2,
            }}
            labelStyle={{
              fontSize: 16,
              textTransform: "none",
              fontFamily: LANGUAGE_FONTS[currentLanguage].bold,
            }}
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
  imageBanner: {
    width: "100%",
    height: 230,
    justifyContent: "flex-start",
  },
  topOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  contentCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -25,
    paddingTop: 5,
  },
});

export default ChapterDetailScreen;
