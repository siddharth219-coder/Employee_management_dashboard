import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectDepartments, selectSelectedDepartment } from "../features/employees/employeeSelectors";
import { setSelectedDepartment } from "../features/employees/employeeSlice";

const DepartmentFilter = () => {
  const dispatch = useAppDispatch();

  const departments = useAppSelector(selectDepartments);
  const selectedDepartment = useAppSelector(selectSelectedDepartment);

  return (
    <div className="employee-controls">
      <label htmlFor="department-filter">Department</label>

      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(event) =>
          dispatch(setSelectedDepartment(event.target.value))
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