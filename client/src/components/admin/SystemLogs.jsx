// client/src/components/admin/SystemLogs.jsx

import { useEffect, useState } from "react";
import api from "../../api/api";

export default function SystemLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (currentUser.role === "superadmin") {
      fetchLogs();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/system-logs");
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load system logs", err);
    } finally {
      setLoading(false);
    }
  };

  if (currentUser.role !== "superadmin") return null;

  return (
    <div className="mt-8 bg-slate-800 p-4 rounded border border-slate-700">
      <h2 className="text-white font-semibold mb-4">
        System Audit Logs
      </h2>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-slate-400 text-sm">No logs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="border-b border-slate-600 text-left">
                <th className="py-2">Action</th>
                <th>Performed By</th>
                <th>Target User</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-b border-slate-700"
                >
                  <td className="py-2">{log.action}</td>

                  <td>
                    {log.performedBy?.name || "N/A"}
                    <br />
                    <span className="text-xs text-slate-400">
                      {log.performedBy?.email}
                    </span>
                  </td>

                  <td>
                    {log.targetUser?.name || "-"}
                    <br />
                    <span className="text-xs text-slate-400">
                      {log.targetUser?.email || ""}
                    </span>
                  </td>

                  <td>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}