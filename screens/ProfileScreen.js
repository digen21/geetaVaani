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

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopBar } from "../components";
import { profileTranslations } from "../configs";
import { useLanguage, useTheme } from "../contexts";
import { createTextStyles } from "../utils";

// Add this import
import MarkedReadVersesScreen from "./MarkedReadVersesScreen";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const insets = useSafeAreaInsets();

  const translation = profileTranslations[currentLanguage];

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

  // New handler for Marked as Read Verses
  const handleMarkedReadVersesPress = () => {
    navigation.navigate("MarkedReadVerses");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}
      edges={["top", "bottom"]}
    >
      <TopBar
        title={translation.account}
        textStyle={[{ color: colors.textPrimary }, textStyles.heading3]}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.screen}>
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
            <MenuItem title={translation.account} onPress={() => {}} />
            <MenuItem title={translation.notification} onPress={() => {}} />
            <MenuItem
              title="Marked as Read Verses"
              onPress={handleMarkedReadVersesPress}
            />
            <MenuItem title={translation.aboutApp} onPress={handleAboutPress} />
            {/* <MenuItem title="Check For Update" onPress={checkForUpdates} /> */}
            <MenuItem
              title={translation.logout}
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
