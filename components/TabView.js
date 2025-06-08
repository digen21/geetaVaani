import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const TabView = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={tw`flex-row justify-around p-4 border-b border-gray-200`}>
      {tabs.map((tab, index) => {
        const isActive = index === activeTab;
        return (
          <TouchableOpacity
            key={index}
            style={tw`flex-1 items-center pb-2`}
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
              {tab.label}
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
      })}
    </View>
  );
};

export default TabView;
