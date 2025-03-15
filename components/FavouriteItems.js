import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useLanguage, useTheme } from "../contexts";
import { getLocalizedChapter } from "../utils";

const FavoriteItems = ({ item, onPress }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const HEART_COLOR = "#FF3B30";

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.background }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <MaterialIcons
            name={item.type === "chapter" ? "menu-book" : "format-quote"}
            size={20}
            color={HEART_COLOR}
            style={styles.icon}
          />
          <Text style={[styles.title, { color: colors.text }]}>
            {getLocalizedChapter(item, currentLanguage)}
          </Text>
        </View>
        <Text
          style={[styles.subtitle, { color: colors.secondaryText }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={[styles.timestamp, { color: colors.secondaryText }]}>
          Added{" "}
          {format(new Date(item.addedAt || Date.now()), "MMM d, yyyy • h:mm a")}
        </Text>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={colors.secondaryText}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
  },
});

export default FavoriteItems;
