import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import type { Employee } from "../types/employee.types";
import {
  employeeReducer,
  initialEmployeeState,
  type EmployeeAction,
  type EmployeeState,
} from "../reducers/employeeReducer";
import {
  createEmployees,
  deleteEmployee as deleteEmployeeRequest,
  fetchEmployees,
  updateEmployee as updateEmployeeRequest,
} from "../services/employeeService";

interface EmployeeContextValue {
  state: EmployeeState;
  dispatch: Dispatch<EmployeeAction>;
  employeeCount: number;
  isLoading: boolean;
  isDeleting: boolean;
  error: string | null;
  mutationError: string | null;
  retry: () => void;
  saveEmployee: (
    details: Omit<Employee, "id">,
  ) => Promise<void>;
  removeEmployee: (id: number) => Promise<void>;
  selectEmployee: (employee: Employee | null) => void;
}

export const EmployeeContext =
  createContext<EmployeeContextValue | undefined>(undefined);

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider = ({
  children,
}: EmployeeProviderProps) => {
  const [state, dispatch] = useReducer(
    employeeReducer,
    initialEmployeeState,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mutationError, setMutationError] =
    useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const deletingRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadEmployees = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const employees = await fetchEmployees(
          controller.signal,
        );

        dispatch({
          type: "SET_EMPLOYEES",
          payload: employees,
        });
      } catch (error: unknown) {
        if (controller.signal.aborted) return;

        setError(
          error instanceof Error
            ? error.message
            : "Could not load employees.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const retry = useCallback((): void => {
    setRetryCount((currentCount) => currentCount + 1);
  }, []);

  const selectEmployee = useCallback(
    (employee: Employee | null): void => {
      dispatch({
        type: "SELECT_EMPLOYEE",
        payload: employee,
      });
    },
    [],
  );

  const saveEmployee = useCallback(
    async (
      details: Omit<Employee, "id">,
    ): Promise<void> => {
      setMutationError(null);

      try {
        if (!state.selectedEmployee) {
          const newEmployee =
            await createEmployees(details);

          dispatch({
            type: "ADD_EMPLOYEE",
            payload: newEmployee,
          });

          return;
        }

        const updatedEmployee =
          await updateEmployeeRequest(
            state.selectedEmployee.id,
            details,
          );

        dispatch({
          type: "UPDATE_EMPLOYEE",
          payload: updatedEmployee,
        });

        dispatch({
          type: "SELECT_EMPLOYEE",
          payload: null,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Could not save employee.";

        setMutationError(message);
        throw new Error(message);
      }
    },
    [state.selectedEmployee],
  );

  const removeEmployee = useCallback(
    async (id: number): Promise<void> => {
      if (deletingRef.current) return;

      deletingRef.current = true;
      setIsDeleting(true);
      setMutationError(null);

      try {
        await deleteEmployeeRequest(id);

        dispatch({
          type: "DELETE_EMPLOYEE",
          payload: id,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Could not delete employee.";

        setMutationError(message);
      } finally {
        deletingRef.current = false;
        setIsDeleting(false);
      }
    },
    [],
  );

  const employeeCount = state.employees.length;

  const value = useMemo(
    () => ({
      state,
      dispatch,
      employeeCount,
      isLoading,
      isDeleting,
      error,
      mutationError,
      retry,
      saveEmployee,
      removeEmployee,
      selectEmployee,
    }),
    [
      state,
      employeeCount,
      isLoading,
      isDeleting,
      error,
      mutationError,
      retry,
      saveEmployee,
      removeEmployee,
      selectEmployee,
    ],
  );

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};