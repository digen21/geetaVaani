import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useLanguage, useTheme } from "../contexts";
import versesData from "../data/verses.json";
import { createTextStyles } from "../utils";
import { commentaryTranslations, translations } from "../configs";

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
        verseObj?.languages?.[currentLanguage] ||
        verseObj?.languages?.en ||
        {};
    const translation = langData.translation || "Translation not available";
    const commentary = langData.commentary || "";
    const summary = langData.summary || "";

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={[tw`mb-6 p-4 rounded-xl`, { backgroundColor: colors.cardBg }]}>
                    <Text style={[tw`text-xl font-bold mb-2`, { color: colors.primary }]}>
                        Sanskrit
                    </Text>
                    <Text style={[tw`text-lg mb-4`, { color: colors.text }, textStyles.body]}>{sk}</Text>
                    <Text style={[tw`text-xl font-bold mb-2`, { color: colors.primary }]}>
                        {translations[currentLanguage] || translations.en}
                    </Text>
                    <Text style={[tw`mb-4`, { color: colors.text }, textStyles.body]}>{translation}</Text>
                    {commentary ? (
                        <>
                            <Text style={[tw`text-xl font-bold mb-2`, { color: colors.primary }]}>
                                {commentaryTranslations[currentLanguage] || commentaryTranslations.en}
                            </Text>
                            <Text style={[tw`mb-4`, { color: colors.text }, textStyles.body]}>{commentary}</Text>
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
});

export default VerseDetailScreen;