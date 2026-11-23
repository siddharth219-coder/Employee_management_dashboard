import { useRef, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectEmployeeError, selectEmployeeLoading, selectSelectedEmployee } from "../features/employees/employeeSelectors";
import { clearEmployeeError, selectEmployee } from "../features/employees/employeeSlice";
import { addEmployeeThunk, updateEmployeeThunk } from "../features/employees/employeeThunks";

interface EmployeeFormProps {
    onSuccess?: () => void;
}

interface FormState {
    name: string;
    email: string;
    department: string;
    designation: string;
    salary: string;
}

const emptyForm: FormState = {
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
};

const EmployeeForm = ({
    onSuccess,
}: EmployeeFormProps) => {
    const dispatch = useAppDispatch();

    const employeeToEdit = useAppSelector(
        selectSelectedEmployee,
    );

    const loading = useAppSelector(
        selectEmployeeLoading,
    );

    const apiError = useAppSelector(
        selectEmployeeError,
    );

    const [form, setForm] = useState<FormState>(
        () =>
            employeeToEdit
                ? {
                    name: employeeToEdit.name,
                    email: employeeToEdit.email,
                    department:
                        employeeToEdit.department,
                    designation:
                        employeeToEdit.designation,
                    salary: String(
                        employeeToEdit.salary,
                    ),
                }
                : emptyForm,
    );

    const [validationError, setValidationError] =
        useState("");

    const savingRef = useRef(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        if (savingRef.current) {
            return;
        }

        const name = form.name.trim();
        const email = form.email.trim();
        const department = form.department.trim();
        const designation =
            form.designation.trim();
        const salary = Number(form.salary);

        if (
            !name ||
            !email ||
            !department ||
            !designation ||
            !form.salary.trim()
        ) {
            setValidationError(
                "Please fill in all fields.",
            );
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setValidationError(
                "Enter a valid email address.",
            );
            return;
        }

        if (
            !Number.isFinite(salary) ||
            salary <= 0
        ) {
            setValidationError(
                "Salary must be greater than zero.",
            );
            return;
        }

        savingRef.current = true;
        setValidationError("");
        dispatch(clearEmployeeError());

        const details = {
            name,
            email,
            department,
            designation,
            salary,
        };

        try {
            if (employeeToEdit) {
                await dispatch(
                    updateEmployeeThunk({
                        id: employeeToEdit.id,
                        details,
                    }),
                ).unwrap();
            } else {
                await dispatch(
                    addEmployeeThunk(details),
                ).unwrap();
            }

            setForm(emptyForm);
            dispatch(selectEmployee(null));
            onSuccess?.();
        } catch {
            // Redux stores the API error.
        } finally {
            savingRef.current = false;
        }
    };

    const clearErrors = (): void => {
        setValidationError("");

        if (apiError) {
            dispatch(clearEmployeeError());
        }
    };

    return (
        <form
            className="employee-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2>
                {employeeToEdit
                    ? "Edit Employee"
                    : "Add Employee"}
            </h2>

            <label>
                Employee Name
                <input
                    value={form.name}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            name: event.target.value,
                        });
                        clearErrors();
                    }}
                />
            </label>

            <label>
                Email
                <input
                    type="email"
                    value={form.email}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            email: event.target.value,
                        });
                        clearErrors();
                    }}
                />
            </label>

            <label>
                Department
                <input
                    value={form.department}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            department: event.target.value,
                        });
                        clearErrors();
                    }}
                />
            </label>

            <label>
                Designation
                <input
                    value={form.designation}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            designation:
                                event.target.value,
                        });
                        clearErrors();
                    }}
                />
            </label>

            <label>
                Salary
                <input
                    type="number"
                    min="1"
                    value={form.salary}
                    onChange={(event) => {
                        setForm({
                            ...form,
                            salary: event.target.value,
                        });
                        clearErrors();
                    }}
                />
            </label>

            {validationError && (
                <p role="alert">
                    {validationError}
                </p>
            )}

            {apiError && (
                <p role="alert">
                    {apiError}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Saving..."
                    : employeeToEdit
                        ? "Save Changes"
                        : "Add Employee"}
            </button>
        </form>
    );
};

export default EmployeeForm;