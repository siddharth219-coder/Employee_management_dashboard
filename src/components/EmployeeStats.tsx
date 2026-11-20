import { memo, useMemo } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";

const EmployeeStats = () => {
  const {
    state: { employees },
    employeeCount,
  } = useEmployeeContext();

  const totalSalary = useMemo(() => {
    return employees.reduce(
      (total, employee) => total + Number(employee.salary ?? 0),
      0,
    );
  }, [employees]);;

  const departmentCounts = useMemo(() => {
    return employees.reduce<Record<string, number>>(
      (counts, employee) => {
        const department = employee.department;

        counts[department] =
          (counts[department] ?? 0) + 1;

        return counts;
      },
      {},
    );
  }, [employees]);

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
        <p>₹{totalSalary.toLocaleString("en-IN")}</p>
      </div>

      {Object.entries(departmentCounts).map(
        ([department, count]) => (
          <div className="stats-card" key={department}>
            <h2>{department}</h2>
            <p>{count}</p>
          </div>
        ),
      )}
    </section>
  );
};

export default memo(EmployeeStats);