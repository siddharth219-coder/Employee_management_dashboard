import React from 'react'
import { Employee } from '../types/employee.types'


interface EmployeeCardProps {
    employee: Employee
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    return (
        <article className='employee-card'>
            <div className='employee-avatar' aria-hidden="true">
                {employee.name.charAt(0)}
            </div>
            <h2>{employee.name}</h2>
            <p>{employee.designation}</p>
            <p>{employee.email}</p>
            <span>{employee.department}</span>
        </article>
    )
}

export default EmployeeCard