// client/src/pages/InspectPage.jsx

import { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

export default function InspectPage() {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const inspectPDF = async () => {
    if (!file) {
      toast.error("Please select a PDF to inspect.");
      return;
    }

    const fd = new FormData();
    fd.append("document", file);

    setLoading(true);
    setReport(null);

    try {
      const res = await api.post("/inspect", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Backend returns: { success, pageCount, totalTextLength, empty }
      setReport(res.data);
    } catch (e) {
      const msg = e.response?.data?.message || e.message || "Failed to inspect PDF";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Inspect PDF
        </h1>
        <p className="text-sm text-muted mt-2">
          Quickly check if a PDF has extractable text and is suitable for indexing.
        </p>
      </div>

      {/* Inspect Card */}
      <div className="bg-card border border-borderSubtle rounded-2xl shadow-card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0] || null)}
            className="text-sm text-gray-200"
          />
          <button
            type="button"
            onClick={inspectPDF}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Inspecting..." : "Inspect"}
          </button>
        </div>

        {/* Report */}
        {report && (
          <div className="mt-6 space-y-2 text-sm text-gray-200">
            <p>
              <span className="font-medium text-white">Pages:</span>{" "}
              {report.pageCount}
            </p>
            <p>
              <span className="font-medium text-white">Total text length:</span>{" "}
              {report.totalTextLength} characters
            </p>
            <p>
              <span className="font-medium text-white">Type:</span>{" "}
              {report.empty
                ? "No extractable text (likely scanned/image PDF)"
                : "Text-based PDF (good for indexing)"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}