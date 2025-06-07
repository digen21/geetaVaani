import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChapterDetailScreen, ChaptersScreen, HomeScreen } from '../screens';


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Chapters" component={ChaptersScreen} />
      <HomeStack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;