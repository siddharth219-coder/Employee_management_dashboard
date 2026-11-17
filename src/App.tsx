import { useState,useRef } from 'react'
import EmployeeCard from './components/EmployeeCard'
import EmployeeForm from "./components/EmployeeForm";
import type { Employee } from "./types/employee.types";
import { useEmployees } from './hooks/useEmployees';
import { createEmployees, updateEmployee, deleteEmployee } from './services/employeeService';




const App = () => {

    const { employees, setEmployees, isLoading, error, retry } = useEmployees()

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

    const [isDeleting, setIsDeleting]=useState(false)
    const [deleteError,setDeleteError]=useState("")
    const deletingRef=useRef(false)

    const filteredEmployees = employees.filter((employee) => {
        const matchesName = employee.name.toLowerCase().includes(query)

        const matchesDepartment = selectedDepartment === "" || employee.department === selectedDepartment

        return matchesName && matchesDepartment

    })
    const handleAddEmployee = async (
        details: Omit<Employee, "id">,
    ): Promise<void> => {
        const newEmployee = await createEmployees(details);

        setEmployees((currentEmployees) => [...currentEmployees, newEmployee]);
        setSearch("");
        setSelectedDepartment("");
    };
    const handleSaveEmployee = async (
        details: Omit<Employee, "id">,
    ): Promise<void> => {
        if (!editingEmployee) {
            await handleAddEmployee(details)
            return
        }

        const employeeId = editingEmployee.id
        const updatedEmployee = await updateEmployee(employeeId, details)

        setEmployees((currentEmployees) =>
            currentEmployees.map((employee) =>
                employee.id === employeeId ? updatedEmployee : employee
            )
        )

        setEditingEmployee(null)
        setSearch("")
        setSelectedDepartment("")
    }
    const handleDeleteEmployee = async (id:number):Promise<void>=>{
        if (deletingRef.current) return

        deletingRef.current=true
        setIsDeleting(true)
        setDeleteError("")


        try {
            await deleteEmployee(id)

            setEmployees((current)=>current.filter((employee)=> employee.id !==id))
            setEditingEmployee((current)=>(current?.id===id? null:current))
            setSelectedDepartment("")
            
        } catch (error) {
            setDeleteError(
                error instanceof Error? error.message: "Could not delete employee"
            )
        }finally{
            deletingRef.current=false
            setIsDeleting(false)
        }
    }
    if (isLoading) {
        return <p role='status'>Loading employees...</p>
    }

    if (error) {
        return (
            <div>
                <p role='alert'>Could not load employees</p>
                <button className='retry-button' type='button' onClick={retry}>Retry</button>
            </div>
        )
    }
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
                    {deleteError && <p role='alert'>{deleteError}</p>}
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
                                    isDeleting={isDeleting}
                                    
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