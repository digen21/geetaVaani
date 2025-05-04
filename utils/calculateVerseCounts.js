/**
 * Calculate the number of verses for each chapter.
 * @param {Array} verses - The array of verses.
 * @returns {Object} An object where keys are chapter IDs and values are verse counts.
 */
const calculateVerseCounts = (verses) => {
  const verseCounts = {};
  verses.forEach((verse) => {
    if (verse.chapter) {
      verseCounts[verse.chapter] = (verseCounts[verse.chapter] || 0) + 1;
    }
  });
  return verseCounts;
};

export default calculateVerseCounts;
