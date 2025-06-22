import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...",
  style,
  inputStyle,
}) => (
  <View style={[styles.searchBar, style]}>
    <Icon name="magnify" size={20} color="#9ca3af" />
    <TextInput
      style={[styles.searchInput, inputStyle]}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      value={value}
      onChangeText={onChangeText}
      autoCorrect={false}
      autoCapitalize="none"
      clearButtonMode="while-editing"
    />
    {value?.length > 0 && (
      <TouchableOpacity
        onPress={() => onChangeText("")}
        style={styles.clearBtn}
      >
        <Icon name="close-circle" size={20} color="#9ca3af" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    margin: 12,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    color: "#1f2937",
  },
});

export default SearchBar;
