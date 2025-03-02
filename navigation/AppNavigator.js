import { createStackNavigator } from "@react-navigation/stack";

import {
  ChapterDetailScreen,
  ChaptersScreen,
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
