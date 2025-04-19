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
  if (!content && !content?.length) {
    return;
  }

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
            tw`text-lg font-semibold flex-1`,
            { color: colors.text, lineHeight: 32 },
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Icon
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={colors.text}
          style={tw`ml-2`}
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
                  style={tw`mr-2 mt-1.5`}
                />
                <Text
                  style={[
                    tw`text-base flex-1`,
                    fontStyle,
                    {
                      color: colors.text,
                      lineHeight: 34,
                      flexWrap: "wrap",
                    },
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
