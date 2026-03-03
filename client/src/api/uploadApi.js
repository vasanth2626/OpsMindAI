import api from './api';

/**
 * Upload a PDF document for ingestion (Admin).
 * Calls POST /api/upload via the Vite proxy.
 *
 * @param {File} file – The PDF file object
 * @param {string} department – Tag or category for this document
 * @param {function} onProgress – Optional callback(percent) during upload
 * @returns {Promise<Object>} – { message, documentId, chunkCount, pageCount }
 */
export const uploadDocument = async (file, department = 'General', onProgress) => {
  if (!file) {
    throw new Error('No file selected');
  }

  const formData = new FormData();
  formData.append('document', file);       // matches multer field name
  formData.append('department', department);

  try {
    const res = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (!onProgress || !event.total) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      },
    });
    return res.data;
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Failed to upload document. Please try again.';
    throw new Error(msg);
  }
};

/**
 * Fetch the list of indexed documents (Admin).
 * Calls GET /api/admin/documents via the proxy.
 *
 * @returns {Promise<Array>} – Array of document metadata
 */
export const getDocuments = async () => {
  try {
    const res = await api.get('/admin/documents');
    return res.data;
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Failed to fetch documents.';
    throw new Error(msg);
  }
};