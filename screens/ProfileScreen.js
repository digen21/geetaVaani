import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ToggleThemeButton from "../components/ToggleThemeButton";
import { useTheme } from "../contexts";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const userEmail = "test@test.com";

  const MenuItem = ({ title, onPress, style }) => (
    <Pressable
      style={[styles.menuItem, { borderBottomColor: colors.border }, style]}
      onPress={onPress}
    >
      <Text style={[styles.menuText, { color: colors.text }]}>{title}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={18}
        color={colors.icon || "#C7C7CC"}
      />
    </Pressable>
  );

  const handleAboutPress = () => {
    navigation.navigate("About");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <View style={styles.screen}>
        <ToggleThemeButton style={{ margin: 20, marginTop: 20 }} />
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/default-avatar.png")}
              style={styles.avatar}
              defaultSource={require("../assets/default-avatar.png")}
            />
          </View>
          <Text style={[styles.userName, { color: colors.textPrimary }]}>
            {"User"}
          </Text>
          <Text
            style={[
              styles.userEmail,
              { color: colors.textSecondary || "#8E8E93" },
            ]}
          >
            {userEmail}
          </Text>
        </View>

        <View style={styles.menuGroups}>
          <View
            style={[
              styles.menuSection,
              { backgroundColor: colors.cardBg || "#fff" },
            ]}
          >
            <MenuItem title="My Account" onPress={() => {}} />
            <MenuItem title="Notifications" onPress={() => {}} />
            <MenuItem title="About App" onPress={handleAboutPress} />
            {/* <MenuItem title="Check For Update" onPress={checkForUpdates} /> */}
            <MenuItem
              title="Sign Out"
              onPress={() => {}}
              style={{ borderBottomWidth: 0 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 40,
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 40,
    marginBottom: 12,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  userName: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 20,
  },
  menuGroups: {
    paddingHorizontal: 20,
  },
  menuSection: {
    borderRadius: 10,
    marginBottom: 35,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuText: {
    fontSize: 17,
  },
  signOutSection: {
    marginBottom: 0,
  },
});

export default ProfileScreen;
