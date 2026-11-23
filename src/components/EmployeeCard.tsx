import { memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectEmployeeLoading } from "../features/employees/employeeSelectors";
import { deleteEmployeeThunk } from "../features/employees/employeeThunks";
import type { Employee } from "../types/employee.types";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({
  employee,
}: EmployeeCardProps) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(
    selectEmployeeLoading,
  );

  const handleDelete = async (): Promise<void> => {
    const confirmed = window.confirm(
      `Delete ${employee.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(
        deleteEmployeeThunk(employee.id),
      ).unwrap();
    } catch {
      // The rejected thunk stores the error in Redux.
    }
  };

  const initials = employee.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="employee-card">
      <div className="employee-avatar">
        {initials}
      </div>

      <h3>
        <Link to={`/employees/${employee.id}`}>
          {employee.name}
        </Link>
      </h3>

      <p>{employee.email}</p>

      <p>
        <strong>Department:</strong>{" "}
        <span>{employee.department}</span>
      </p>

      <p>
        <strong>Designation:</strong>{" "}
        {employee.designation}
      </p>

      <p>
        <strong>Salary:</strong>{" "}
        ₹{Number(employee.salary).toLocaleString("en-IN")}
      </p>

      <div className="employee-actions">
        <Link
          className="edit-link"
          to={`/employees/edit/${employee.id}`}
        >
          Edit
        </Link>

        <button
          className="delete-button"
          type="button"
          disabled={loading}
          onClick={handleDelete}
        >
          {loading ? "Please wait..." : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default memo(EmployeeCard);