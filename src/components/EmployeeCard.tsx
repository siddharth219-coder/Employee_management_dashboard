import { memo } from "react";
import type { Employee } from "../types/employee.types";
import { useEmployeeContext } from "../hooks/useEmployeeContext";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({
  employee,
}: EmployeeCardProps) => {
  const {
    selectEmployee,
    removeEmployee,
    isDeleting,
  } = useEmployeeContext();

  return (
    <article className="employee-card">
      <h3>{employee.name}</h3>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <p>
        <strong>Department:</strong>{" "}
        {employee.department}
      </p>

      <p>
        <strong>Designation:</strong>{" "}
        {employee.designation}
      </p>

      <p>
        <strong>Salary:</strong> ₹
        {employee.salary.toLocaleString("en-IN")}
      </p>

      <div className="employee-actions">
        <button
          type="button"
          onClick={() => selectEmployee(employee)}
        >
          Edit
        </button>

        <button
          type="button"
          disabled={isDeleting}
          onClick={() => removeEmployee(employee.id)}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default memo(EmployeeCard);