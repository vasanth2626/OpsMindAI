// client/src/pages/UploadPage.jsx

import React, { useState } from "react";
import { uploadDocument } from "../api/uploadApi";
import toast from "react-hot-toast";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState("General");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastDurationMs, setLastDurationMs] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a PDF file before uploading.");
      return;
    }

    setProgress(0);
    setLoading(true);
    setLastDurationMs(null);

    const start = Date.now();

    try {
      const res = await uploadDocument(file, department, (percent) =>
        setProgress(percent)
      );

      const elapsedMs = Date.now() - start;
      setLastDurationMs(elapsedMs);
      const seconds = (elapsedMs / 1000).toFixed(2);

      // 🔍 If backend says no chunks => image-only or no text
      if (res.chunkCount === 0) {
        toast.error(
          `This PDF has no extractable text (likely a scanned/image PDF). It cannot be used for search. (${seconds}s)`
        );
      } else {
        toast.success(
          `${res.message || "Upload & indexing completed."} (${seconds}s)`
        );
      }

      // Optional: clear file selection after upload
      // setFile(null);
    } catch (err) {
      const msg =
        err?.message ||
        (typeof err === "string" ? err : "Upload failed.");
      toast.error(msg);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">

      {/* ✅ Header - high contrast on dark background */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-white">
          Document Upload
        </h1>
        <p className="text-sm text-muted mt-2">
          Upload internal PDF documents for AI indexing and retrieval.
        </p>
      </div>

      {/* ✅ Upload Card */}
      <div className="bg-card border border-borderSubtle rounded-2xl shadow-card p-8">

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ✅ Department */}
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Department / Category
            </label>
            <input
              className="w-full px-4 py-3 bg-surface border border-borderSubtle rounded-xl text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* ✅ File Upload */}
          <div>
            <label className="block text-sm font-medium text-muted mb-3">
              PDF Document
            </label>

            <div className="border-2 border-dashed border-borderSubtle rounded-2xl p-8 text-center bg-surface hover:border-primary transition-all">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0] || null)}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-sm text-muted"
              >
                Click to select a PDF file
              </label>

              {file && (
                <p className="mt-4 text-sm text-white font-medium">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>

          {/* ✅ Progress */}
          {loading && (
            <div>
              <div className="w-full bg-surface rounded-full h-3 overflow-hidden border border-borderSubtle">
                <div
                  className="h-3 bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted mt-2">
                Uploading & indexing... {progress}%
              </p>
              <p className="text-[11px] text-muted/70">
                Large PDFs may take a few seconds to process.
              </p>
            </div>
          )}

          {/* ✅ Submit */}
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-dark transition-all text-white font-medium disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>

        {/* ✅ Show last duration */}
        {lastDurationMs !== null && (
          <p className="mt-4 text-xs text-muted">
            Last upload & indexing completed in{" "}
            <span className="font-semibold text-white">
              {(lastDurationMs / 1000).toFixed(2)}s
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadPage;