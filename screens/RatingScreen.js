import React, { useState } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import tw from "twrnc";

import { Rating } from "../components";
import { useTheme } from "../contexts";

const RatingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (rating >= 4) {
      // For high ratings, redirect to store
      const storeUrl = Platform.select({
        ios: "https://apps.apple.com/app/YOUR_APP_ID",
        android:
          "https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE",
      });
      await Linking.openURL(storeUrl);
    } else {
      // For lower ratings, send feedback to your support email
      const subject = `GeetaVaani App Feedback (${rating} stars)`;
      const body = feedback;
      const mailUrl = `mailto:support@geetavaani.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      await Linking.openURL(mailUrl);
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.headerContainer, tw`mt-6`]}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.appName, { color: colors.textColor }]}>
          GeetaVaani
        </Text>
        <Text style={[styles.version, { color: colors.textColor }]}>
          Version 1.0.0
        </Text>
      </View>
      <View style={tw`items-center p-6`}>
        <Text style={[tw`text-2xl font-bold mb-8`, { color: colors.text }]}>
          Rate GeetaVaani
        </Text>

        <Text style={[tw`text-lg mb-4 text-center`, { color: colors.text }]}>
          How would you rate your experience with GeetaVaani?
        </Text>

        <Rating rating={rating} setRating={setRating} size={40} />

        <TextInput
          style={[
            tw`w-full p-4 mt-8 rounded-lg`,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
              borderWidth: 1,
            },
          ]}
          placeholder="Share your feedback (optional)"
          placeholderTextColor={colors.secondaryText}
          multiline
          numberOfLines={4}
          value={feedback}
          onChangeText={setFeedback}
        />

        <TouchableOpacity
          style={[
            tw`w-full py-4 px-6 rounded-lg mt-6`,
            {
              backgroundColor:
                rating > 0 ? colors.primary : colors.secondaryText,
              opacity: rating > 0 ? 1 : 0.5,
            },
          ]}
          onPress={handleSubmit}
          disabled={rating === 0}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    opacity: 0.7,
  },
});

export default RatingScreen;
