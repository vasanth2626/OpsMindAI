// client/src/components/admin/SystemOverview.jsx

import React, { useEffect, useState } from "react";
import api from "../../api/api";

const SystemOverview = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isSuperAdmin = currentUser?.role === "superadmin";

  useEffect(() => {
    if (isSuperAdmin) {
      fetchOverview();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin/system-overview");
      setOverview(res.data);
    } catch (err) {
      console.error("Failed to load system overview", err);
      setError("Failed to load system overview.");
    } finally {
      setLoading(false);
    }
  };

  // Only superadmin should see this panel
  if (!isSuperAdmin) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold text-lg">
          Superadmin – System Overview
        </h2>
        {loading && (
          <span className="text-xs text-slate-400">Loading...</span>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-900/30 border border-red-500 rounded p-2 mb-3">
          {error}
        </div>
      )}

      {!loading && overview && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OverviewCard title="Total Users" value={overview.totalUsers} />
          <OverviewCard title="Total Admins" value={overview.totalAdmins} />
          <OverviewCard
            title="Locked Accounts"
            value={overview.lockedAccounts}
          />
          <OverviewCard title="Total Documents" value={overview.totalDocs} />
          <OverviewCard title="Total Queries" value={overview.totalQueries} />
          <OverviewCard
            title="Avg Confidence"
            value={`${overview.avgConfidence}%`}
          />
        </div>
      )}
    </div>
  );
};

const OverviewCard = ({ title, value }) => (
  <div className="bg-slate-900 p-4 rounded border border-slate-700">
    <p className="text-sm text-slate-400">{title}</p>
    <h3 className="text-2xl font-bold text-white mt-1">
      {value ?? 0}
    </h3>
  </div>
);

export default SystemOverview;