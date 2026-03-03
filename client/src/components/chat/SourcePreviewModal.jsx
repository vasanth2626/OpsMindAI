// client/src/components/chat/SourcePreviewModal.jsx

import React, { useEffect } from "react";

/**
 * Dark SaaS Source Preview Modal
 */

const SourcePreviewModal = ({ source, onClose }) => {
  if (!source) return null;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ✅ Modal Container */}
      <div
        className="bg-card w-11/12 max-w-4xl max-h-[85vh] rounded-2xl shadow-card border border-borderSubtle flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Header */}
        <div className="flex justify-between items-start px-8 py-6 border-b border-borderSubtle">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {source.filename || "Document"}
            </h2>

            <p className="text-xs text-muted mt-2">
              Page {source.pageNumber || "—"}
              {source.score !== undefined &&
                ` • Relevance: ${(source.score * 100).toFixed(1)}%`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-muted hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* ✅ Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
          {source.content}
        </div>

        {/* ✅ Footer */}
        <div className="px-8 py-4 border-t border-borderSubtle text-xs text-muted bg-surface">
          Retrieved directly from indexed internal documents.
        </div>
      </div>
    </div>
  );
};

export default SourcePreviewModal;