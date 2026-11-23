import { memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAllEmployees, selectEmployeeError, selectEmployeeLoading, selectFilteredEmployees } from "../features/employees/employeeSelectors";
import { deleteEmployeeThunk, fetchEmployeesThunk } from "../features/employees/employeeThunks";
import { useSettings } from "../hooks/useSettings";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = () => {
    const dispatch = useAppDispatch();

    const employees = useAppSelector(
        selectAllEmployees,
    );

    const filteredEmployees = useAppSelector(
        selectFilteredEmployees,
    );

    const loading = useAppSelector(
        selectEmployeeLoading,
    );

    const error = useAppSelector(
        selectEmployeeError,
    );

    const { viewMode } = useSettings();

    const handleDelete = async (
        id: number,
        name: string,
    ): Promise<void> => {
        const confirmed = window.confirm(
            `Delete ${name}?`,
        );

        if (!confirmed) {
            return;
        }

        try {
            await dispatch(
                deleteEmployeeThunk(id),
            ).unwrap();
        } catch {
            // Redux stores the rejected error.
        }
    };

    const handleRetry = (): void => {
        dispatch(fetchEmployeesThunk());
    };

    if (loading && employees.length === 0) {
        return (
            <p role="status">
                Loading employees...
            </p>
        );
    }

    if (error && employees.length === 0) {
        return (
            <div>
                <p role="alert">
                    Could not load employees: {error}
                </p>

                <button
                    className="retry-button"
                    type="button"
                    onClick={handleRetry}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <>
            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            <p>
                Showing {filteredEmployees.length} of{" "}
                {employees.length} employees
            </p>

            {filteredEmployees.length === 0 ? (
                <p>No employees found.</p>
            ) : viewMode === "table" ? (
                <div className="employee-table-wrapper">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>
                                        <Link
                                            to={`/employees/${employee.id}`}
                                        >
                                            {employee.name}
                                        </Link>
                                    </td>

                                    <td>{employee.email}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.designation}</td>

                                    <td>
                                        ₹
                                        {Number(
                                            employee.salary,
                                        ).toLocaleString("en-IN")}
                                    </td>

                                    <td>
                                        <div className="table-actions">
                                            <Link
                                                className="edit-link"
                                                to={`/employees/edit/${employee.id}`}
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="delete-button"
                                                type="button"
                                                disabled={loading}
                                                onClick={() =>
                                                    handleDelete(
                                                        employee.id,
                                                        employee.name,
                                                    )
                                                }
                                            >
                                                {loading
                                                    ? "Please wait..."
                                                    : "Delete"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="employee-grid">
                    {filteredEmployees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default memo(EmployeeList);