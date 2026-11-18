import {memo} from 'react'

interface DepartmentFilterProps{
    departments: string[]
    selectedDepartment:string
    onDepartmentChange:(department: string)=>void
}

const DepartmentFilter = ({departments,selectedDepartment,onDepartmentChange}:DepartmentFilterProps) => {
  return (
    <div className='employee-controls'>
        <label htmlFor="department-filter">Department</label>

        <select id="department-filter" value={selectedDepartment} onChange={(event)=> onDepartmentChange(event.target.value)}>
            <option value="">All Departments</option>
            {departments.map((department)=>(
                <option value={department} key={department}>
                    {department}
                </option>
            ))}
        </select>
    </div>
  )
}

export default memo(DepartmentFilter)