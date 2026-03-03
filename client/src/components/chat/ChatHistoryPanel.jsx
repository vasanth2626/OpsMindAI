// client/src/components/chat/ChatHistoryPanel.jsx

import React from "react";

/**
 * Dark SaaS Chat History Panel
 */

const ChatHistoryPanel = ({ chats = [], onSelect }) => {
  return (
    <div className="h-full flex flex-col bg-surface">

      {/* ✅ Header */}
      <div className="px-6 py-5 border-b border-borderSubtle">
        <h2 className="text-base font-semibold text-white">
          Chat History
        </h2>
        <p className="text-xs text-muted mt-1">
          Previous conversations
        </p>
      </div>

      {/* ✅ Chat List */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">

        {chats.length === 0 ? (
          <p className="text-sm text-muted text-center mt-8">
            No previous conversations found.
          </p>
        ) : (
          chats.map((chat, index) => (
            <div
              key={chat._id || index}
              onClick={() => onSelect && onSelect(chat)}
              className="bg-card border border-borderSubtle rounded-xl p-4 cursor-pointer hover:bg-cardHover hover:border-primary transition-all duration-200"
            >
              <p className="text-sm font-medium text-white truncate">
                {chat.question}
              </p>

              {chat.createdAt && (
                <p className="text-xs text-muted mt-2">
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatHistoryPanel;