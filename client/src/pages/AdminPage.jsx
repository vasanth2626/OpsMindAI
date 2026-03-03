// client/src/pages/AdminPage.jsx

import React, { useEffect, useState } from "react";
import api from "../api/api"; // ✅ use centralized axios instance
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import CreateUserForm from "../components/admin/CreateUserForm";
import UserManagement from "../components/admin/UserManagement";
import SystemLogs from "../components/admin/SystemLogs";
import SystemOverview from "../components/admin/SystemOverview";

const AdminPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/stats", {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load admin stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportToPDF = async () => {
    const element = document.getElementById("admin-report");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("OpsMind-Analytics-Report.pdf");
  };

  return (
    <div className="h-full p-6 space-y-8 overflow-auto bg-slate-950 text-white">
      {/* ✅ Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
          onChange={(e) =>
            setDateRange({ ...dateRange, startDate: e.target.value })
          }
        />
        <input
          type="date"
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
          onChange={(e) =>
            setDateRange({ ...dateRange, endDate: e.target.value })
          }
        />
        <button
          onClick={fetchStats}
          className="bg-indigo-600 px-4 py-2 rounded text-sm"
        >
          Apply Filter
        </button>

        <button
          onClick={exportToPDF}
          className="bg-green-600 px-4 py-2 rounded text-sm"
        >
          Export PDF
        </button>
      </div>

      <div id="admin-report" className="space-y-6">
        {/* ✅ Superadmin System Overview */}
        {currentUser.role === "superadmin" && <SystemOverview />}

        {/* ✅ Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Queries"
            value={stats.totalQueries}
            loading={loading}
          />
          <StatCard
            title="Documents Indexed"
            value={stats.docsIndexed}
            loading={loading}
          />
          <StatCard
            title="Hallucinations"
            value={stats.hallucinations}
            loading={loading}
            color="text-red-400"
          />
          <StatCard
            title="Accuracy"
            value={`${stats.accuracy || 0}%`}
            loading={loading}
            color="text-green-400"
          />
        </div>

        {/* ✅ Confidence Card */}
        <div className="bg-slate-800 p-4 rounded border border-slate-700">
          <p className="text-sm text-slate-400">Average Confidence</p>
          <h2 className="text-2xl font-bold text-blue-400 mt-1">
            {loading ? "..." : `${stats.avgConfidence || 0}%`}
          </h2>
        </div>

        {/* ✅ Charts */}
        <ChartSection
          title="📊 Most Accessed Documents"
          data={stats.topDocuments}
          loading={loading}
        />

        <ChartSection
          title="👥 Most Active Users"
          data={stats.topUsers}
          loading={loading}
        />
      </div>

      {/* ✅ Create User (Admin + Superadmin) */}
      <CreateUserForm />

      {/* ✅ Superadmin Only Sections */}
      {currentUser.role === "superadmin" && (
        <>
          <UserManagement />
          <SystemLogs />
        </>
      )}
    </div>
  );
};

const StatCard = ({ title, value, loading, color = "text-white" }) => (
  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
    <p className="text-sm text-slate-400">{title}</p>
    <h2 className={`text-2xl font-bold mt-1 ${color}`}>
      {loading ? "..." : value || 0}
    </h2>
  </div>
);

const ChartSection = ({ title, data, loading }) => (
  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {loading ? (
      <p className="text-slate-400 text-sm">Loading...</p>
    ) : data?.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="_id" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-slate-400 text-sm">No data available.</p>
    )}
  </div>
);

export default AdminPage;