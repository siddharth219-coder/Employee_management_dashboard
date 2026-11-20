import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEmployeeContext } from '../hooks/useEmployeeContext'

interface EmployeeRouteParams{
    id: string
}


const EmployeeDetails = () => {

    const { id }=useParams<keyof EmployeeRouteParams>()
    const navigate= useNavigate()

    const {
        state:{employees},
        isLoading,
        error,
    }=useEmployeeContext()


    if (isLoading) {
        return <p role='status'>Loading employee...</p>
    }

    if (error) {
        return <p role='alert'>{error}</p>
    }

    const employeeId = Number(id)
    const employee=employees.find(
        (currentEmployee)=> currentEmployee.id === employeeId,
    )

    if (!id || !Number.isFinite(employeeId)|| !employee) {
        return (
            <section>
                <h1>Employee Not Found</h1>
                <p>The requested employee does not exist.</p>
                <button type='button' onClick={()=> navigate("/employees")}>
                    Back to Employees
                </button>
            </section>
        )
    }

  return (
    <section className='employee-details'>
        <h1>{employee.name}</h1>
        <dl>
            <dt>Email</dt>
            <dd>{employee.email}</dd>

            <dt>Department</dt>
            <dd>{employee.department}</dd>

            <dt>Designation</dt>
            <dd>{employee.designation}</dd>

            <dt>Salary</dt>
            <dd>₹{employee.salary.toLocaleString("en-IN")}</dd>
        </dl>

        <div className='employee-details-actions'>
            <Link to={`/employees/edit/${employee.id}`}>Edit</Link>
            <button type='button' onClick={()=> navigate("/employees")}>
                Back to Employees
            </button>
        </div>
    </section>
  )
}

export default EmployeeDetails