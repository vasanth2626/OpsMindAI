// client/src/components/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import StatsCard from "./StatsCard";
import CreateUserForm from "./CreateUserForm";
import { getDocuments } from "../../api/uploadApi";
import { getLogStats } from "../../api/systemLogApi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper to get YYYY-MM-DD string
function toDateInputString(date) {
  return date.toISOString().slice(0, 10);
}

// Quick Log Stats Card with date range filter
function QuickLogStatsCard() {
  // Default: last 7 days
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 6);

  const [start, setStart] = useState(toDateInputString(weekAgo));
  const [end, setEnd] = useState(toDateInputString(today));
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await getLogStats({ start, end });
      setStats(res.data);
    } catch (err) {
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, [start, end]);

  return (
    <div className="bg-card rounded-xl p-4 border border-borderSubtle">
      <div className="flex items-center gap-4 mb-2">
        <h3 className="text-lg font-semibold text-white">Quick Log Stats</h3>
        <input
          type="date"
          value={start}
          max={end}
          onChange={e => setStart(e.target.value)}
          className="px-2 py-1 rounded bg-surface border border-borderSubtle text-xs text-white"
        />
        <span className="text-muted">to</span>
        <input
          type="date"
          value={end}
          min={start}
          max={toDateInputString(new Date())}
          onChange={e => setEnd(e.target.value)}
          className="px-2 py-1 rounded bg-surface border border-borderSubtle text-xs text-white"
        />
        <button
          onClick={fetchStats}
          disabled={loading}
          className="ml-2 px-3 py-1 rounded bg-primary text-white text-xs font-medium hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      <ul className="text-sm text-gray-300 space-y-1">
        {Object.keys(stats).length === 0 && (
          <li className="text-muted">No log actions in this range.</li>
        )}
        {Object.entries(stats).map(([action, count]) => (
          <li key={action}>
            <span className="font-medium text-white">{action}</span>: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQueries: 0,
    docsIndexed: 0,
    failureRate: "0%",
    hallucinationsPrevented: 0,
  });

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Mock query trend data (replace with real /admin/stats later)
  const queryTrendData = [
    { day: "Mon", queries: 32 },
    { day: "Tue", queries: 45 },
    { day: "Wed", queries: 51 },
    { day: "Thu", queries: 39 },
    { day: "Fri", queries: 60 },
    { day: "Sat", queries: 24 },
    { day: "Sun", queries: 18 },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const docs = await getDocuments();
        setDocuments(docs || []);

        setStats((prev) => ({
          ...prev,
          docsIndexed: docs?.length || 0,
          totalQueries: 123,
          failureRate: "2.5%",
          hallucinationsPrevented: 17,
        }));
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ Aggregate documents by department for bar chart
  const docsByDepartment = React.useMemo(() => {
    const counts = {};
    documents.forEach((doc) => {
      const dept = doc.department || "General";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.entries(counts).map(([department, count]) => ({
      department,
      count,
    }));
  }, [documents]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger/10 border border-danger text-danger rounded-xl p-4 shadow-card">
        <p className="font-medium">Error loading dashboard</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 text-sm bg-danger rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* ✅ Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted">
            Monitor system usage and document indexing performance
          </p>
        </div>

        <div className="px-4 py-1 rounded-full bg-card border border-borderSubtle text-xs text-muted">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* ✅ Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Queries" value={stats.totalQueries} />
        <StatsCard label="Documents Indexed" value={stats.docsIndexed} highlight />
        <StatsCard label="Failure Rate" value={stats.failureRate} />
        <StatsCard
          label="Hallucinations Prevented"
          value={stats.hallucinationsPrevented}
        />
      </div>

      {/* ✅ Quick Log Stats Card with date range */}
      <QuickLogStatsCard />

      {/* ✅ Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 🔹 Queries Trend Chart */}
        <div className="bg-card rounded-2xl shadow-card border border-borderSubtle p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Weekly Query Volume
          </h2>
          <p className="text-xs text-muted mb-4">
            Number of queries handled each day (sample data)
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={queryTrendData}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #1F2937",
                    color: "#E5E7EB",
                    fontSize: "0.8rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🔹 Documents by Department Chart */}
        <div className="bg-card rounded-2xl shadow-card border border-borderSubtle p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Documents by Department
          </h2>
          <p className="text-xs text-muted mb-4">
            Distribution of indexed documents across departments
          </p>
          <div className="h-64">
            {docsByDepartment.length === 0 ? (
              <p className="text-sm text-muted mt-6">
                No documents available for chart.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={docsByDepartment}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="department"
                    stroke="#9CA3AF"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #1F2937",
                      color: "#E5E7EB",
                      fontSize: "0.8rem",
                    }}
                  />
                  <Bar dataKey="count" fill="#06B6D4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* ✅ User Management Card */}
      <div className="bg-card rounded-2xl shadow-card border border-borderSubtle p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          User Management
        </h2>
        <CreateUserForm />
      </div>

      {/* ✅ Documents Panel */}
      <div className="bg-card rounded-2xl shadow-card border border-borderSubtle">

        <div className="flex justify_between items-center px-6 py-4 border-b border-borderSubtle">
          <h2 className="text-lg font-semibold text_white">
            Indexed Documents
          </h2>
          <span className="text-sm text-muted">
            {documents.length} documents
          </span>
        </div>

        {documents.length === 0 ? (
          <div className="p-6 text-sm text-muted italic">
            No documents indexed yet.
          </div>
        ) : (
          <div className="divide-y divide-borderSubtle max-h-96 overflow-y-auto">
            {documents.map((doc, index) => (
              <div
                key={doc._id || index}
                className="px-6 py-4 flex justify-between items-center hover:bg-cardHover transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {doc.originalFilename || doc.filename || "Unnamed Document"}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {doc.department || "General"} • {doc.pageCount || "?"} pages •
                    <span
                      className={`ml-1 font-medium ${
                        doc.status === "completed"
                          ? "text-success"
                          : "text-warning"
                      }`}
                    >
                      {doc.status || "Unknown"}
                    </span>
                  </p>
                </div>

                <span className="text-xs text-muted">
                  {doc.createdAt
                    ? new Date(doc.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted">
        Connect to <code className="text-accent">/api/admin/stats</code> for real analytics data.
      </p>
    </div>
  );
};

export default Dashboard;