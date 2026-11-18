import {memo} from 'react'
import { Employee } from '../types/employee.types'


interface EmployeeCardProps {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void
    isDeleting:boolean
}

const EmployeeCard = ({ employee, onEdit, onDelete, isDeleting }: EmployeeCardProps) => {
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
                    disabled={isDeleting}
                    onClick={() => onDelete(employee.id)}
                >
                    Delete
                </button>
            </div>
        </article>
    )
}

export default memo(EmployeeCard)