import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../contexts";
import ToggleThemeButton from "./ToggleThemeButton";

const TopBar = ({ title, onBack, textStyle, compStyle, titleStyle }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.topBar, { backgroundColor: colors.cardBg }, compStyle]}
    >
      <View style={styles.leftContainer}>
        {onBack ? (
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text
        style={[
          styles.headerText,
          { color: colors.textPrimary },
          ...(textStyle || []),
          titleStyle
        ]}
        numberOfLines={1}
        ellipsizeMode="middle"
      >
        {title}
      </Text>
      <View style={styles.rightContainer}>
        <ToggleThemeButton />
      </View>
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
    justifyContent: "space-between", // This ensures even spacing
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomWidth: 0, // Remove border to match tab bar style
    width: "100%", // Ensure full width
  },
  leftContainer: {
    flex: 0.2,
    alignItems: "flex-start",
  },
  rightContainer: {
    flex: 0.2,
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    flex: 0.6, // Middle section for the title
    textAlign: "center", // Center the text by default
  },
});

export default TopBar;
