import { useState } from "react";
import { updateEmployee, deleteEmployee } from "../../api/employeeApi";
import toast from "react-hot-toast";

export default function EmployeeModal({ open, onClose, employee, refetch, canDelete }) {
  const [name, setName]   = useState(employee?.name  || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [role, setRole]   = useState(employee?.role  || "employee");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const save = async () => {
    setSaving(true);
    try {
      await updateEmployee(employee._id, { name, email, role });
      toast.success("User updated");
      refetch();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteEmployee(employee._id);
      toast.success("User deleted");
      refetch();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-borderSubtle rounded-xl p-6 w-full max-w-md space-y-5">
        <h2 className="text-lg font-semibold text-white">Edit User</h2>

        <input
          className="w-full px-3 py-2 rounded bg-surface border border-borderSubtle text-sm text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />

        <input
          className="w-full px-3 py-2 rounded bg-surface border border-borderSubtle text-sm text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <select
          className="w-full px-3 py-2 rounded bg-surface border border-borderSubtle text-sm text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>

        <div className="flex justify-between pt-4">
          {canDelete && (
            <button
              onClick={remove}
              className="px-4 py-2 bg-danger rounded text-white text-sm hover:bg-red-700"
            >
              Delete
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-surface border border-borderSubtle rounded text-sm text-gray-300 hover:bg-cardHover"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 bg-primary rounded text-white text-sm font-medium disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}