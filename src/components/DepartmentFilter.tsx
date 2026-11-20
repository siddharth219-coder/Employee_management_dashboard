import { memo, useMemo } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useSettings } from "../hooks/useSettings";

const DepartmentFilter = () => {
  const {
    state: { employees },
  } = useEmployeeContext();

  const {
    selectedDepartment,
    setSelectedDepartment,
  } = useSettings();

  const departments = useMemo(() => {
    return Array.from(
      new Set(
        employees.map((employee) => employee.department),
      ),
    ).sort();
  }, [employees]);

  return (
    <div className="employee-controls">
      <label htmlFor="department-filter">
        Department
      </label>

      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(event) =>
          setSelectedDepartment(event.target.value)
        }
      >
        <option value="">All Departments</option>

        {departments.map((department) => (
          <option value={department} key={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(DepartmentFilter);