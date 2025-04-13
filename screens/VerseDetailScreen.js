import React from "react";
import { ScrollView, Share, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { useTheme } from "../contexts";
import { Header } from "../components";

/**
 * VerseDetailScreen component displays the details of a selected verse.
 *
 * This screen shows the Sanskrit verse, its English translation, and provides options
 * to share the verse or mark it as a favorite.
 *
 * @param {{ route: { params: { verse: { sanskrit: string, languages: { en: { translation: string } } } } } }} props - The route object containing the selected verse data.
 * @returns {JSX.Element} The VerseDetailScreen component.
 */
const VerseDetailScreen = ({ route }) => {
  const { colors } = useTheme();
  const { verse } = route.params;

  /**
   * Handles sharing the verse translation via the system's share functionality.
   */
  const handleShare = async () => {
    try {
      await Share.share({
        message: verse.languages.en.translation,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Header />
      {/* Display Sanskrit verse */}
      <Text style={{ fontSize: 24, color: colors.text, marginBottom: 16 }}>
        {verse.sanskrit}
      </Text>

      {/* Display verse translation inside a styled card */}
      <View
        style={{
          backgroundColor: colors.cardBg,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: colors.text, fontSize: 18 }}>
          {verse.languages.en.translation}
        </Text>

        {/* Action icons for sharing and favoriting */}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Icon
            name="share"
            size={24}
            color={colors.primary}
            onPress={handleShare}
            style={{ marginRight: 20 }}
          />
          <Icon name="favorite-border" size={24} color={colors.primary} />
        </View>
      </View>
    </ScrollView>
  );
};

export default VerseDetailScreen;
