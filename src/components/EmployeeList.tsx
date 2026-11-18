import {memo} from 'react'
import type { Employee } from '../types/employee.types'
import EmployeeCard from './EmployeeCard'

interface EmployeeListProps{
    employees:Employee[]
    onEdit:(employee:Employee)=> void
    onDelete:(id: number)=>Promise<void>
    isDeleting:boolean
}


const EmployeeList = ({
    employees,
    onEdit,
    onDelete,
    isDeleting,
}:EmployeeListProps) => {
    if (employees.length===0) {
        return <p>No Employees Found</p>
    }
  return (
    <div className='employee-grid'>
        {
            employees.map((employee)=>(
                <EmployeeCard key={employee.id} employee={employee} onEdit={onEdit} onDelete={onDelete} isDeleting={isDeleting}/>
            ))
        }
    </div>
  )
}

export default memo(EmployeeList)