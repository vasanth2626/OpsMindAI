// src\components\admin\UserManagement.jsx

import { useEffect, useState } from "react";
import api from "../../api/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (currentUser.role === "superadmin") {
      fetchUsers();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  const promote = async (id) => {
    try {
      await api.put(`/admin/promote/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Promote failed", err);
    }
  };

  const demote = async (id) => {
    try {
      await api.put(`/admin/demote/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Demote failed", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (currentUser.role !== "superadmin") return null;

  return (
    <div className="mt-6 bg-slate-800 p-4 rounded border border-slate-700">
      <h2 className="text-white font-semibold mb-4">
        User Management (Superadmin)
      </h2>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-slate-400 text-sm">No users found.</p>
      ) : (
        <table className="w-full text-sm text-white">
          <thead>
            <tr className="text-left border-b border-slate-600">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-slate-700">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="space-x-2">
                  {u.role === "employee" && (
                    <button
                      onClick={() => promote(u._id)}
                      className="bg-green-600 px-2 py-1 rounded text-xs"
                    >
                      Promote
                    </button>
                  )}

                  {u.role === "admin" && (
                    <button
                      onClick={() => demote(u._id)}
                      className="bg-yellow-600 px-2 py-1 rounded text-xs"
                    >
                      Demote
                    </button>
                  )}

                  {u.role !== "superadmin" && (
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-600 px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}