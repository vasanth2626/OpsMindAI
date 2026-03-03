import { Pencil, Trash } from "lucide-react";

export default function EmployeeTable({ data, onEdit, onDelete, currentUser }) {
  return (
    <div className="overflow-x-auto border border-borderSubtle rounded-xl">
      <table className="min-w-full text-sm text-gray-300">
        <thead className="bg-surface text-xs uppercase text-muted">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr
              key={u._id}
              className="border-t border-borderSubtle hover:bg-cardHover"
            >
              <td className="px-4 py-3">{u.name}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3 capitalize">{u.role}</td>
              <td className="px-4 py-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(u)}
                    className="text-muted hover:text-white"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* Only superadmin can delete users */}
                  {currentUser.role === "superadmin" && u.role !== "superadmin" && (
                    <button
                      onClick={() => onDelete(u)}
                      className="text-danger hover:text-red-400"
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}