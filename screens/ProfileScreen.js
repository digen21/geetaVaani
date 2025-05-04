import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Header } from "../components";

const ProfileScreen = () => {
  const userEmail = "test@test.com";

  const MenuItem = ({ title, onPress }) => (
    <Pressable 
      style={styles.menuItem} 
      onPress={onPress}
    >
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={18} color="#C7C7CC" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton />
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../assets/default-avatar.png')}
              style={styles.avatar}
              defaultSource={require('../assets/default-avatar.png')}
            />
          </View>
          <Text style={styles.userName}>User</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        <View style={styles.menuGroups}>
          <View style={styles.menuSection}>
            <MenuItem title="My Account" onPress={() => {}} />
            <MenuItem title="Notifications" onPress={() => {}} />
            <MenuItem title="Sign Out" onPress={() => {}} />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  screen: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 120,
    marginBottom:40,
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 40,
    marginBottom: 12,
    overflow: 'hidden',

  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 20,
    color: '#8E8E93',
  },
  menuGroups: {
    paddingHorizontal: 16,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 35,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C6C6C8',
  },
  menuText: {
    fontSize: 17,
    color: '#000',
  },
  signOutSection: {
    marginBottom: 0,
  },
});

export default ProfileScreen;
