// client/src/components/chat/MessageBubble.jsx

import React from "react";

/**
 * Dark SaaS Message Bubble
 */

const MessageBubble = ({ role, content, timestamp }) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-8 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* ✅ Assistant Avatar */}
      {!isUser && (
        <div className="mr-4 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-white shadow-glow">
            AI
          </div>
        </div>
      )}

      {/* ✅ Bubble */}
      <div className="max-w-2xl flex flex-col">

        <div
          className={`px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap rounded-2xl border transition-all ${
            isUser
              ? "bg-primary text-white border-primary shadow-glow"
              : "bg-card text-gray-200 border-borderSubtle"
          }`}
        >
          {content}
        </div>

        {/* ✅ Timestamp */}
        {timestamp && (
          <div
            className={`text-xs mt-2 ${
              isUser ? "text-right text-muted" : "text-muted"
            }`}
          >
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>

      {/* ✅ User Avatar */}
      {isUser && (
        <div className="ml-4 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-card border border-borderSubtle flex items-center justify-center text-sm font-semibold text-gray-300">
            You
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;