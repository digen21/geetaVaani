import { View } from "react-native";
import tw from "twrnc";

const Separator = () => (
  <View
    style={[
      tw`my-4 mx-2`,
      {
        height: 1,
        backgroundColor: colors.border + "30",
        borderRadius: 1,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
      },
    ]}
  />
);

export default Separator;
