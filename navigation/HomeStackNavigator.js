import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AboutScreen,
  ChapterDetailScreen,
  ChaptersScreen,
  CharacterDetailScreen,
  CharacterListScreen,
  FavoritesScreen,
  HomeScreen,
  VerseDetailScreen,
} from "../screens";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Chapters" component={ChaptersScreen} />
      <HomeStack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
      <HomeStack.Screen name="About" component={AboutScreen} />
      <HomeStack.Screen name="Favorites" component={FavoritesScreen} />
      <HomeStack.Screen name="VerseDetail" component={VerseDetailScreen} />
      <HomeStack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
      />
      <HomeStack.Screen name="Characters" component={CharacterListScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
