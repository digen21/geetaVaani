import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "./components";
import {
  FavoritesProvider,
  GlobalStyleProvider,
  LanguageProvider,
  ThemeProvider,
} from "./contexts";
import { AppNavigator } from "./navigation";
import { i18n } from "./services";

const App = () => {
  useEffect(() => {
    /**
     * Asynchronously loads the Poppins-Regular font.
     *
     * This function attempts to load the Poppins-Regular font from the specified path.
     * If the font is loaded successfully, a message is logged to the console.
     * If there is an error during the font loading process, the error is caught and logged to the console.
     *
     * @async
     * @function checkFonts
     * @returns {Promise<void>} A promise that resolves when the font is loaded or rejects if there is an error.
     */
    const checkFonts = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("./assets/fonts/en/Poppins-Regular.ttf"),
        });
        console.log("English font loaded successfully");
      } catch (error) {
        console.error("Font loading error:", error);
      }
    };

    checkFonts();
  }, []);

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <GlobalStyleProvider>
                <SafeAreaProvider>
                  <NavigationContainer>
                    <AppNavigator />
                  </NavigationContainer>
                </SafeAreaProvider>
              </GlobalStyleProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </LanguageProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
