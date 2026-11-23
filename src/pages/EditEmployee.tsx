import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EmployeeForm from "../components/EmployeeForm";
import { selectEmployeeById, selectEmployeeError, selectEmployeeLoading, selectSelectedEmployee } from "../features/employees/employeeSelectors";
import { selectEmployee } from "../features/employees/employeeSlice";
import { fetchEmployeeByIdThunk } from "../features/employees/employeeThunks";

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const employeeId = Number(id);

  const employee = useAppSelector((state) =>
    selectEmployeeById(state, employeeId),
  );

  const selectedEmployee = useAppSelector(
    selectSelectedEmployee,
  );

  const loading = useAppSelector(
    selectEmployeeLoading,
  );

  const error = useAppSelector(
    selectEmployeeError,
  );

  const requestedEmployeeRef = useRef(false);

  useEffect(() => {
    if (
      Number.isFinite(employeeId) &&
      employee
    ) {
      dispatch(selectEmployee(employee));
      return;
    }

    if (
      Number.isFinite(employeeId) &&
      !employee &&
      !loading &&
      !requestedEmployeeRef.current
    ) {
      requestedEmployeeRef.current = true;

      dispatch(
        fetchEmployeeByIdThunk(employeeId),
      );
    }
  }, [
    dispatch,
    employee,
    employeeId,
    loading,
  ]);

  useEffect(() => {
    return () => {
      dispatch(selectEmployee(null));
    };
  }, [dispatch]);

  if (!id || !Number.isFinite(employeeId)) {
    return (
      <section>
        <h2>Invalid Employee ID</h2>

        <button
          type="button"
          onClick={() =>
            navigate("/employees")
          }
        >
          Back to Employees
        </button>
      </section>
    );
  }

  if (
    loading &&
    selectedEmployee?.id !== employeeId
  ) {
    return (
      <p role="status">
        Loading employee...
      </p>
    );
  }

  if (
    error &&
    !employee &&
    selectedEmployee?.id !== employeeId
  ) {
    return (
      <section>
        <h2>Employee Not Found</h2>
        <p role="alert">{error}</p>

        <button
          type="button"
          onClick={() =>
            navigate("/employees")
          }
        >
          Back to Employees
        </button>
      </section>
    );
  }

  if (
    !employee ||
    selectedEmployee?.id !== employeeId
  ) {
    return (
      <p role="status">
        Preparing employee form...
      </p>
    );
  }

  return (
    <section>
      <EmployeeForm
        key={employee.id}
        onSuccess={() =>
          navigate("/employees")
        }
      />
    </section>
  );
};

export default EditEmployee;