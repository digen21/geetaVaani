import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { useTheme } from "../contexts";

const TabView = ({ tabs, activeTab, onTabChange }) => {
  const { colors } = useTheme();

  const renderItem = ({ item, index }) => {
    const isActive = index === activeTab;
    return (
      <TouchableOpacity
        style={
          ([tw`flex-1 items-center pb-2`],
          { backgroundColor: colors.background })
        }
        onPress={() => onTabChange(index)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            tw`text-base`,
            {
              color: isActive ? "#007AFF" : "#A0A0A0", // active: blue, inactive: gray
              fontWeight: isActive ? "bold" : "normal",
            },
          ]}
        >
          {item.label}
        </Text>

        {isActive && (
          <View
            style={{
              height: 2,
              backgroundColor: "#007AFF", // blue underline
              width: "50%",
              marginTop: 4,
              borderRadius: 1,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={tabs}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal={false}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={tw`flex-row justify-around`}
      style={tw`p-4 border-b border-gray-200`}
    />
  );
};

export default TabView;
