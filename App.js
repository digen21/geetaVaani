import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  GlobalStyleProvider,
  LanguageProvider,
  ThemeProvider,
} from "./contexts";
import { AboutScreen } from "./screens";
import { i18n } from "./services";

export default function App() {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <GlobalStyleProvider>
            <SafeAreaProvider>
              <AboutScreen />
            </SafeAreaProvider>
          </GlobalStyleProvider>
        </LanguageProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}
