import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

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
  const systemScheme = useColorScheme(); // "light" | "dark"
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  useEffect(() => {
    // Load theme from storage on mount
    AsyncStorage.getItem("themeMode").then((mode) => {
      if (mode === "dark") setIsDark(true);
      else if (mode === "light") setIsDark(false);
      else setIsDark(systemScheme === "dark"); // fallback to system theme
    });
    // Listen for system theme changes if user hasn't chosen a theme
    const listener = ({ colorScheme }) => {
      AsyncStorage.getItem("themeMode").then((mode) => {
        if (!mode) setIsDark(colorScheme === "dark");
      });
    };
    const subscription = Appearance.addChangeListener(listener);
    return () => subscription.remove();
  }, [systemScheme]);

  /**
   * Toggles the theme between light and dark mode.
   */
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      AsyncStorage.setItem("themeMode", newMode ? "dark" : "light");
      return newMode;
    });
  };

  /**
   * Color palette based on the selected theme.
   */
  const colors = {
    primary: isDark ? "#4A90E2" : "#007AFF",
    textPrimary: isDark ? "#E0E0E0" : "#007AFF",
    background: isDark ? "#121212" : "#EEEEEE",
    text: isDark ? "#E0E0E0" : "#000000",
    cardBg: isDark ? "#1E1E1E" : "#F8F9FA",
    border: isDark ? "#333" : "#e0e0e0",
    icon: isDark ? "#FFD700" : "#007AFF",
    textSecondary: isDark ? "#B0B0B0" : "#8E8E93",
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
