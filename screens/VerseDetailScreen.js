import { convertDigits } from "@dmxdev/digit-converter-multilang";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { BackButton } from "../components";
import {
  chapterVersesTranslations,
  commentaryTranslations,
  LANGUAGE_FONTS,
  translations,
} from "../configs";
import { useLanguage, useTheme } from "../contexts";
import versesData from "../data/verses.json";
import { createTextStyles } from "../utils";

const VerseDetailScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const { verse } = route.params;

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
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <BackButton />

        <Text
          style={[
            styles.verseTitle,
            textStyles.heading3,
            {
              color: colors.text,
              fontSize: 18,
              textAlign: "center",
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {verseTitle}
        </Text>
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
