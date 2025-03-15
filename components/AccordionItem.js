import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

import Separator from "./Separator";

const AccordionItem = ({
  title,
  content,
  isOpen,
  onPress,
  colors,
  fontStyle,
}) => {
  return (
    <View style={[tw`mb-4`, { backgroundColor: colors.cardBg }]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          tw`flex-row justify-between items-center p-4 rounded-t-xl`,
          { backgroundColor: colors.primary + "20" },
        ]}
      >
        <Text
          style={[
            tw`text-lg font-bold`,
            { color: colors.text, lineHeight: 32 },
          ]}
        >
          {title}
        </Text>
        <Icon
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={tw`p-4`}>
          {content.map((item, index) => (
            <View key={index}>
              <View style={tw`flex-row mb-3`}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color={colors.primary}
                  style={tw`mr-2`}
                />
                <Text
                  style={[
                    tw`text-base`,
                    fontStyle,
                    { color: colors.text, lineHeight: 34 },
                  ]}
                >
                  {item}
                </Text>
              </View>
              {index < content.length - 1 && <Separator />}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
