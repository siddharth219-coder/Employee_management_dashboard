import React, { useState } from 'react'
import EmployeeCard from './components/EmployeeCard'
import { employees } from './data/employees'



let departmentCounts = employees.reduce<Record<string, number>>(
    (counts, employee) => {
        const department = employee.department
        counts[department] = (counts[department] ?? 0) + 1
        return counts
    },
    {},
)
const App = () => {

    const [search, setSearch] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("")
    const query = search.trim().toLowerCase()

    const filteredEmployees = employees.filter((employee) => {
        const matchesName = employee.name.toLowerCase().includes(query)

        const matchesDepartment = selectedDepartment === "" || employee.department === selectedDepartment

        return matchesName && matchesDepartment

    })

    return (
        <div className='dashboard'>
            <aside className='sidebar'>
                <strong>WorkForce</strong>
                <nav aria-label='Dashboard navigation'>
                    <a href="#overview">Overview</a>
                    <a href="#employees">Employees</a>
                </nav>
            </aside>
            <main className='dashboard-content'>
                <header id='overview'>
                    <h1>Employee Dashboard</h1>
                </header>
                <section className='stats-section' aria-label='Employee statistics'>
                    <div className='stats-card'>
                        <h2>Total Employees</h2>
                        <p>{employees.length}</p>
                    </div>
                    {Object.entries(departmentCounts).map(([department, count]) => (
                        <div className='stats-card' key={department}>
                            <h2>{department}</h2>
                            <p>{count}</p>
                        </div>
                    ))}
                </section>
                <section id='employees' className='employees'>
                    <h2>Employees</h2>
                    <div className=''>
                        <div className='employee-controls'>
                            <label htmlFor="employee-search">Search by name</label>
                            <input id='employee-search' type="search" placeholder='e.g.Rahul' value={search} onChange={(event) => setSearch(event.target.value)} />
                        </div>
                        <div className='employee-controls'>
                            <label htmlFor="department-filter">Department</label>
                            <select id="department-filter" value={selectedDepartment} onChange={(event) => setSelectedDepartment(event.target.value)}>
                                <option value="">All Departments</option>
                                {Object.keys(departmentCounts).map((department) => (
                                    <option value={department} key={department}>
                                        {department}
                                    </option>
                                ))}
                            </select>
                    </div>
                </div>


                <p>Showing {filteredEmployees.length} of {employees.length} employees</p>
                {filteredEmployees.length === 0 ? (
                    <p>No employees found</p>
                ) : (
                    <div className='employee-grid'>
                        {filteredEmployees.map((employee) => (
                            <EmployeeCard key={employee.id} employee={employee} />
                        ))}
                    </div>
                )}
            </section>
            <footer className='dashboard-footer'>
                Workforce Employee Dashboard
            </footer>
        </main>
        </div >
    )
}

export default App