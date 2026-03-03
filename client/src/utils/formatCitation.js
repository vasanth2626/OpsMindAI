// V:\COLLEGE  FINAL YAER PROJECT\Review\client\src\utils\formatCitation.js
export const formatCitation = (source) => {
  if (!source) return '';

  const { documentId, filename, pageNumber, score } = source;

  // Safely format document identifier
  const idString =
    typeof documentId === 'string'
      ? documentId
      : documentId?._id || '';

  const name = filename || idString || 'Unknown document';
  const page = pageNumber ? `, page ${pageNumber}` : '';
  const conf =
    typeof score === 'number'
      ? ` (relevance: ${(score * 100).toFixed(1)}%)`
      : '';

  return `${name}${page}${conf}`;
};