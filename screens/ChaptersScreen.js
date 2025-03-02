import React from "react";
import { FlatList, View } from "react-native";

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
const ChaptersScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />
      <FlatList
        data={chaptersData}
        renderItem={({ item }) => (
          <ChapterCard
            chapter={item}
            onPress={() =>
              navigation.navigate("ChapterDetail", { chapter: item })
            }
          />
        )}
        keyExtractor={(item) => item.chapter.toString()}
        contentContainerStyle={{
          paddingTop: 130,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        ListHeaderComponent={<View style={{ height: 0 }} />}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default ChaptersScreen;
