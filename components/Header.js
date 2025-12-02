import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import tw from "twrnc";

import { useTheme } from "../contexts";
import BackButton from "./BackButton";
import BurgerMenu from "./BurgerMenu";

const Header = ({
  title = "GitaVaani",
  subtitle = "The Voice of the Gita",
  showBackButton = false,
  showLanguageIcon = true,
  onBackPress,
  showMenu = true,
  align = "left",
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={[
        tw`absolute top-0 left-0 right-0 z-50 pt-8 pb-4`,
        {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.primary + "20",
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 10,
        },
      ]}
    >
      {/* Back Button */}
      {showBackButton && <BackButton />}

      <View style={tw`flex-row items-center absolute right-4 top-16`}>
        {showMenu && (
          <BurgerMenu
            style={[
              tw`absolute z-10 p-2 -right-2 rounded-full`,
              { backgroundColor: colors.primary + "20" },
            ]}
            navigation={navigation}
          />
        )}
      </View>

      {/* Title Container */}
      <View
        style={[
          tw`mx-4`,
          showBackButton && tw`ml-12`,
          showLanguageIcon && tw`mr-12`,
        ]}
      >
        <Text
          style={[tw`text-3xl font-bold text-center`, { color: colors.text }]}
        >
          {title}
        </Text>
        <Text
          style={[
            tw`text-xl font-bold text-center mt-1`,
            { color: colors.text },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Header;
