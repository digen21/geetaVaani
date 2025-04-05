import { createStackNavigator } from "@react-navigation/stack";

import {
  AboutScreen,
  ChapterDetailScreen,
  ChaptersScreen,
  CharacterDetailScreen,
  CharactersScreen,
  FavoritesScreen,
  RatingScreen,
  SettingsScreen,
  SplashScreen,
  VerseDetailScreen,
} from "../screens";

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
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Chapters" component={ChaptersScreen} />
      <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
      <Stack.Screen name="VerseDetail" component={VerseDetailScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          // headerStyle: {
          //   backgroundColor: colors.primary,
          // },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Characters"
        component={CharactersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
