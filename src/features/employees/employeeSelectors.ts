import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectEmployeeState = (
  state: RootState,
) => state.employees;

export const selectAllEmployees = (
  state: RootState,
) => state.employees.employees;

export const selectSelectedEmployee = (
  state: RootState,
) => state.employees.selectedEmployee;

export const selectEmployeeLoading = (
  state: RootState,
) => state.employees.loading;

export const selectEmployeeError = (
  state: RootState,
) => state.employees.error;

export const selectSearchTerm = (
  state: RootState,
) => state.employees.searchTerm;

export const selectSelectedDepartment = (
  state: RootState,
) => state.employees.selectedDepartment;

export const selectEmployeeCount = createSelector(
  [selectAllEmployees],
  (employees) => employees.length,
);

export const selectTotalSalary = createSelector(
  [selectAllEmployees],
  (employees) =>
    employees.reduce(
      (total, employee) =>
        total + Number(employee.salary ?? 0),
      0,
    ),
);

export const selectDepartmentCounts = createSelector(
  [selectAllEmployees],
  (employees) =>
    employees.reduce<Record<string, number>>(
      (counts, employee) => {
        const department = employee.department;

        counts[department] =
          (counts[department] ?? 0) + 1;

        return counts;
      },
      {},
    ),
);

export const selectDepartments = createSelector(
  [selectDepartmentCounts],
  (departmentCounts) =>
    Object.keys(departmentCounts),
);

export const selectFilteredEmployees = createSelector(
  [
    selectAllEmployees,
    selectSearchTerm,
    selectSelectedDepartment,
  ],
  (
    employees,
    searchTerm,
    selectedDepartment,
  ) => {
    const query = searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesName = employee.name
        .toLowerCase()
        .includes(query);

      const matchesDepartment =
        selectedDepartment === "" ||
        employee.department === selectedDepartment;

      return matchesName && matchesDepartment;
    });
  },
);

export const selectEmployeeById = (
  state: RootState,
  id: number,
) =>
  state.employees.employees.find(
    (employee) => employee.id === id,
  );