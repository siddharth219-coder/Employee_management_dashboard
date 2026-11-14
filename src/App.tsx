import { useState } from 'react'
import EmployeeCard from './components/EmployeeCard'
import { employees } from './data/employees'
import { employees as initialEmployees } from "./data/employees";
import EmployeeForm from "./components/EmployeeForm";
import type { Employee } from "./types/employee.types";



let departmentCounts = employees.reduce<Record<string, number>>(
    (counts, employee) => {
        const department = employee.department
        counts[department] = (counts[department] ?? 0) + 1
        return counts
    },
    {},
)
const App = () => {
    const [employees, setEmployees] = useState(initialEmployees);

    const departmentCounts = employees.reduce<Record<string, number>>(
        (counts, employee) => {
            const department = employee.department;
            counts[department] = (counts[department] ?? 0) + 1;
            return counts;
        },
        {},
    );
    const [search, setSearch] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("")
    const query = search.trim().toLowerCase()
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const filteredEmployees = employees.filter((employee) => {
        const matchesName = employee.name.toLowerCase().includes(query)

        const matchesDepartment = selectedDepartment === "" || employee.department === selectedDepartment

        return matchesName && matchesDepartment

    })
    const handleAddEmployee = (details: Omit<Employee, "id">): void => {
        setEmployees((currentEmployees) => {
            const nextId =
                Math.max(0, ...currentEmployees.map((employee) => employee.id)) + 1;

            return [...currentEmployees, { ...details, id: nextId }];
        });

        setSearch("");
        setSelectedDepartment("");
    };
    const handleSaveEmployee = (details: Omit<Employee, "id">): void => {
        if (!editingEmployee) {
            handleAddEmployee(details);
            return;
        }

        const employeeId = editingEmployee.id;

        setEmployees((currentEmployees) =>
            currentEmployees.map((employee) =>
                employee.id === employeeId ? { ...employee, ...details } : employee,
            ),
        );

        setEditingEmployee(null);
        setSearch("");
        setSelectedDepartment("");
    };
    const handleDeleteEmployee = (id: number): void => {
        setEmployees((currentEmployees) =>
            currentEmployees.filter((employee) => employee.id !== id),
        );

        if (editingEmployee?.id === id) {
            setEditingEmployee(null);
        }

        const departmentStillExists = employees.some(
            (employee) =>
                employee.id !== id && employee.department === selectedDepartment,
        );

        if (selectedDepartment && !departmentStillExists) {
            setSelectedDepartment("");
        }
    };

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
                <EmployeeForm
                    key={editingEmployee?.id ?? "add"}
                    employeeToEdit={editingEmployee}
                    onSave={handleSaveEmployee}
                />
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
                                <EmployeeCard
                                    key={employee.id}
                                    employee={employee}
                                    onEdit={setEditingEmployee}
                                    onDelete={handleDeleteEmployee}
                                />
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