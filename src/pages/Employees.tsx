import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";
import SearchBar from "../components/SearchBar";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useSettings } from "../hooks/useSettings";

const Employees = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    state: { employees },
  } = useEmployeeContext();

  const {
    selectedDepartment,
    setSelectedDepartment,
  } = useSettings();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const search = searchParams.get("search") ?? "";
  const departmentFromUrl =
    searchParams.get("department") ?? "";

  const departments = useMemo(() => {
    return Array.from(
      new Set(employees.map((employee) => employee.department)),
    );
  }, [employees]);

  useEffect(() => {
    setSelectedDepartment(departmentFromUrl);
  }, [departmentFromUrl, setSelectedDepartment]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearchChange = (value: string): void => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      updatedParams.set("search", value);
    } else {
      updatedParams.delete("search");
    }

    setSearchParams(updatedParams);
  };

  const handleDepartmentChange = (department: string): void => {
    const updatedParams = new URLSearchParams(searchParams);

    setSelectedDepartment(department);

    if (department) {
      updatedParams.set("department", department);
    } else {
      updatedParams.delete("department");
    }

    setSearchParams(updatedParams);
  };

  return (
    <section id="employees" className="employees">

      <div className="employee-controls-container">
        <SearchBar
          ref={searchInputRef}
          search={search}
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
              handleDepartmentChange(event.target.value)
            }
          >
            <option value="">All Departments</option>

            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <EmployeeList search={search} />
    </section>
  );
};

export default Employees;