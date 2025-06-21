import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChapterCard } from "../components";
import VerseCard from "../components/VerseCard"; // Make sure this is imported
import { favoriteScreenTranslations } from "../configs";
import { useFavorites, useLanguage, useTheme } from "../contexts";
import chaptersData from "../data/sample-chapters.json";
import versesData from "../data/verses.json";
import { calculateVerseCounts, createTextStyles } from "../utils";

const FavoritesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { favorites, clearFavorites } = useFavorites(); // <-- Make sure clearFavorites exists in your context
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
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
    <SafeAreaView style={styles.headerContainer}>
      <Text style={[textStyles.heading1, { color: colors.text, fontSize: 28 }]}>
        {currentTranslations.favorites}
      </Text>
      <Text style={[textStyles.body, { color: colors.secondaryText }]}>
        {currentTranslations.favoritesDescription}
      </Text>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      {/* {favorites.length > 0 && (
        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: colors.primary, }]}
          onPress={clearFavorites}
        >
          <MaterialIcons name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      )} */}
    </SafeAreaView>
  );

  const renderEmptyState = () => (
    <View style={[styles.emptyContainer]}>
      <MaterialIcons name="favorite" size={64} color="#FF3B30" />
      <Text
        style={[
          textStyles.heading2,
          { color: colors.text, textAlign: "center", marginTop: 16 },
        ]}
      >
        {currentTranslations.noFavorites}
      </Text>
      <Text
        style={[
          textStyles.text,
          { color: colors.secondaryText, textAlign: "center", lineHeight: 24 },
        ]}
      >
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

  const insets = useSafeAreaInsets();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "chapters", title: currentTranslations.chapters },
    { key: "verses", title: currentTranslations.verses },
  ]);

  const renderChaptersTab = () => (
    <SafeAreaView
      edges={["bottom"]}
      style={{ paddingBottom: insets.bottom - 30 }}
    >
      <FlatList
        data={groupedFavorites.chapter || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ChapterCard
              chapter={{
                ...item,
                title:
                  item[currentLanguage]?.title || item.en?.title || item.title,
                description:
                  item[currentLanguage]?.description ||
                  item.en?.description ||
                  item.description,
              }}
              verseCount={verseCounts[item.chapter] || "0"}
              onPress={() => handleItemPress(item)}
            />
          </View>
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          groupedFavorites.chapter?.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );

  const renderVersesTab = () => (
    <SafeAreaView
      edges={["bottom"]}
      style={{ paddingBottom: insets.bottom - 30 }}
    >
      <FlatList
        data={groupedFavorites.verse || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <VerseCard
              verse={item}
              colors={colors}
              onPress={() => handleItemPress(item)}
            />
          </View>
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          groupedFavorites.verse?.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );

  const renderScene = SceneMap({
    chapters: renderChaptersTab,
    verses: renderVersesTab,
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={({ flex: 1, backgroundColor: colors.cardBg }, textStyles.body)}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              backgroundColor: colors.cardBg,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              margin: 8,
              elevation: 0,
              shadowOpacity: 0,
            }}
            indicatorStyle={{
              backgroundColor: colors.primary,
              height: 3,
              borderRadius: 2,
            }}
            labelStyle={{
              fontWeight: "bold",
              fontSize: 16,
              textTransform: "none",
            }}
            activeColor={colors.primary}
            inactiveColor="#999"
            pressColor="#e0e0e0"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
  },

  divider: {
    height: 1,
    opacity: 0.2,
  },
  cardWrapper: {
    paddingHorizontal: 12,
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
  clearButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
