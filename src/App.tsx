import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import EmployeeList from './components/EmployeeList';
import EmployeeForm from "./components/EmployeeForm";
import type { Employee } from "./types/employee.types";
import { useEmployees } from './hooks/useEmployees';
import { createEmployees, updateEmployee, deleteEmployee } from './services/employeeService';
import EmployeeStats from "./components/EmployeeStats"
import SearchBar from "./components/SearchBar";
import DepartmentFilter from './components/DepartmentFilter';



const App = () => {

    const { employees, setEmployees, isLoading, error, retry } = useEmployees()


    const [search, setSearch] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("")
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")
    const deletingRef = useRef(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const employeeFormRef = useRef<HTMLDivElement>(null)
    const renderCountRef = useRef(0)

    renderCountRef.current += 1

    useEffect(() => {
        if (editingEmployee) {
            employeeFormRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }, [editingEmployee])

    useEffect(() => {
        if (!isLoading && !error) {
            searchInputRef.current?.focus()
        }
    }, [isLoading, error])



    const query = search.trim().toLowerCase()
    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const matchesName = employee.name.toLowerCase().includes(query)

            const matchesDepartment = selectedDepartment === "" || employee.department === selectedDepartment

            return matchesName && matchesDepartment
        })
    }, [employees, query, selectedDepartment])

    const totalSalary = useMemo(() => {
        return employees.reduce(
            (total, employee) => total + employee.salary, 0,
        )
    }, [employees])

    const departmentCounts = useMemo(() => {
        return employees.reduce<Record<string, number>>(
            (counts, employee) => {
                const department = employee.department
                counts[department] = (counts[department] ?? 0) + 1
                return counts
            },
            {},
        )
    }, [employees])

    const departments = useMemo(() => {
        return Object.keys(departmentCounts)
    }, [departmentCounts])


    const handleAddEmployee = useCallback(
        async (details: Omit<Employee, "id">): Promise<void> => {
            const newEmployee = await createEmployees(details);

            setEmployees((currentEmployees) => [
                ...currentEmployees,
                newEmployee
            ]);

            setSearch("");
            setSelectedDepartment("");

        }, [setEmployees])




    const handleSaveEmployee = useCallback(
        async (details: Omit<Employee, "id">): Promise<void> => {
            if (!editingEmployee) {
                await handleAddEmployee(details)
                return
            }

            const updatedEmployee = await updateEmployee(editingEmployee.id, details)

            setEmployees((currentEmployees) =>
                currentEmployees.map((employee) =>
                    employee.id === editingEmployee.id ? updatedEmployee : employee
                )
            )

            setEditingEmployee(null)
            setSearch("")
            setSelectedDepartment("")
        },
        [editingEmployee, handleAddEmployee, setEmployees])


    const handleDeleteEmployee = useCallback( 
        async (id: number): Promise<void> => {
        if (deletingRef.current) return

        deletingRef.current = true
        setIsDeleting(true)
        setDeleteError("")


        try {
            await deleteEmployee(id)

            setEmployees((currentEmployees) => 
                currentEmployees.filter((employee) => employee.id !== id)
            )


            setEditingEmployee((currentEmployeest) => (
                currentEmployeest?.id === id ? null : currentEmployeest)
            )
            setSelectedDepartment("")

        } catch (error:unknown) {
            setDeleteError(
                error instanceof Error ? error.message : "Could not delete employee"
            )
        } finally {
            deletingRef.current = false
            setIsDeleting(false)
        }
    },[setEmployees])


    const handleSearchChange = useCallback((value:string): void=>{
        setSearch(value)
    },[])

    const handleDepartmentChange = useCallback(
        (department:string):void=>{
            setSelectedDepartment(department)
        },[])

    const handleEditEmployee=useCallback(
        (employee:Employee):void=>{
            setEditingEmployee(employee)
        },[])

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

    console.log("App render count:", renderCountRef.current);
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

                <EmployeeStats totalEmployees={employees.length} totalSalary={totalSalary} departmentCounts={departmentCounts} />

                <div ref={employeeFormRef}>
                    <EmployeeForm key={editingEmployee?.id ?? "add"} employeeToEdit={editingEmployee} onSave={handleSaveEmployee} />
                </div>
                <section id='employees' className='employees'>
                    <h2>Employees</h2>
                    {deleteError && <p role='alert'>{deleteError}</p>}
                    <div className=''>

                        <SearchBar ref={searchInputRef} search={search} onSearchChange={handleSearchChange} />

                        <DepartmentFilter departments={departments} selectedDepartment={selectedDepartment} onDepartmentChange={handleDepartmentChange} />
                    </div>


                    <p>Showing {filteredEmployees.length} of {employees.length} employees</p>
                    <EmployeeList employees={filteredEmployees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} isDeleting={isDeleting} />
                </section>
                <footer className='dashboard-footer'>
                    Workforce Employee Dashboard
                </footer>
            </main>
        </div >
    )
}

export default App