import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeModal from "../components/employees/EmployeeModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function EmployeesPage() {
  const { user: currentUser } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openEdit = (emp) => setSelected(emp);
  const closeModal = () => setSelected(null);

  const handleDelete = async (emp) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteEmployee(emp._id);
      toast.success("User deleted");
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Employees</h1>
        <p className="text-sm text-muted mt-1">
          View, edit or delete user accounts.
        </p>
      </div>

      <EmployeeTable
        data={employees}
        onEdit={openEdit}
        onDelete={handleDelete}
        currentUser={currentUser}
      />

      {selected && (
        <EmployeeModal
          open={!!selected}
          employee={selected}
          onClose={closeModal}
          refetch={fetchEmployees}
          canDelete={currentUser.role === "superadmin"}
        />
      )}
    </div>
  );
}