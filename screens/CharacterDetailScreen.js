import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../contexts";
import { createTextStyles } from "../utils";

const CharacterDetailScreen = ({ route }) => {
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const { name } = route.params;

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text style={[textStyles.heading3]}>{name}'s Details</Text>
    </SafeAreaView>
  );
};

export default CharacterDetailScreen;
