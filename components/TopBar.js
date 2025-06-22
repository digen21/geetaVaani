import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../contexts";
import ToggleThemeButton from "./ToggleThemeButton";

const TopBar = ({ title, onBack, textStyle, compStyle }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.topBar, compStyle]}>
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
      >
        {title}
      </Text>
      <View style={{ flex: 1 }} />
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
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
  },
});

export default TopBar;
