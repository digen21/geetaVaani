import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { ChapterCard } from "../components";
import { favoriteScreenTranslations } from "../configs";
import { useFavorites, useLanguage, useTheme } from "../contexts";
import chaptersData from "../data/sample-chapters.json";
import versesData from "../data/verses.json";
import { calculateVerseCounts } from "../utils";

const FavoritesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { favorites } = useFavorites();
  const { currentLanguage } = useLanguage();
  const currentTranslations =
    favoriteScreenTranslations[currentLanguage] ||
    favoriteScreenTranslations.en;

  const verseCounts = calculateVerseCounts(versesData);

  const handleItemPress = (item) => {
    if (item.type === "chapter") {
      const chapterData = chaptersData.find(
        (chapter) => chapter.chapter === item.number
      );

      const formattedChapter = {
        ...item,
        ...chapterData,
        chapter: item.number,
        verses_count: chapterData?.verses_count || item.verses_count,
        en: {
          title: chapterData?.en?.title || item.title,
          summary: chapterData?.en?.summary,
          main_teachings: chapterData?.en?.main_teachings || [],
          practical_tips: chapterData?.en?.practical_tips || [],
          what_we_can_learn: chapterData?.en?.what_we_can_learn || [],
        },
        [currentLanguage]: {
          title: chapterData?.[currentLanguage]?.title || item.title,
          summary: chapterData?.[currentLanguage]?.summary,
          main_teachings: chapterData?.[currentLanguage]?.main_teachings || [],
          practical_tips: chapterData?.[currentLanguage]?.practical_tips || [],
          what_we_can_learn:
            chapterData?.[currentLanguage]?.what_we_can_learn || [],
        },
      };

      navigation.navigate("ChapterDetail", {
        chapter: formattedChapter,
      });
    } else {
      navigation.navigate("VerseDetail", { verse: item });
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: colors.text, marginTop: 20 }]}>
        {currentTranslations.favorites}
      </Text>
      <Text style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
        {currentTranslations.favoritesDescription}
      </Text>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="favorite" size={64} color="#FF3B30" />
      <Text style={[styles.emptyText, { color: colors.text }]}>
        {currentTranslations.noFavorites}
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.secondaryText }]}>
        {currentTranslations.addFavoritesHint}
      </Text>
    </View>
  );

  // Group favorites by type
  const groupedFavorites = favorites.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const sections = [
    {
      title: currentTranslations.chapters,
      data: groupedFavorites.chapter || [],
    },
    { title: currentTranslations.verses, data: groupedFavorites.verse || [] },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={sections}
        renderItem={({ item: section }) => (
          <>
            {section.data.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {section.title}
                </Text>
                {section.data.map((item) => (
                  <View key={item.id} style={styles.cardWrapper}>
                    <ChapterCard
                      chapter={{
                        ...item,
                        title:
                          item[currentLanguage]?.title ||
                          item.en?.title ||
                          item.title,
                        description:
                          item[currentLanguage]?.description ||
                          item.en?.description ||
                          item.description,
                      }}
                      verseCount={verseCounts[item.chapter] || "0"}
                      onPress={() => handleItemPress(item)}
                    />
                  </View>
                ))}
              </View>
            )}
          </>
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    opacity: 0.2,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyList: {
    flex: 1,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 24,
  },
  listContent: {
    paddingBottom: 50,
  },
});

export default FavoritesScreen;
