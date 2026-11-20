import { memo, useMemo } from "react";
import EmployeeCard from "./EmployeeCard";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useSettings } from "../hooks/useSettings";

interface EmployeeListProps {
  search: string;
}

const EmployeeList = ({
  search,
}: EmployeeListProps) => {
  const {
    state: { employees },
    selectEmployee,
    removeEmployee,
    isDeleting,
    mutationError,
  } = useEmployeeContext();

  const {
    selectedDepartment,
    viewMode,
  } = useSettings();

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesName = employee.name
        .toLowerCase()
        .includes(query);

      const matchesDepartment =
        selectedDepartment === "" ||
        employee.department === selectedDepartment;

      return matchesName && matchesDepartment;
    });
  }, [employees, search, selectedDepartment]);

  return (
    <>
      <p>
        Showing {filteredEmployees.length} of{" "}
        {employees.length} employees
      </p>

      {mutationError && (
        <p role="alert">{mutationError}</p>
      )}

      {filteredEmployees.length === 0 ? (
        <p>No employees found</p>
      ) : viewMode === "table" ? (
        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>
                    ₹
                    {employee.salary.toLocaleString(
                      "en-IN",
                    )}
                  </td>

                  <td className="table-actions">
                    <button
                      type="button"
                      onClick={() =>
                        selectEmployee(employee)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() =>
                        removeEmployee(employee.id)
                      }
                    >
                      {isDeleting
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default memo(EmployeeList);