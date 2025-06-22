import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SearchBar, TopBar } from "../components";
import { CharacterDetailTranslations } from "../configs";
import { useLanguage, useTheme } from "../contexts";
import characters from "../data/characterAndRoles/characters.json";
import { createTextStyles } from "../utils";

const CharacterListScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
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
    <SafeAreaView
      style={
        ([styles.safeArea, styles.bottomSafeArea],
        { backgroundColor: colors.background })
      }
      edges={["top", "left", "right", "bottom"]}
    >
      {/* Top Bar */}

      <TopBar
        title={CharacterDetailTranslations[currentLanguage].character}
        textStyle={[
          { color: colors.textPrimary },
          currentLanguage === "en" ? textStyles.heading2 : textStyles.heading2,
        ]}
        onBack={() => navigation.goBack()}
      />

      {/* Search Bar */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search characters..."
      />

      {/* User List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCharacters.map((character) => (
          <TouchableOpacity
            key={character.id}
            style={[
              { color: colors.text, backgroundColor: colors.cardBg },
              styles.card,
            ]}
            onPress={() =>
              navigation.navigate("CharacterDetail", {
                name: character?.name?.[currentLanguage] || character?.name?.en,
                id: character.id,
                type: character.type,
                relation: character?.relations,
                role: character?.role[currentLanguage] || character?.role.en,
                description:
                  character.description[currentLanguage] ||
                  character.description.en,
                image: character.image,
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
              style={[
                { color: colors.text },
                styles.characterName,
                textStyles.heading3,
              ]}
              numberOfLines={1}
            >
              {character?.name?.[currentLanguage] || character?.name?.en}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#fff",
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
    fontWeight: "600",
  },
  bottomSafeArea: {
    backgroundColor: "#fff",
    paddingBottom: 24,
  },
});

export default CharacterListScreen;
