import { NavigationContainer } from "@react-navigation/native";
import { I18nextProvider } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  FavoritesProvider,
  GlobalStyleProvider,
  LanguageProvider,
  ThemeProvider,
} from "./contexts";
import { AppNavigator } from "./navigation";
import { i18n } from "./services";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <GlobalStyleProvider>
              <SafeAreaProvider>
                <NavigationContainer>
                  {/* <Header /> */}
                  <AppNavigator />
                </NavigationContainer>
              </SafeAreaProvider>
            </GlobalStyleProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
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
