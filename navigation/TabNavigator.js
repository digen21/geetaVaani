import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FavoritesScreen, HomeScreen, ProfileScreen } from "../screens";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          overflow: "hidden",
          height: 60 + insets.bottom, // Dynamically adjust height based on safe area
          backgroundColor: "white",
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          paddingTop: 5,
          shadowRadius: 8,
          paddingBottom: insets.bottom, // Dynamic bottom padding
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={24} 
              color={focused ? '#007AFF' : 'gray'} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ 
              color: focused ? '#007AFF' : 'gray',
              fontSize: 12,
              marginBottom: 5
            }}>
              Home
            </Text>
          )
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} size={24} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={24} 
              color={focused ? '#007AFF' : 'gray'} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ 
              color: focused ? '#007AFF' : 'gray',
              fontSize: 12,
              marginBottom: 5
            }}>
              Profile
            </Text>
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
