import { StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>👤 Profile Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
