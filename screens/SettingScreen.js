import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../contexts";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";

const SettingItem = ({ icon, title, subtitle, onPress, iconColor }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        tw`flex-row items-center p-4 mb-2 rounded-lg`,
        { backgroundColor: colors.card },
      ]}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={iconColor || colors.primary}
        style={tw`mr-4`}
      />
      <View style={tw`flex-1`}>
        <Text style={[tw`text-lg font-medium`, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[tw`text-sm mt-1`, { color: colors.secondaryText }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={colors.secondaryText}
      />
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  const settingsGroups = [
    {
      title: "Content",
      items: [
        {
          icon: "book",
          title: "Reading Progress",
          subtitle: "Track your reading journey",
          onPress: () => navigation.navigate("Progress"),
        },
        {
          icon: "bookmark",
          title: "Bookmarks",
          subtitle: "View saved verses",
          onPress: () => navigation.navigate("Bookmarks"),
        },
        {
          icon: "history",
          title: "Reading History",
          subtitle: "View previously read chapters",
          onPress: () => navigation.navigate("History"),
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: "info",
          title: "About Gita Vaani",
          subtitle: "Learn more about the app",
          onPress: () => navigation.navigate("About"),
        },
        {
          icon: "star",
          title: "Rate App",
          subtitle: "Share your feedback",
          onPress: () => navigation.navigate("Rating"),
        },
        {
          icon: "share",
          title: "Share App",
          subtitle: "Spread the wisdom",
          onPress: () => {
            /* Add share functionality */
          },
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {settingsGroups.map((group, index) => (
        <View key={index} style={tw`mb-6`}>
          <Text
            style={[tw`text-lg font-bold mb-2 px-4`, { color: colors.primary }]}
          >
            {group.title}
          </Text>
          {group.items.map((item, itemIndex) => (
            <SettingItem
              key={itemIndex}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
});

export default SettingsScreen;
