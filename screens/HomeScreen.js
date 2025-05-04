import { StyleSheet } from "react-native";
import ChaptersScreen from "./ChaptersScreen";

const HomeScreen = () => <ChaptersScreen />;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
