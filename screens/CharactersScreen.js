import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { CharacterCard, Header } from "../components";
import { useTheme } from "../contexts";
import characters from "../data/characterAndRoles/characters.json";

const CharactersScreen = ({ navigation }) => {
  const { colors } = useTheme();

  // Group characters by their type
  const groupedCharacters = characters.reduce((acc, character) => {
    const type = character.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(character);
    return acc;
  }, {});

  const sections = [
    {
      title: "Primary Characters",
      data: groupedCharacters.primary_character || [],
    },
    {
      title: "Secondary Characters",
      data: groupedCharacters.secondary_character || [],
    },
    {
      title: "Contextual Figures",
      data: groupedCharacters.contextual_figure || [],
    },
    {
      title: "Symbolic Roles",
      data: groupedCharacters.symbolic_role || [],
    },
  ];

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        Characters of Bhagavad Gita
      </Text>
      <Text style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
        Learn about the key figures and their roles in this sacred text
      </Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={[styles.sectionHeader, { color: colors.primary }]}>
      {section.title}
    </Text>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Characters" showBackButton />

      <SectionList
        contentContainerStyle={{ paddingTop: 130, paddingBottom: 32 }}
        sections={sections}
        ListHeaderComponent={renderHeader}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item.name.en + index}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() =>
              navigation.navigate("CharacterDetail", { character: item })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
    backgroundColor: "transparent",
  },
});

export default CharactersScreen;
