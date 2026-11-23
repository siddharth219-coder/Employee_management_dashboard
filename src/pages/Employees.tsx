import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EmployeeList from "../components/EmployeeList";
import SearchBar from "../components/SearchBar";
import { selectDepartments, selectSearchTerm, selectSelectedDepartment } from "../features/employees/employeeSelectors";
import { setSearchTerm, setSelectedDepartment } from "../features/employees/employeeSlice";

const Employees = () => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const searchTerm = useAppSelector(
    selectSearchTerm,
  );

  const selectedDepartment = useAppSelector(
    selectSelectedDepartment,
  );

  const departments = useAppSelector(
    selectDepartments,
  );

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  const searchFromUrl =
    searchParams.get("search") ?? "";

  const departmentFromUrl =
    searchParams.get("department") ?? "";

  useEffect(() => {
    dispatch(setSearchTerm(searchFromUrl));

    dispatch(
      setSelectedDepartment(departmentFromUrl),
    );
  }, [
    dispatch,
    searchFromUrl,
    departmentFromUrl,
  ]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearchChange = (
    value: string,
  ): void => {
    dispatch(setSearchTerm(value));

    const updatedParams =
      new URLSearchParams(searchParams);

    if (value.trim()) {
      updatedParams.set("search", value);
    } else {
      updatedParams.delete("search");
    }

    setSearchParams(updatedParams);
  };

  const handleDepartmentChange = (
    department: string,
  ): void => {
    dispatch(setSelectedDepartment(department));

    const updatedParams =
      new URLSearchParams(searchParams);

    if (department) {
      updatedParams.set(
        "department",
        department,
      );
    } else {
      updatedParams.delete("department");
    }

    setSearchParams(updatedParams);
  };

  return (
    <section
      id="employees"
      className="employees"
    >
      <div className="employee-controls-container">
        <SearchBar
          ref={searchInputRef}
          search={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <div className="employee-controls">
          <label htmlFor="department-filter">
            Department
          </label>

          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={(event) =>
              handleDepartmentChange(
                event.target.value,
              )
            }
          >
            <option value="">
              All Departments
            </option>

            {departments.map((department) => (
              <option
                key={department}
                value={department}
              >
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <EmployeeList />
    </section>
  );
};

export default Employees;