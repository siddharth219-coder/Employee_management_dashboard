import React from 'react'
import { Employee } from '../types/employee.types'


interface EmployeeCardProps {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void
}

const EmployeeCard = ({ employee, onEdit, onDelete }: EmployeeCardProps) => {
    return (
        <article className='employee-card'>
            <div className='employee-avatar' aria-hidden="true">
                {employee.name.charAt(0)}
            </div>
            <h2>{employee.name}</h2>
            <p>{employee.designation}</p>
            <p>{employee.email}</p>
            <span>{employee.department}</span>
            <p>Salary: {employee.salary.toLocaleString("en-IN")}</p>
            <div className="employee-actions">
                <button type="button" onClick={() => onEdit(employee)}>
                    Edit
                </button>

                <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(employee.id)}
                >
                    Delete
                </button>
            </div>
        </article>
    )
}

export default EmployeeCard