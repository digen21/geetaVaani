import { createStackNavigator } from "@react-navigation/stack";

import {
  AboutScreen,
  ChapterDetailScreen,
  ChaptersScreen,
  CharacterDetailScreen,
  CharacterListScreen,
  FavoritesScreen,
  MarkedReadVersesScreen,
  ProfileScreen,
  VerseDetailScreen,
} from "../screens";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        }),
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Chapters" component={ChaptersScreen} />
      <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="VerseDetail" component={VerseDetailScreen} />
      <Stack.Screen name="Characters" component={CharacterListScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="MarkedReadVerses"
        component={MarkedReadVersesScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
