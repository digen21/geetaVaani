/**
 * PushNotificationButton Component
 *
 * This component provides a dynamic button that sends local push notifications
 * when pressed. It handles notification permissions, creates Android notification
 * channels, and displays the received notification information.
 *
 * Features:
 * - Requests notification permissions when needed
 * - Creates Android notification channel with appropriate settings
 * - Sends immediate local notifications when button is pressed
 * - Displays received notifications in the UI
 * - Shows Expo push token for debugging purposes
 * - Provides user feedback through alerts
 * - Accepts dynamic notification title, body, and button text
 * - Supports custom button press callbacks
 *
 * Props:
 * - buttonText (string): Text displayed on the button (default: "Send Notification")
 * - notificationTitle (string): Title of the push notification (default: "GitaVaani Notification")
 * - notificationBody (string): Body text of the push notification (default: "This is a local push notification from your app!")
 * - onClick (function): Callback function triggered on button press (optional)
 * - showToken (boolean): Whether to display the Expo push token (default: true)
 * - showFeedback (boolean): Whether to show success/error alerts (default: true)
 *
 * Usage:
 * <PushNotificationButton
 *   buttonText="Send Alert"
 *   notificationTitle="Custom Title"
 *   notificationBody="Custom message here"
 *   onClick={() => console.log('Button pressed')}
 * />
 *
 * @component
 */
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function PushNotificationButton({
  onClick,
  buttonText = "Send Notification",
  notificationTitle = "GitaVaani Notification",
  notificationBody = "This is a local push notification from your app!",
  showToken = true,
  showFeedback = true,
}) {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Set up notification permissions and listeners when component mounts
  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync();

    // Listen for incoming notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener(setNotification);
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification pressed:", response);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  /**
   * Registers the app to receive push notifications
   * - Sets up Android notification channel
   * - Requests notification permissions from user
   * - Gets and stores the Expo push token for possible future use
   */
  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      // Create notification channel for Android
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default Channel",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
          android: {
            interruptive: true,
          },
        });
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission not granted",
          "Unable to get push token for push notification!"
        );
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);
      setExpoPushToken(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }
  };

  /**
   * Shows a local notification immediately when called
   * - Requests permissions if not already granted
   * - Schedules and displays an immediate notification
   * - Calls the onClick callback if provided
   * - Provides user feedback through alerts
   */
  const showNotification = async () => {
    try {
      // Request notification permissions if not already granted
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "You need to enable notifications to use this feature."
        );
        return;
      }

      // Show a local notification immediately with dynamic content
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationTitle,
          body: notificationBody,
          sound: "default",
          priority: "high",
          vibrate: [200, 100, 200],
        },
        trigger: null, // Trigger immediately
      });

      // Call the onClick callback if provided
      if (onClick && typeof onClick === "function") {
        onClick();
      }

      // Show feedback if enabled
      if (showFeedback) {
        Alert.alert("Success", "Notification sent successfully!");
      }
    } catch (error) {
      console.error("Error showing notification:", error);
      if (showFeedback) {
        Alert.alert("Error", "Failed to send notification");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => showNotification()}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      {showToken && expoPushToken && (
        <Text style={styles.tokenText}>
          Token: {expoPushToken.substring(0, 20)}...
        </Text>
      )}

      {notification && (
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>Received Notification:</Text>
          <Text>
            Title: {notification?.request?.content?.title || "No Title"}
          </Text>
          <Text>Body: {notification?.request?.content?.body || "No Body"}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4682B4",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tokenText: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
  },
  notificationInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    maxWidth: "100%",
  },
  notificationTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
