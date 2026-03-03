// client/src/components/chat/CitationCard.jsx

import React from "react";
import { formatCitation } from "../../utils/formatCitation";

/**
 * Dark SaaS Citation Card
 */

const CitationCard = ({ source, onPreview }) => {
  if (!source) return null;

  const text = formatCitation(source);
  if (!text) return null;

  return (
    <div
      onClick={() => onPreview && onPreview(source)}
      className="cursor-pointer bg-card border border-borderSubtle rounded-xl p-4 hover:bg-cardHover hover:border-primary transition-all duration-200"
      title="Click to preview source"
    >
      {/* ✅ Filename */}
      <div className="text-sm font-medium text-white truncate">
        {source.filename || "Document"}
      </div>

      {/* ✅ Page */}
      {source.pageNumber && (
        <div className="text-xs text-muted mt-1">
          Page {source.pageNumber}
        </div>
      )}

      {/* ✅ Relevance */}
      {source.score !== undefined && (
        <div className="text-xs text-accent mt-3 font-medium">
          Relevance: {(source.score * 100).toFixed(1)}%
        </div>
      )}
    </div>
  );
};

export default CitationCard;