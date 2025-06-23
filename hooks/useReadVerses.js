import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "readVerses";

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
  const [readVerses, setReadVerses] = useState({});

  // Load read verses from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setReadVerses(JSON.parse(data));
    });
  }, []);

  // Mark a verse as read
  const markAsRead = (chapter, verse) => {
    setReadVerses((prev) => {
      const key = `${chapter}_${verse}`;
      if (prev[key]) return prev; // already read
      const updated = { ...prev, [key]: true };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Check if a verse is read
  const isRead = (chapter, verse) => !!readVerses[`${chapter}_${verse}`];
  const markUnread = (chapter, verse) => {
    setReadVerses((prev) => {
      const key = `${chapter}_${verse}`;
      if (!prev[key]) return prev; // not read
      const updated = { ...prev };
      delete updated[key];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { readVerses, markAsRead, isRead, markUnread };
};

export default useReadVerses;
