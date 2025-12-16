import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    updateFavoritesLanguage();
  }, [currentLanguage]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const updateFavoritesLanguage = async () => {
    try {
      const updatedFavorites = favorites.map((item) => ({
        ...item,
        title: item[currentLanguage]?.title || item.en?.title || item.title,
      }));
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error updating favorites language:", error);
    }
  };

  const generateFavoriteId = (item) => {
    if (item.type === "verse") {
      return `verse_${item.chapter}_${item.number}`;
    } else if (item.type === "chapter") {
      return `chapter_${item.chapter}`;
    } else {
      return item.id || `${item.type}_${Date.now()}`;
    }
  };

  const addFavorite = async (item) => {
    try {
      // Use consistent and unique ID
      const id = generateFavoriteId(item);

      const itemWithMetadata = {
        ...item,
        id,
        addedAt: Date.now(),
        [currentLanguage]: { title: item.title },
        en: { title: item.title },
      };

      const alreadyExists = favorites.find((fav) => fav.id === id);
      if (alreadyExists) return;

      const newFavorites = [...favorites, itemWithMetadata];
      setFavorites(newFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (itemOrId) => {
    try {
      const id =
        typeof itemOrId === "string" ? itemOrId : generateFavoriteId(itemOrId);

      const newFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(newFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const clearFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem("favorites");
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };

  const isFavorite = (itemId) => {
    return favorites.some((item) => item.id === itemId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
