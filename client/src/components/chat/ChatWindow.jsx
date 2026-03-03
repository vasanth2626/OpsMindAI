// client/src/components/chat/ChatWindow.jsx

import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import CitationCard from "./CitationCard";
import ChatHistoryPanel from "./ChatHistoryPanel";
import SourcePreviewModal from "./SourcePreviewModal";
import useChatStream from "../../hooks/useChatStream";

const ChatWindow = () => {
  const { messages, loading, error, sendMessage } = useChatStream();

  const [input, setInput] = useState("");
  const [selectedSource, setSelectedSource] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    await sendMessage(text);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setChatHistory([]);
  }, []);

  const renderConfidence = (confidence) => {
    if (confidence === undefined) return null;

    const percentage = (confidence * 100).toFixed(1);

    if (confidence >= 0.7)
      return (
        <div className="text-xs text-success mt-2">
          High Confidence ({percentage}%)
        </div>
      );

    if (confidence >= 0.5)
      return (
        <div className="text-xs text-warning mt-2">
          Medium Confidence ({percentage}%)
        </div>
      );

    return (
      <div className="text-xs text-danger mt-2">
        Low Confidence ({percentage}%)
      </div>
    );
  };

  return (
    <div className="flex h-full bg-background">

      {/* ✅ Chat History Panel */}
      <div className="hidden lg:block w-72 border-r border-borderSubtle bg-surface">
        <ChatHistoryPanel
          chats={chatHistory}
          onSelect={(chat) => console.log("Selected chat:", chat)}
        />
      </div>

      {/* ✅ Main Chat */}
      <div className="flex flex-col flex-1">

        {/* ✅ Header */}
        <div className="border-b border-borderSubtle px-8 py-5 bg-background">
          <h2 className="text-lg font-semibold text-white">
            AI Knowledge Assistant
          </h2>
          <p className="text-sm text-muted">
            Answers generated strictly from internal indexed documents.
          </p>
        </div>

        {/* ✅ Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">

          {messages.length === 0 && (
            <div className="text-sm text-muted text-center mt-20">
              Ask something like:
              <span className="italic text-white ml-2">
                “What is our refund policy?”
              </span>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx}>
              <MessageBubble role={msg.role} content={msg.content} />

              {msg.role === "assistant" &&
                msg.confidence !== undefined &&
                renderConfidence(msg.confidence)}

              {msg.role === "assistant" &&
                Array.isArray(msg.sources) &&
                msg.sources.length > 0 && (
                  <div className="mt-4 ml-4">
                    <div className="text-xs text-muted mb-3">
                      Referenced Documents
                    </div>
                    <div className="space-y-3">
                      {msg.sources.slice(0, 3).map((s, i) => (
                        <CitationCard
                          key={i}
                          source={s}
                          onPreview={(src) => setSelectedSource(src)}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}

          {error && (
            <div className="text-sm text-danger bg-danger/10 border border-danger rounded-xl p-4">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ✅ Typing Indicator */}
        {loading && (
          <div className="px-8 pb-3 text-sm text-muted">
            Analysing internal documents...
          </div>
        )}

        {/* ✅ Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-borderSubtle px-8 py-5 bg-background flex items-center gap-4"
        >
          <input
            className="flex-1 px-4 py-3 bg-card border border-borderSubtle rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Ask about policies, HR rules, SOPs..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark transition-all text-white font-medium disabled:opacity-60"
          >
            {loading ? "Processing..." : "Ask"}
          </button>
        </form>
      </div>

      {/* ✅ Modal */}
      {selectedSource && (
        <SourcePreviewModal
          source={selectedSource}
          onClose={() => setSelectedSource(null)}
        />
      )}
    </div>
  );
};

export default ChatWindow;