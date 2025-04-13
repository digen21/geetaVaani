import axios from "axios";

const API_BASE = "https://your-api-endpoint.com/api";

export const getChapters = async (lang = "en") => {
  const response = await axios.get(`${API_BASE}/chapters?lang=${lang}`);
  return response.data;
};

export const getVerses = async (chapterNumber, lang = "en") => {
  const response = await axios.get(
    `${API_BASE}/verses/${chapterNumber}?lang=${lang}`
  );
  return response.data;
};

// Add more API functions as needed
