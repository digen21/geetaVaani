import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useLanguage } from "../contexts";
import characters from "../data/characterAndRoles/characters.json";
import { createTextStyles } from "../utils";

const CharacterListScreen = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const [search, setSearch] = useState("");

  // Sort and filter users
  const filteredCharacters = (characters ?? []).filter(
    (character) =>
      character?.name?.[currentLanguage]
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      character?.name?.en?.toLowerCase?.().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Characters</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search characters..."
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* User List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCharacters.map((character) => (
          <TouchableOpacity
            key={character.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterDetail", {
                name: character?.name?.[currentLanguage] || character?.name?.en,
                id: character.id,
                type: character.type,
                relation: character?.relations,
                role: character?.role,
              })
            }
            activeOpacity={0.7}
          >
            <Image
              source={
                typeof character.image === "string"
                  ? { uri: character.image }
                  : character.image
              }
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text
              style={[styles.characterName, textStyles.heading3]}
              numberOfLines={1}
            >
              {character?.name?.[currentLanguage] || character?.name?.en}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafeArea} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  scrollContent: {
    paddingBottom: 32,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 18,
    backgroundColor: "#e5e7eb",
  },
  characterName: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "600",
  },
  bottomSafeArea: {
    backgroundColor: "#fff",
  },
});

export default CharacterListScreen;
