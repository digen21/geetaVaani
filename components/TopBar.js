import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TopBar = ({ title, onBack, textStyle, compStyle }) => (
  <View style={[compStyle, styles.topBar]}>
    {onBack ? (
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrow-left" size={24} color="#007AFF" />
      </TouchableOpacity>
    ) : null}
    <Text style={[textStyle, styles.headerText, !onBack && { marginLeft: 0 }]}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    color: "#111827",
  },
});

export default TopBar;
