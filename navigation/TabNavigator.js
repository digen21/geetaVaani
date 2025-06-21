import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LanguageSelectModal from "../components/LanguageSelectModal";
import {
  CharacterListScreen,
  FavoritesScreen,
  ProfileScreen,
} from "../screens";
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

const LanguageScreen = () => <View />; // Empty screen for Language tab

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const [showLangModal, setShowLangModal] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            overflow: "hidden",
            height: 60 + insets.bottom,
            backgroundColor: "#fff",
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            paddingTop: 5,
            shadowRadius: 8,
            paddingBottom: insets.bottom,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#007AFF" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#007AFF" : "gray",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Characters"
          component={CharacterListScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={24}
                color={focused ? "#007AFF" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#007AFF" : "gray",
                  fontSize: 12,
                  marginBottom: 5,
                }}
                numberOfLines={1}
              >
                Characters
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={focused ? "#007AFF" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#007AFF" : "gray",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                Favorites
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Language"
          component={LanguageScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="language"
                size={24}
                color={focused ? "#007AFF" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#007AFF" : "gray",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                Language
              </Text>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Prevent navigation
              setShowLangModal(true);
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#007AFF" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#007AFF" : "gray",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                Profile
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
      <LanguageSelectModal
        visible={showLangModal}
        onClose={() => setShowLangModal(false)}
      />
    </>
  );
};

export default TabNavigator;
