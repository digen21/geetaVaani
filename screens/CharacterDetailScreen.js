import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CharacterDetailScreen = ({ route }) => {
  const { name } = route.params;

  return (
    <SafeAreaView className="">
      <Text>{name}'s Details</Text>
    </SafeAreaView>
  );
};

export default CharacterDetailScreen;
