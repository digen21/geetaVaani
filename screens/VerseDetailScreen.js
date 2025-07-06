import { convertDigits } from "@dmxdev/digit-converter-multilang";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "twrnc";

import { TopBar } from "../components";
import {
  chapterVersesTranslations,
  commentaryTranslations,
  LANGUAGE_FONTS,
  translations,
} from "../configs";
import { useLanguage, useTheme } from "../contexts";
import versesData from "../data/verses.json";
import { useReadVerses } from "../hooks";
import { createTextStyles } from "../utils";

/**
 * VerseDetailScreen displays detailed information about a specific verse,
 * including its Sanskrit text, translation, and optional commentary.
 *
 * @component
 * @param {object} props - Component props.
 * @param {object} props.route - React Navigation route object containing params.
 * @param {object} props.route.params - Parameters passed to the screen.
 * @param {object} props.route.params.verse - The verse object with chapter and number.
 * @param {object} props.navigation - React Navigation navigation object.
 * @returns {JSX.Element} The rendered verse detail screen.
 */
const VerseDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { markAsRead, isRead, markUnread } = useReadVerses();
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const { verse } = route.params;

  const currentChapter = Number(verse.chapter);
  const currentVerse = Number(verse.number);

  // Find the next verse in the data
  let nextVerseObj = versesData.find(
    (v) =>
      (Number(v.chapter) === currentChapter &&
        Number(v.verse) === currentVerse + 1) ||
      (Number(v.chapter) === currentChapter + 1 && Number(v.verse) === 1)
  );

  const hasNext = !!nextVerseObj;

  // Find the previous verse in the data
  let prevVerseObj = versesData
    .slice()
    .reverse()
    .find(
      (v) =>
        (Number(v.chapter) === currentChapter &&
          Number(v.verse) === currentVerse - 1) ||
        (Number(v.chapter) === currentChapter - 1 &&
          Number(v.verse) ===
            Math.max(
              ...versesData
                .filter((vv) => Number(vv.chapter) === currentChapter - 1)
                .map((vv) => Number(vv.verse))
            ))
    );

  const hasPrev = !!prevVerseObj;

  // Find the verse object
  const verseObj = versesData.find(
    (v) =>
      Number(v.chapter) === Number(verse.chapter) &&
      Number(v.verse) === Number(verse.number)
  );

  // Fallbacks for missing data
  const sk = verseObj?.sk || "—";
  const langData =
    verseObj?.languages?.[currentLanguage] || verseObj?.languages?.en || {};
  const translation = langData.translation || "Translation not available";
  const commentary = langData.commentary || "";
  const summary = langData.summary || "";

  // Title for the verse (forcefully convert all parts to string)
  const verseTitle = `${
    chapterVersesTranslations.chapter?.[currentLanguage]
  } ${convertDigits(verse.chapter, currentLanguage)} ${
    chapterVersesTranslations.verse?.[currentLanguage]
  } ${convertDigits(verse.number, currentLanguage)}`;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingBottom: 25 },
      ]}
      edges={["top", "bottom"]}
    >
      <TopBar
        title={verseTitle}
        textStyle={[{ color: colors.textPrimary }, textStyles.heading3]}
        onBack={() => navigation.goBack()}
      />

      <View
        style={{
          marginTop: 24,
          marginBottom: 20,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {hasPrev ? (
          <Icon
            name="arrow-left"
            size={24}
            onPress={() => {
              navigation.replace("VerseDetail", {
                verse: {
                  chapter: prevVerseObj.chapter,
                  number: prevVerseObj.verse,
                },
              });
            }}
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 24,
              fontWeight: "bold",
              fontSize: 16,
              overflow: "hidden",
            }}
          />
        ) : (
          <View />
        )}

        {hasNext && (
          <Icon
            name="arrow-right"
            size={24}
            onPress={() => {
              navigation.setParams({
                verse: {
                  chapter: nextVerseObj.chapter,
                  number: nextVerseObj.verse,
                },
              });
            }}
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 24,
              fontWeight: "bold",
              fontSize: 16,
              overflow: "hidden",
            }}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View
        style={[tw`mb-6 p-4 rounded-xl`, { backgroundColor: colors.cardBg }]}
      >
          <Text
            style={[
              tw`text-xl font-bold mb-2`,
              {
                color: colors.primary,
                fontFamily: LANGUAGE_FONTS.sk.regular,
              },
            ]}
          >
            Sanskrit
          </Text>
          {/* Mark as Read Button */}
          {!isRead(verse.chapter, verse.number) ? (
            <Icon
              name="sticker-check-outline"
              style={[
                tw`absolute right-4 top-4`,
                { color: colors.textPrimary },
              ]}
              size={24}
              onPress={() => markAsRead(verse.chapter, verse.number)}
            />
          ) : (
            <Icon
              name="sticker-check"
              style={[
                tw`absolute right-4 top-4`,
                { color: "#22c55e" }, // green-500
              ]}
              size={24}
              onPress={() => markUnread(verse.chapter, verse.number)}
            />
          )}
          <Text
            style={[
              tw`text-lg mb-6`,
              {
                color: colors.text,
                fontFamily: LANGUAGE_FONTS.sk.regular,
                lineHeight: 26,
              },
            ]}
          >
            {sk}
          </Text>
          <Text
            style={[
              tw`text-xl font-bold mb-2`,
              {
                color: colors.primary,
              },
            ]}
          >
            {String(translations[currentLanguage] || translations.en || "")}
          </Text>
          <Text
            style={[
              tw`mb-6`,
              {
                color: colors.text,
                lineHeight: 26,
              },
              textStyles.body,
            ]}
          >
            {translation}
          </Text>
          {commentary ? (
            <>
              <Text
                style={[
                  tw`text-xl font-bold mb-2`,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                {String(
                  commentaryTranslations[currentLanguage] ||
                    commentaryTranslations.en ||
                    ""
                )}
              </Text>
              <Text
                style={[
                  tw`mb-4`,
                  {
                    color: colors.text,
                    lineHeight: 26,
                  },
                  textStyles.body,
                ]}
              >
                {commentary}
              </Text>
            </>
          ) : null}
      </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  verseTitle: {
    flex: 1,
  },
});

export default VerseDetailScreen;
