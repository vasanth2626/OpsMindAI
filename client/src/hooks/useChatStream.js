// client/src/hooks/useChatStream.js

import { useState } from "react";
import { askQuestion } from "../api/chatApi";

export const useChatStream = () => {
  const [messages, setMessages] = useState([]); 
  // msg = { role: 'user'|'assistant', content, sources?, confidence?, timestamp? }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (text) => {
    const trimmed = (text || "").trim();
    if (!trimmed) return;

    setError("");

    const userMsg = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);
    try {
      const { answer, sources, confidence } = await askQuestion(trimmed);

      const botMsg = {
        role: "assistant",
        content: answer || "",
        sources: sources || [],
        confidence: confidence ?? undefined,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const msg =
        err?.message ||
        (typeof err === "string" ? err : "Something went wrong");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};

export default useChatStream;