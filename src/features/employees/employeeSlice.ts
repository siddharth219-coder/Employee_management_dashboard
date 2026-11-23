import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../../types/employee.types";
import {
  addEmployeeThunk,
  deleteEmployeeThunk,
  fetchEmployeeByIdThunk,
  fetchEmployeesThunk,
  updateEmployeeThunk,
} from "./employeeThunks";

export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedDepartment: string;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  searchTerm: "",
  selectedDepartment: "",
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,

  reducers: {
    selectEmployee: (
      state,
      action: PayloadAction<Employee | null>,
    ) => {
      state.selectedEmployee = action.payload;
    },

    setSearchTerm: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.searchTerm = action.payload;
    },

    setSelectedDepartment: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.selectedDepartment = action.payload;
    },

    clearEmployeeError: (state) => {
      state.error = null;
    },

    resetEmployeeState: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all employees
      .addCase(fetchEmployeesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchEmployeesThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.employees = action.payload;
        },
      )

      .addCase(
        fetchEmployeesThunk.rejected,
        (state, action) => {
          state.loading = false;

          if (!action.meta.aborted) {
            state.error =
              action.payload ??
              action.error.message ??
              "Could not load employees.";
          }
        },
      )

      // Fetch one employee
      .addCase(
        fetchEmployeeByIdThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchEmployeeByIdThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedEmployee = action.payload;

          const exists = state.employees.some(
            (employee) =>
              employee.id === action.payload.id,
          );

          if (!exists) {
            state.employees.push(action.payload);
          }
        },
      )

      .addCase(
        fetchEmployeeByIdThunk.rejected,
        (state, action) => {
          state.loading = false;

          if (!action.meta.aborted) {
            state.error =
              action.payload ??
              action.error.message ??
              "Could not load employee.";
          }
        },
      )

      // Add employee
      .addCase(addEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        addEmployeeThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.employees.push(action.payload);
        },
      )

      .addCase(
        addEmployeeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ??
            action.error.message ??
            "Could not add employee.";
        },
      )

      // Update employee
      .addCase(updateEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        updateEmployeeThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          const employeeIndex =
            state.employees.findIndex(
              (employee) =>
                employee.id === action.payload.id,
            );

          if (employeeIndex !== -1) {
            state.employees[employeeIndex] =
              action.payload;
          }

          state.selectedEmployee = action.payload;
        },
      )

      .addCase(
        updateEmployeeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ??
            action.error.message ??
            "Could not update employee.";
        },
      )

      // Delete employee
      .addCase(deleteEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        deleteEmployeeThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.employees = state.employees.filter(
            (employee) =>
              employee.id !== action.payload,
          );

          if (
            state.selectedEmployee?.id ===
            action.payload
          ) {
            state.selectedEmployee = null;
          }
        },
      )

      .addCase(
        deleteEmployeeThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ??
            action.error.message ??
            "Could not delete employee.";
        },
      );
  },
});

export const {
  selectEmployee,
  setSearchTerm,
  setSelectedDepartment,
  clearEmployeeError,
  resetEmployeeState,
} = employeeSlice.actions;

export default employeeSlice.reducer;