import React, { createContext, useState, useContext } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

/**
 * ThemeProvider component that manages the application's theme state.
 *
 * This provider detects the system's color scheme and allows toggling between
 * light and dark modes. It provides theme-related properties such as colors
 * and the current theme mode.
 *
 * @param {{ children: React.ReactNode }} props - The child components wrapped by the provider.
 * @returns {JSX.Element} The ThemeContext provider component.
 */
export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  /**
   * Toggles the theme between light and dark mode.
   */
  const toggleTheme = () => setIsDark(!isDark);

  /**
   * Color palette based on the selected theme.
   */
  const colors = {
    primary: isDark ? "#4A90E2" : "#1E88E5",
    background: isDark ? "#121212" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
    cardBg: isDark ? "#1E1E1E" : "#F8F9FA",
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Make sure this hook is properly exported
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
