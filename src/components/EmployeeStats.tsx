import { memo } from "react";
import { useAppSelector } from "../app/hooks";
import { selectDepartmentCounts, selectEmployeeCount, selectEmployeeError, selectEmployeeLoading, selectTotalSalary, } from "../features/employees/employeeSelectors";

const EmployeeStats = () => {
  const employeeCount = useAppSelector(
    selectEmployeeCount,
  );

  const totalSalary = useAppSelector(
    selectTotalSalary,
  );

  const departmentCounts = useAppSelector(
    selectDepartmentCounts,
  );

  const loading = useAppSelector(
    selectEmployeeLoading,
  );

  const error = useAppSelector(
    selectEmployeeError,
  );

  if (loading && employeeCount === 0) {
    return (
      <p role="status">
        Loading employee statistics...
      </p>
    );
  }

  if (error && employeeCount === 0) {
    return (
      <p role="alert">
        Could not load statistics: {error}
      </p>
    );
  }

  return (
    <section
      className="stats-section"
      aria-label="Employee statistics"
    >
      <div className="stats-card">
        <h2>Total Employees</h2>
        <p>{employeeCount}</p>
      </div>

      <div className="stats-card">
        <h2>Total Salary</h2>
        <p>
          ₹{totalSalary.toLocaleString("en-IN")}
        </p>
      </div>

      {Object.entries(departmentCounts).map(
        ([department, count]) => (
          <div
            className="stats-card"
            key={department}
          >
            <h2>{department}</h2>
            <p>{count}</p>
          </div>
        ),
      )}
    </section>
  );
};

export default memo(EmployeeStats);