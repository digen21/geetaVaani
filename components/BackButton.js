import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useTheme } from "../contexts";

const BackButton = ({ onPress, style }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={[
        tw`absolute top-11 left-5 z-10 p-2 rounded-full`,
        { backgroundColor: colors.primary + "20" },
        style,
      ]}
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Icon name="arrow-back" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
};

export default BackButton;
