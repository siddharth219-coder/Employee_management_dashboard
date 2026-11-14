import { useState } from "react";
import type { FormEvent } from "react";
import type { Employee } from "../types/employee.types";

type EmployeeFormData = Omit<Employee, "id">;

interface EmployeeFormProps {
    onSave: (employee: EmployeeFormData) => void;
    employeeToEdit?: Employee | null;
}

const emptyForm = {
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
};

const EmployeeForm = ({ onSave, employeeToEdit }: EmployeeFormProps) => {
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


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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

        onSave({ name, email, department, designation, salary });
        setForm(emptyForm);
        setError("");
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
            <button type="submit">
                {employeeToEdit ? "Save Changes" : "Add Employee"}
            </button>
        </form>
    );
};

export default EmployeeForm;