import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const STORAGE_KEY = "readVerses";

/**
 * Custom React hook to manage the read/unread state of verses using AsyncStorage.
 *
 * @returns {Object} An object containing:
 *   - readVerses {Object}: A mapping of read verses, keyed by `${chapter}_${verse}`.
 *   - markAsRead {Function}: Marks a specific verse as read. Accepts (chapter: string|number, verse: string|number).
 *   - isRead {Function}: Checks if a specific verse is read. Accepts (chapter: string|number, verse: string|number) and returns {boolean}.
 *   - markUnread {Function}: Marks a specific verse as unread. Accepts (chapter: string|number, verse: string|number).
 */
const useReadVerses = () => {
  const [readVerses, setReadVerses] = useState([]);

  // Load + migrate on mount
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return;

      const parsed = JSON.parse(data);

      // 🔁 Migration: old object → new array
      if (!Array.isArray(parsed)) {
        const migrated = Object.keys(parsed).map((key) => {
          const [ch, verse] = key.split("_").map(Number);
          return {
            ch,
            verse,
            isRead: true,
            date: Date.now(), // fallback timestamp
          };
        });

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));

        setReadVerses(migrated);
      } else {
        setReadVerses(parsed);
      }
    })();
  }, []);

  // Mark a verse as read (append style)
  const markAsRead = (chapter, verse) => {
    setReadVerses((prev) => {
      const exists = prev.some((v) => v.ch === chapter && v.verse === verse);
      if (exists) return prev;

      const updated = [
        ...prev,
        {
          ch: chapter,
          verse,
          isRead: true,
          date: Date.now(),
        },
      ];

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Check if a verse is read
  const isRead = (chapter, verse) =>
    readVerses.some((v) => v.ch === chapter && v.verse === verse && v.isRead);

  // Mark a verse as unread (remove entry)
  const markUnread = (chapter, verse) => {
    setReadVerses((prev) => {
      const updated = prev.filter(
        (v) => !(v.ch === chapter && v.verse === verse)
      );

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Get most recent read verse
  const getMostRecentRead = () => {
    if (!readVerses.length) return null;
    return readVerses.reduce((a, b) => (b.date > a.date ? b : a));
  };

  return {
    readVerses,
    markAsRead,
    isRead,
    markUnread,
    getMostRecentRead,
  };
};

export default useReadVerses;
