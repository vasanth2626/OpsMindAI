// client/src/components/admin/CreateUserForm.jsx

import { useState } from "react";
import { adminCreateUser } from "../../api/authApi";

export default function CreateUserForm() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isSuperAdmin = currentUser?.role === "superadmin";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);

    try {
      const data = await adminCreateUser(form);
      setMsg(data?.message || "User created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "employee",
      });
    } catch (error) {
      setErr(
        error?.response?.data?.message ||
          "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-card p-6 max-w-xl">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Create New User
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">

        {/* ✅ Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>

        {/* ✅ Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
            name="email"
            type="email"
            placeholder="user@company.com"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>

        {/* ✅ Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temporary Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
            name="password"
            type="password"
            placeholder="Set temporary password"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>

        {/* ✅ Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
            name="role"
            value={form.role}
            onChange={onChange}
          >
            <option value="employee">Employee</option>

            {isSuperAdmin && (
              <>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </>
            )}
          </select>
        </div>

        {/* ✅ Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition disabled:opacity-60"
          >
            {loading ? "Creating User..." : "Create User"}
          </button>
        </div>
      </form>

      {/* ✅ Success Message */}
      {msg && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md p-3">
          {msg}
        </div>
      )}

      {/* ✅ Error Message */}
      {err && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-3">
          {err}
        </div>
      )}
    </div>
  );
}