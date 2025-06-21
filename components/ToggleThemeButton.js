import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts";

const ToggleThemeButton = ({ style }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={([styles.btn, style], { marginTop: 100 })}
    >
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={24}
        color={isDark ? "#FFD700" : "#333"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    alignSelf: "flex-end",
  },
});

export default ToggleThemeButton;
