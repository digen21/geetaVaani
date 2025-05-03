import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts";

const TabView = ({ tabs, activeTab, onTabChange }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onTabChange(index)}
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === index ? colors.primary : "transparent",
              borderColor: colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === index ? "#FFF" : colors.primary,
              },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 4,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default TabView;
