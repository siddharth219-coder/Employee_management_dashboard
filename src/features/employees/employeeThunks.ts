import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Employee } from "../../types/employee.types";
import { createEmployees as createEmployeeApi, deleteEmployee as deleteEmployeeApi, fetchEmployeeById as fetchEmployeeByIdApi, fetchEmployees as fetchEmployeesApi, updateEmployee as updateEmployeeApi } from "../../services/employeeService";

type EmployeeFormData = Omit<Employee, "id">;

interface UpdateEmployeeArguments {
    id: number;
    details: EmployeeFormData;
}

export const fetchEmployeesThunk = createAsyncThunk<
    Employee[],
    void,
    { rejectValue: string }
>(
    "employees/fetchEmployees",
    async (_, thunkApi) => {
        try {
            return await fetchEmployeesApi(thunkApi.signal);
        } catch (error: unknown) {
            if (error instanceof DOMException &&
                error.name === "AbortError") {
                throw error;
            }

            return thunkApi.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Could not load employees.",
            );
        }
    },
);

export const fetchEmployeeByIdThunk = createAsyncThunk<
    Employee,
    number,
    { rejectValue: string }
>(
    "employees/fetchEmployeeById",
    async (id, thunkApi) => {
        try {
            return await fetchEmployeeByIdApi(
                id,
                thunkApi.signal,
            );
        } catch (error: unknown) {
            return thunkApi.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Could not load employee.",
            );
        }
    },
);

export const addEmployeeThunk = createAsyncThunk<
    Employee,
    EmployeeFormData,
    { rejectValue: string }
>(
    "employees/addEmployee",
    async (details, thunkApi) => {
        try {
            return await createEmployeeApi(details);
        } catch (error: unknown) {
            return thunkApi.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Could not add employee.",
            );
        }
    },
);

export const updateEmployeeThunk = createAsyncThunk<
    Employee,
    UpdateEmployeeArguments,
    { rejectValue: string }
>(
    "employees/updateEmployee",
    async ({ id, details }, thunkApi) => {
        try {
            return await updateEmployeeApi(id, details);
        } catch (error: unknown) {
            return thunkApi.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Could not update employee.",
            );
        }
    },
);

export const deleteEmployeeThunk = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    "employees/deleteEmployee",
    async (id, thunkApi) => {
        try {
            await deleteEmployeeApi(id);
            return id;
        } catch (error: unknown) {
            return thunkApi.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Could not delete employee.",
            );
        }
    },
);