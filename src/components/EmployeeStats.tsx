import { memo } from "react"

interface EmployeeStatsProps{
    totalEmployees:number
    totalSalary:number
    departmentCounts:Record<string, number>
}

const EmployeeStats=({
    totalEmployees,
    totalSalary,
    departmentCounts,
}:EmployeeStatsProps)=>{
    return(
        <section className="stats-section" aria-label="Employee statistics">
            <div className="stats-card">
                <h2>Total Employees</h2>
                <p>{totalEmployees}</p>
            </div>
            <div className="stats-card">
                <h2>Total Salary</h2>
                <p>{totalSalary.toLocaleString("en-IN")}</p>
            </div>

            {Object.entries(departmentCounts).map(([department, count])=>(
                <div className="stats-card" key={department}>
                <h2>{department}</h2>
                <p>{count}</p>
            </div>
            ))}
            
        </section>
    )
}

export default memo(EmployeeStats)