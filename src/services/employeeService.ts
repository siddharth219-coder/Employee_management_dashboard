import type { Employee } from "../types/employee.types"


const EMPLOYEES_URL= "http://localhost:3001/employees"


export const fetchEmployees = async (
    signal?: AbortSignal,
): Promise<Employee[]> =>{
    const response = await fetch(EMPLOYEES_URL,{signal})

    if (!response.ok) {
        throw new Error(`Could not load employees (HTTP ${response.status}).`)
    }

    const employees: Employee[]=await response.json()
    return employees
}


export const createEmployees = async(
    details: Omit<Employee, "id">,
):Promise<Employee> =>{
    const response = await fetch(EMPLOYEES_URL, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(details)
    })

    if (!response.ok) {
        throw new Error(`Could not add employee (HTTP ${response.status}).`)
    }

    const employee:Employee = await response.json()
    return employee
}

export const updateEmployee =async(
    id:number,
    details:Omit<Employee,"id">,
):Promise<Employee>=>{
    const response = await fetch(`${EMPLOYEES_URL}/${id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(details)
    })

    if (!response.ok) {
        throw new Error(`Could not update employee (HTTP ${response.status}).`)
    }

    const updatedEmployee: Employee=await response.json()
    return updatedEmployee
}


export const deleteEmployee=async (id:number):Promise<void>=>{
    const response = await fetch(`${EMPLOYEES_URL}/${id}`,{
        method:"DELETE",
    })

    if (!response.ok) {
        throw new Error(`Could not delete employee (HTTP ${response.status}).`)
    }
}