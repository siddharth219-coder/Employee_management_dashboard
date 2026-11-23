import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectEmployeeById, selectEmployeeError, selectEmployeeLoading } from "../features/employees/employeeSelectors";
import { selectEmployee } from "../features/employees/employeeSlice";
import { fetchEmployeeByIdThunk } from "../features/employees/employeeThunks";

const EmployeeDetails = () => {
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const employeeId = Number(id);

    const employee = useAppSelector((state) =>
        selectEmployeeById(state, employeeId),
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

    const handleRetry = (): void => {
        requestedEmployeeRef.current = true;

        dispatch(
            fetchEmployeeByIdThunk(employeeId),
        );
    };

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

    if (loading && !employee) {
        return (
            <p role="status">
                Loading employee...
            </p>
        );
    }

    if (error && !employee) {
        return (
            <section>
                <h2>Employee Not Found</h2>
                <p role="alert">{error}</p>

                <button
                    className="retry-button"
                    type="button"
                    onClick={handleRetry}
                >
                    Retry
                </button>

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

    if (!employee) {
        return (
            <p role="status">
                Preparing employee details...
            </p>
        );
    }

    return (
        <section className="employee-details">
            <h2>{employee.name}</h2>

            <dl>
                <dt>Email</dt>
                <dd>{employee.email}</dd>

                <dt>Department</dt>
                <dd>{employee.department}</dd>

                <dt>Designation</dt>
                <dd>{employee.designation}</dd>

                <dt>Salary</dt>
                <dd>
                    ₹
                    {Number(
                        employee.salary,
                    ).toLocaleString("en-IN")}
                </dd>
            </dl>

            <div className="employee-details-actions">
                <Link
                    to={`/employees/edit/${employee.id}`}
                >
                    Edit Employee
                </Link>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/employees")
                    }
                >
                    Back to Employees
                </button>
            </div>
        </section>
    );
};

export default EmployeeDetails;