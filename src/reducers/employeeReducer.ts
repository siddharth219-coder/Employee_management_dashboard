import type { Employee } from "../types/employee.types";

export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
}

export type EmployeeAction =
  | {
      type: "SET_EMPLOYEES";
      payload: Employee[];
    }
  | {
      type: "ADD_EMPLOYEE";
      payload: Employee;
    }
  | {
      type: "UPDATE_EMPLOYEE";
      payload: Employee;
    }
  | {
      type: "DELETE_EMPLOYEE";
      payload: number;
    }
  | {
      type: "SELECT_EMPLOYEE";
      payload: Employee | null;
    };

export const initialEmployeeState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
};

export const employeeReducer = (
  state: EmployeeState,
  action: EmployeeAction,
): EmployeeState => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };

    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id
            ? action.payload
            : employee,
        ),
        selectedEmployee:
          state.selectedEmployee?.id === action.payload.id
            ? action.payload
            : state.selectedEmployee,
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload,
        ),
        selectedEmployee:
          state.selectedEmployee?.id === action.payload
            ? null
            : state.selectedEmployee,
      };

    case "SELECT_EMPLOYEE":
      return {
        ...state,
        selectedEmployee: action.payload,
      };

    default:
      return state;
  }
};