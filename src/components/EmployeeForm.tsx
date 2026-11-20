import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";



const emptyForm = {
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
};
interface EmployeeFormProps {
    onSuccess?: () => void;
}
const EmployeeForm = ({ onSuccess }: EmployeeFormProps) => {
    const {
        state: { selectedEmployee: employeeToEdit },
        saveEmployee,
    } = useEmployeeContext()
    const [form, setForm] = useState(() =>
        employeeToEdit
            ? {
                name: employeeToEdit.name,
                email: employeeToEdit.email,
                department: employeeToEdit.department,
                designation: employeeToEdit.designation,
                salary: String(employeeToEdit.salary),
            }
            : emptyForm,
    );




    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const savingRef = useRef(false);


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (savingRef.current) return;
        setSuccess("");

        const name = form.name.trim();
        const email = form.email.trim();
        const department = form.department.trim();
        const designation = form.designation.trim();
        const salary = Number(form.salary);

        if (!name || !email || !department || !designation || !form.salary.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Enter a valid email address.");
            return;
        }

        if (!Number.isFinite(salary) || salary <= 0) {
            setError("Salary must be greater than zero.");
            return;
        }

        savingRef.current = true;
        setIsSaving(true);
        setError("");

        const wasEditing = Boolean(employeeToEdit);

        try {
            const wasEditing = Boolean(employeeToEdit);

            await saveEmployee({
                name,
                email,
                department,
                designation,
                salary,
            });

            setForm(emptyForm);

            setSuccess(
                wasEditing
                    ? "Employee updated successfully."
                    : "Employee added successfully.",
            );

            onSuccess?.();
        } catch (error: unknown) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not save employee.",
            );
        } finally {
            savingRef.current = false;
            setIsSaving(false);
        }
    };

    return (
        <form className="employee-form" onSubmit={handleSubmit} noValidate>
            <h2>{employeeToEdit ? "Edit Employee" : "Add Employee"}</h2>

            <label>
                Employee Name
                <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
            </label>

            <label>
                Email
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </label>

            <label>
                Department
                <input
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                />
            </label>

            <label>
                Designation
                <input
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                />
            </label>

            <label>
                Salary
                <input
                    type="number"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                />
            </label>

            {error && <p role="alert">{error}</p>}

            {success && <p role="status">{success}</p>}

            {success && <p role="status">{success}</p>}

            <button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : employeeToEdit ? "Save Changes" : "Add Employee"}
            </button>
        </form>
    );
};

export default EmployeeForm;