import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <BlurView intensity={80} tint="light" style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName =
          route.name === "Home" ? "home-outline" : "person-outline";

        return (
          <View key={route.key} style={styles.tabItem}>
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#007AFF" : "#8e8e93"}
              onPress={onPress}
            />
            <Text
              onPress={onPress}
              style={{ color: isFocused ? "#007AFF" : "#8e8e93", fontSize: 12 }}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 12,
    paddingBottom: Platform.OS === "ios" ? 24 : 12, // Account for iOS home indicator
    backgroundColor: Platform.OS === "android" ? "#ffffffee" : "transparent",
    borderTopWidth: 0.5,
    borderColor: "#E5E5EA",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default CustomTabBar;
