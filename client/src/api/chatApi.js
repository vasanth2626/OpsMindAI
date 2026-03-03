// client/src/api/chatApi.js
import api from './api';

/**
 * Send a question to OpsMind AI and get back { answer, sources }.
 * @param {string} question - The user’s question text
 * @returns {Promise<{answer: string, sources: Array}>}
 */
export const askQuestion = async (question) => {
  try {
    // POST to /api/query (via Vite proxy) instead of /chat/ask
    const res = await api.post('/query', { question });
    return res.data; // { answer: "...", sources: [...] }
  } catch (error) {
    // Extract backend error or fallback message
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Failed to get a response from OpsMind AI. Please try again.';
    throw new Error(errorMessage);
  }
};