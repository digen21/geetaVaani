import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

import { TopBar } from "../components";
import { useLanguage, useTheme } from "../contexts";
import { useReadVerses } from "../hooks";

import chaptersData from "../data/sample-chapters.json";
import versesData from "../data/verses.json";
import { createTextStyles } from "../utils";
import { chapterVersesTranslations, LANGUAGE_FONTS } from "../configs";
import { convertDigits } from "@dmxdev/digit-converter-multilang";

const chartColors = [
  "#4F8EF7",
  "#50E3C2",
  "#F5A623",
  "#D0021B",
  "#B8E986",
  "#F8E71C",
  "#8B572A",
  "#417505",
  "#BD10E0",
  "#7ED321",
  "#F6A623",
  "#F78E69",
  "#D0011B",
  "#9013FE",
  "#B3B6B7",
  "#00B8D9",
  "#FF5630",
  "#36B37E",
];

const MarkedReadVersesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const { readVerses } = useReadVerses();

  // Animation state
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [chartReady, setChartReady] = useState(false);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  // Get total verses per chapter from versesData
  const totalVersesPerChapter = [];
  for (let i = 1; i <= 18; i++) {
    totalVersesPerChapter[i - 1] = versesData.filter(
      (v) => Number(v.chapter) === i
    ).length;
  }

  // Calculate read verses per chapter
  const chapterReadCounts = Array(18).fill(0);
  Object.keys(readVerses).forEach((key) => {
    const [chapter] = key.split("_");
    const idx = Number(chapter) - 1;
    if (idx >= 0 && idx < 18) chapterReadCounts[idx]++;
  });

  // Prepare data for PieChart
  const pieData = chapterReadCounts
    .map((read, idx) => {
      const total = totalVersesPerChapter[idx] || 1;
      const percent = Math.round((read / total) * 100);
      return {
        name: `Ch ${idx + 1} (${percent}%)`,
        population: percent,
        color: chartColors[idx % chartColors.length],
        legendFontColor: colors.text,
        legendFontSize: 12,
        legendFontFamily: LANGUAGE_FONTS[currentLanguage].regular,
      };
    })
    .filter((d) => d.population > 0);

  // Animate loading percentage
  useEffect(() => {
    setLoadingPercent(0);
    setChartReady(false);
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 1200,
      useNativeDriver: false,
    }).start(() => setChartReady(true));

    const listener = animatedValue.addListener(({ value }) => {
      setLoadingPercent(Math.round(value));
    });

    return () => {
      animatedValue.removeListener(listener);
    };
    // eslint-disable-next-line
  }, [Object.keys(readVerses).length, currentLanguage]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar
        title="Marked as Read Verses"
        onBack={() => navigation.goBack()}
        textStyle={[{ color: colors.textPrimary }, textStyles.heading3]}
      />

      {/* Pie Chart with loading animation */}
      <View style={styles.pieContainer}>
        <Text
          style={[
            styles.pieTitle,
            textStyles.text,
            { color: colors.textPrimary },
          ]}
        >
          Reading Progress by Chapter (%)
        </Text>
        {!chartReady ? (
          <View style={styles.loadingBox}>
            <Text style={[styles.loadingText, { color: colors.primary }]}>
              Loading Chart... {loadingPercent}%
            </Text>
          </View>
        ) : (
          <PieChart
            data={
              pieData.length > 0
                ? pieData
                : [
                    {
                      name: "No Data",
                      population: 1,
                      color: "#ccc",
                      legendFontColor: colors.text,
                      legendFontSize: 12,
                    },
                  ]
            }
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              color: () => colors.primary,
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 0,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="16"
            hasLegend
            absolute
          />
        )}
      </View>

      {/* List of marked as read verses */}
      <FlatList
        data={Object.keys(readVerses).map((key) => {
          const [chapter, verse] = key.split("_");
          return { chapter, verse };
        })}
        keyExtractor={(item) => `${item.chapter}_${item.verse}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={[{ color: colors.text }, textStyles.text]}>
              {chapterVersesTranslations.chapter[currentLanguage]}
              {"  "}
              {convertDigits(item.chapter, currentLanguage)},{" "}
              {chapterVersesTranslations.verse[currentLanguage]}{" "}
              {convertDigits(item.verse, currentLanguage)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={{ color: colors.text, textAlign: "center", marginTop: 40 }}
          >
            No verses marked as read yet.
          </Text>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  pieContainer: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  pieTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  loadingBox: {
    width: "100%",
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
});

export default MarkedReadVersesScreen;
