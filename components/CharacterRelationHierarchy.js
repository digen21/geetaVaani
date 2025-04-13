import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
// import SkeletonContent from 'react-native-skeleton-content';

import { relationsTranslations } from "../configs/languages";
import { useLanguage } from "../contexts";

const { width } = Dimensions.get("window");

const RelationNode = ({ title, subtitle, image, count, isMain }) => {
  return (
    <View style={[styles.nodeContainer, isMain && styles.mainNode]}>
      <Image
        source={{ uri: image || "https://via.placeholder.com/40" }}
        style={styles.nodeImage}
      />
      <View style={styles.nodeTextContainer}>
        <Text style={[styles.nodeTitle, isMain && styles.mainNodeTitle]}>
          {title}
        </Text>
        <Text style={styles.nodeSubtitle}>{subtitle}</Text>
      </View>
      {count && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </View>
  );
};

const CharacterRelationHierarchy = ({ character, loading }) => {
  const { currentLanguage } = useLanguage();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const { name, relations } = character;

  // Group relations by their type
  const groupedRelations = Object.entries(relations).reduce(
    (acc, [key, value]) => {
      const type = key.split("_")[0]; // e.g., 'son' from 'son_of'
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({ key, value });
      return acc;
    },
    {}
  );

  return (
    <View style={styles.container}>
      {/* Main Character Node */}
      <RelationNode
        title={name[currentLanguage]}
        subtitle={character.role[currentLanguage]}
        image={character.image}
        isMain={true}
      />

      {/* Relation Lines */}
      <View style={styles.relationLines} />

      {/* Relations Container */}
      <View style={styles.relationsContainer}>
        {Object.entries(groupedRelations).map(([type, relations], index) => (
          <View key={type} style={styles.relationGroup}>
            {relations.map((relation, subIndex) => (
              <View key={`${type}-${subIndex}`} style={styles.relationItem}>
                <RelationNode
                  title={relationsTranslations[currentLanguage][relation.key]}
                  subtitle={relation.value[currentLanguage]}
                  count={relation.value[currentLanguage].split(",").length}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  skeletonContainer: {
    padding: 20,
    width: width,
  },
  nodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 5,
    width: width - 60,
  },
  mainNode: {
    backgroundColor: "#f0f8ff",
    borderWidth: 1,
    borderColor: "#4a90e2",
  },
  nodeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nodeTextContainer: {
    flex: 1,
  },
  nodeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  mainNodeTitle: {
    color: "#4a90e2",
  },
  nodeSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: "#4a90e2",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  relationLines: {
    width: 2,
    height: 20,
    backgroundColor: "#4a90e2",
    marginVertical: 10,
  },
  relationsContainer: {
    width: "100%",
  },
  relationGroup: {
    marginBottom: 15,
  },
  relationItem: {
    marginBottom: 8,
  },
});

export default CharacterRelationHierarchy;
