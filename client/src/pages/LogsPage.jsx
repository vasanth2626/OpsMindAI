import { useEffect, useState } from "react";
import { getSystemLogs } from "../api/systemLogApi";
import SystemLogTable from "../components/admin/SystemLogTable";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function LogsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Superadmin-only guard (extra safety)
  if (user.role !== "superadmin") {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getSystemLogs();
        setLogs(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        Loading logs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">System Logs</h1>
        <p className="text-sm text-muted mt-1">
          Recent administrative events
        </p>
      </div>

      <SystemLogTable logs={logs} />
    </div>
  );
}