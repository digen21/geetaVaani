import { useNavigation } from "@react-navigation/native";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { ChapterCard } from "../components";
import { useTheme } from "../contexts";
import chaptersData from "../data/sample-chapters.json";
import versesData from "../data/verses.json";
import { calculateVerseCounts } from "../utils";

/**
 * ChaptersScreen component that displays a list of chapters.
 *
 * This screen fetches chapter data from a JSON file and renders a list using `FlatList`.
 * It uses the theme context to style the background color dynamically.
 * Each chapter is rendered using the `ChapterCard` component, and the verse count is calculated
 * using the `calculateVerseCounts` utility function.
 * The screen also handles safe area insets and adjusts padding for different platforms.
 *
 * @component
 * @returns {JSX.Element} The rendered ChaptersScreen component.
 * @param {{ navigation: any }} props - The navigation object for screen navigation.
 * @returns {JSX.Element} The ChaptersScreen component.
 */
const ChaptersScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  // Calculate verse counts
  const verseCounts = calculateVerseCounts(versesData);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={chaptersData}
          renderItem={({ item }) => (
            <ChapterCard
              verseCount={verseCounts[item.chapter] || "0"}
              chapter={item}
              onPress={() =>
                navigation.navigate("ChapterDetail", { chapter: item })
              }
            />
          )}
          keyExtractor={(item) => item.chapter?.toString()}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: (Platform.OS === "ios" ? 88 : 76) + insets.bottom,
            }, // <-- add safe area bottom
          ]}
          ListHeaderComponent={<View style={{ height: 0 }} />}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  listContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 88, // Account for bottom tab bar
  },
});

export default ChaptersScreen;
