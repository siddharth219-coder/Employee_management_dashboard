import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useEmployeeContext } from "../hooks/useEmployeeContext";

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    state: { employees, selectedEmployee },
    selectEmployee,
    isLoading,
  } = useEmployeeContext();

  const employeeId = Number(id);

  const employee = employees.find(
    (currentEmployee) => currentEmployee.id === employeeId,
  );

  useEffect(() => {
    if (employee) {
      selectEmployee(employee);
    }

    return () => {
      selectEmployee(null);
    };
  }, [employee, selectEmployee]);

  if (isLoading) {
    return <p role="status">Loading employee...</p>;
  }

  if (!id || !Number.isFinite(employeeId) || !employee) {
    return (
      <section>
        <h1>Employee Not Found</h1>
        <p>The employee you are trying to edit does not exist.</p>

        <button
          type="button"
          onClick={() => navigate("/employees")}
        >
          Back to Employees
        </button>
      </section>
    );
  }

  if (selectedEmployee?.id !== employee.id) {
    return <p role="status">Preparing employee form...</p>;
  }

  return (
    <section>

      <EmployeeForm
        key={employee.id}
        onSuccess={() => navigate("/employees")}
      />
    </section>
  );
};

export default EditEmployee;