import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../contexts";
import ToggleThemeButton from "./ToggleThemeButton";

const TopBar = ({ title, onBack, textStyle, compStyle }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.topBar, { backgroundColor: colors.cardBg }, compStyle]}
    >
      {onBack ? (
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : null}
      <Text
        style={[
          styles.headerText,
          !onBack && { marginLeft: 0 },
          { color: colors.textPrimary },
          ...(textStyle || []),
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <ToggleThemeButton />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomWidth: 0, // Remove border to match tab bar style
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    flex: 1, // Allow the text to take available space
  },
});

export default TopBar;
