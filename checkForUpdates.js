// App.js
import * as Updates from "expo-updates";
import { Alert } from "react-native";

const checkForUpdates = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Alert.alert(
        "Update available",
        "A new update is available. Restart the app to apply it.",
        [{ text: "Restart", onPress: () => Updates.reloadAsync() }]
      );
    }
  } catch (e) {
    console.error("Error checking for updates:", e);
    Alert.alert(
      "Update Error",
      "An error occurred while checking for updates. Please try again later."
    );
  }
};

export default checkForUpdates;
