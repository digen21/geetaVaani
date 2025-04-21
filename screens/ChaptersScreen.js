import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";

import { ChapterCard, Header } from "../components";
import { useTheme } from "../contexts";
import chaptersData from "../data/sample-chapters.json";

/**
 * ChaptersScreen component that displays a list of chapters.
 *
 * This screen fetches chapter data from a JSON file and renders a list using `FlatList`.
 * It uses the theme context to style the background color dynamically.
 *
 * @param {{ navigation: any }} props - The navigation object for screen navigation.
 * @returns {JSX.Element} The ChaptersScreen component.
 */
const ChaptersScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />

      <FlatList
        data={chaptersData}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ChapterCard
              chapter={item}
              onPress={() =>
                navigation.navigate("ChapterDetail", { chapter: item })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.chapter.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<View style={{ height: 0 }} />}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7", // iOS system background
  },
  listContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 88 : 76, // Account for bottom tab bar
  },
  cardWrapper: {
    marginBottom: 10,
    // Remove shadow and border from wrapper since it's handled in the card
  },
});

export default ChaptersScreen;
